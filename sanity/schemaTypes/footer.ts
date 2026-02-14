import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Footer Title",
      type: "string",
    }),

    defineField({
      name: "links",
      title: "Footer Links",
      type: "array",
      of: [
        defineField({
          name: "link",
          type: "object",
          fields: [
            {
              name: "label",
              title: "Link Text",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
        }),
      ],
    }),
  ],
});
