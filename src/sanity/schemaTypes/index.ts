import { type SchemaTypeDefinition } from 'sanity'
import { category } from './category'
import { mediaItem } from './mediaItem'
import { experience } from './experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, mediaItem, experience],
}