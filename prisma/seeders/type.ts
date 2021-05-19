import axios from 'axios'
import { PrismaClient, Type } from "@prisma/client"

import { IPage, IGenericApiResult } from './type-definitions'
import { getApiId } from '../utils/seederUtil'

const prisma = new PrismaClient()
const DEFAULT_LIMIT = 20

interface IApiType {
  damage_relations: {
    double_damage_from: IGenericApiResult[];
    double_damage_to: IGenericApiResult[];
    half_damage_from: IGenericApiResult[];
    half_damage_to: IGenericApiResult[];
    no_damage_from: IGenericApiResult[];
    no_damage_to: IGenericApiResult[];
  }
}

interface IResult extends Omit<Type, 'id'> {
  weaknesses: Array<Type['apiId']>;
  strengths: Array<Type['apiId']>;
}

export default async () => {
  let offset = 0
  let results: IResult[] = []
  let promises: Promise<void>[] = []

  do {
    const currentOffset = offset * DEFAULT_LIMIT
    const { data } = await axios.get<IPage<IGenericApiResult>>(`https://pokeapi.co/api/v2/type?offset=${currentOffset}&limit=${DEFAULT_LIMIT}`)
    const currentMaxRange = (currentOffset + DEFAULT_LIMIT) > data.count ? data.count : (currentOffset + DEFAULT_LIMIT)

    for (const r of data.results) {
      const tr = await axios.get<IApiType>(r.url)
      const strengths = tr.data.damage_relations.double_damage_to.map(ddt => getApiId(ddt.url))
      const weaknesses = tr.data.damage_relations.double_damage_from.map(ddt => getApiId(ddt.url))
      results.push({
        apiId: getApiId(r.url),
        name: r.name,
        strengths,
        weaknesses,
      })
      console.log(`Fetching type strengths & weaknesses done: ${r.name}`)
    }

    console.log(`Fetching types done: ${currentOffset} - ${currentMaxRange}`)
    if (data.next) offset++
    else break;
  } while (offset)

  results.forEach(({ weaknesses, strengths, ...r }) => {
    promises.push(
      prisma.type.create({
        data: r,
      }).then(r => {
        console.log(`Record created for type with id ${r.id}`)
      })
    )
  })

  await Promise.all(promises)

  for (const r of results) {
    const weaknesses = await prisma.type.findMany({
      where: {
        apiId: {
          in: r.weaknesses,
        },
      },
    })
    const strengths = await prisma.type.findMany({
      where: {
        apiId: {
          in: r.strengths,
        },
      },
    })
    const result = await prisma.type.update({
      where: {
        apiId: r.apiId,
      },
      data: {
        weaknesses: {
          connect: weaknesses.map(({ id }) => ({ id }))
        },
        strengths: {
          connect: strengths.map(({ id }) => ({ id }))
        },
      },
    })
    console.log(`Added relations to type with id ${result.id}. Weaknesses: ${weaknesses.length}  Strengths: ${strengths.length}`)
  }
}
