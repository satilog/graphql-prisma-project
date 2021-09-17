import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

// const typesArray = loadFilesSync(path.join(__dirname, './schemas'), { extensions: ['graphql'] }
const typesArray = loadFilesSync(path.join(__dirname, './schemas'))
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'))

export const typeDefs = mergeTypeDefs(typesArray)
export const resolvers = mergeResolvers(resolversArray)