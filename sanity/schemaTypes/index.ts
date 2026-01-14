import { type SchemaTypeDefinition } from "sanity";

import {eventType} from '@/sanity/schemaTypes/eventType'
import {author} from '@/sanity/schemaTypes/author'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType,author],
};