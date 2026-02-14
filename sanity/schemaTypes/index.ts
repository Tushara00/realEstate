import { type SchemaTypeDefinition } from "sanity";

import {eventType} from '@/sanity/schemaTypes/eventType'
import {author} from '@/sanity/schemaTypes/author'
import {footer} from '@/sanity/schemaTypes/footer'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType,author,footer],
};