import axios from 'axios'

import prisma from '../client'
import { IPage } from './types'

type TStat = {
  name: string
  url: string
}

const DEFAULT_LIMIT = 20

export default async () => {
  let offset = 0
  let results: TStat[] = []

  do {
    const currentOffset = offset * DEFAULT_LIMIT
    const { data } = await axios.get<IPage<TStat>>(`https://pokeapi.co/api/v2/stat?offset=${currentOffset}&limit=${DEFAULT_LIMIT}`)
    results = [
      ...results,
      ...data.results,
    ]
    console.log(`Fetched done: ${currentOffset} - ${currentOffset + DEFAULT_LIMIT}`)
    if (data.next) offset++
    else break;
  } while (offset)

  results.forEach(async r => {
    const stat = await prisma.stat.create({
      data: {
        name: r.name,
      },
    })
    console.log(`Record created with id ${stat.id}`)
  })
}
