import axios from 'axios'
import { PrismaClient, Pokemon, Ability, Type, Stat, StatValue } from "@prisma/client"

import { IPage, IGenericApiResult } from 'prisma/types'
import { getApiId } from '../utils/seederUtil'

const prisma = new PrismaClient()
const DEFAULT_LIMIT = 20

interface IApiPokemon {
  abilities: {
    ability: IGenericApiResult;
    is_hidden: boolean;
  }[]
  types: {
    type: IGenericApiResult;
  }[]
  stats: {
    stat: IGenericApiResult;
    base_stat: number;
  }[]
  sprites: {
    back_default: string;
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    }
  }
  height: number;
  weight: number;
}

interface IResult extends Omit<Pokemon, 'id'> {
  abilities: Array<Ability['apiId']>;
  types: Array<Type['apiId']>;
  stats: {
    value: StatValue['value'];
    stat: Stat['apiId'];
  }[]
}

export default async () => {
  let offset = 0
  let results: IResult[] = []
  let promises: Promise<void>[] = []

  do {
    const currentOffset = offset * DEFAULT_LIMIT
    const { data } = await axios.get<IPage<IGenericApiResult>>(`https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${DEFAULT_LIMIT}`)
    const currentMaxRange = (currentOffset + DEFAULT_LIMIT) > data.count ? data.count : (currentOffset + DEFAULT_LIMIT)

    for (const r of data.results) {
      const pr = await axios.get<IApiPokemon>(r.url)
      const abilities = pr.data.abilities.map(a => getApiId(a.ability.url))
      const types = pr.data.types.map(t => getApiId(t.type.url))
      const stats = pr.data.stats.map(s => ({
        stat: getApiId(s.stat.url),
        value: s.base_stat,
      }))
      results.push({
        abilities,
        types,
        stats,
        image: pr.data.sprites.other['official-artwork'].front_default || pr.data.sprites.other.dream_world.front_default,
        name: r.name,
        apiId: getApiId(r.url),
        weight: pr.data.weight,
        height: pr.data.height,
      })
      console.log(`Fetching pokemon details done: ${r.name}`)
    }

    console.log(`Fetching pokemons done: ${currentOffset} - ${currentMaxRange}`)
    if (data.next) offset++
    else break;
  } while (offset)

  for (const { abilities, types, stats, ...r } of results) {
    const pr = await prisma.pokemon.create({
      data: {
        ...r,
        abilities: {
          connect: abilities.map(apiId => ({ apiId }))
        },
        types: {
          connect: types.map(apiId => ({ apiId }))
        },
      },
    })
    console.log(`Record created for pokemon ${pr.name}`)

    const statValuePromises = stats.map(s =>
      prisma.statValue.create({
        data: {
          value: s.value,
          stat: {
            connect: { apiId: s.stat },
          },
          pokemon: {
            connect: { id: pr.id },
          },
        },
        include: {
          stat: true,
        }
      }).then(svr => {
        console.log(`${svr.stat.name}: ${svr.value}`)
      })
    )

    await Promise.all(statValuePromises)
  }
}
