import axios from 'axios'
import { PrismaClient, Stat } from "@prisma/client"

import { IPage } from './type-definitions'

const prisma = new PrismaClient()
const DEFAULT_LIMIT = 20

export default async () => {
  let offset = 0
  let results: Stat[] = []
  let promises: Promise<void>[] = []

  do {
    const currentOffset = offset * DEFAULT_LIMIT
    const { data } = await axios.get<IPage<Stat>>(`https://pokeapi.co/api/v2/stat?offset=${currentOffset}&limit=${DEFAULT_LIMIT}`)
    results = [
      ...results,
      ...data.results,
    ]
    console.log(`Fetched done: ${currentOffset} - ${currentOffset + DEFAULT_LIMIT}`)
    if (data.next) offset++
    else break;
  } while (offset)

  results.forEach(r => {
    promises.push(
      prisma.stat.create({
        data: {
          name: r.name,
        },
      }).then(r => {
        console.log(`Record created for stat with id ${r.id}`)
      })      
    )
  })
  
  await Promise.all(promises)
}
