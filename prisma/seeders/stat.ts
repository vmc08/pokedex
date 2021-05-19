import axios from 'axios'
import { PrismaClient } from "@prisma/client"

import { IPage, IGenericApiResult } from './type-definitions'

const prisma = new PrismaClient()
const DEFAULT_LIMIT = 20

export default async () => {
  let offset = 0
  let results: IGenericApiResult[] = []
  let promises: Promise<void>[] = []

  do {
    const currentOffset = offset * DEFAULT_LIMIT
    const { data } = await axios.get<IPage<IGenericApiResult>>(`https://pokeapi.co/api/v2/stat?offset=${currentOffset}&limit=${DEFAULT_LIMIT}`)
    const currentMaxRange = (currentOffset + DEFAULT_LIMIT) > data.count ? data.count : (currentOffset + DEFAULT_LIMIT)
    results = [
      ...results,
      ...data.results,
    ]
    console.log(`Fetching stats done: ${currentOffset} - ${currentMaxRange}`)
    if (data.next) offset++
    else break;
  } while (offset)

  results.forEach(r => {
    const urlSegments = r.url.split("/")
    const apiId = Number(urlSegments[urlSegments.length - 2])
    promises.push(
      prisma.stat.create({
        data: {
          apiId,
          name: r.name,
        },
      }).then(r => {
        console.log(`Record created for stat with id ${r.id}`)
      })
    )
  })

  await Promise.all(promises)
}
