import axios from 'axios'
import { PrismaClient, Ability } from "@prisma/client"

import { IPage, IGenericApiResult } from 'prisma/types'
import { getApiId } from '../utils/seederUtil'

const prisma = new PrismaClient()
const DEFAULT_LIMIT = 20

interface IApiAbility {
  effect_entries: {
    effect: string;
    language: { name: 'en' | 'de' };
    short_effect: string;
  }[]
  flavor_text_entries: {
    flavor_text: string;
    language: { name: 'en' | 'de' };
  }[]
}

export default async () => {
  let offset = 0
  let results: Omit<Ability, 'id'>[] = []
  let promises: Promise<void>[] = []

  do {
    const currentOffset = offset * DEFAULT_LIMIT
    const { data } = await axios.get<IPage<IGenericApiResult>>(`https://pokeapi.co/api/v2/ability?offset=${currentOffset}&limit=${DEFAULT_LIMIT}`)
    const currentMaxRange = (currentOffset + DEFAULT_LIMIT) > data.count ? data.count : (currentOffset + DEFAULT_LIMIT)

    for (const r of data.results) {
      const ar = await axios.get<IApiAbility>(r.url)
      const shortEffect = ar.data.effect_entries.find(ee => ee.language.name === 'en')?.short_effect || ''
      const flavorEntry = ar.data.flavor_text_entries.find(ee => ee.language.name === 'en')?.flavor_text || ''
      results.push({
        apiId: getApiId(r.url),
        name: r.name,
        effect: shortEffect || flavorEntry,
      })
      console.log(`Fetching ability effect done: ${r.name}`)
    }

    console.log(`Fetching abilities done: ${currentOffset} - ${currentMaxRange}`)
    if (data.next) offset++
    else break;
  } while (offset)

  results.forEach(r => {
    promises.push(
      prisma.ability.create({
        data: r,
      }).then(r => {
        console.log(`Record created for ability with id ${r.id}`)
      })
    )
  })

  await Promise.all(promises)
}
