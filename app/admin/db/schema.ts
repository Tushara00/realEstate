import { integer, pgTable, varchar ,serial,text} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
export const citiesTable = pgTable("cities", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),

  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }).default("Bangladesh"),
});

export const housesTable = pgTable("houses", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),

  price: integer("price").notNull(),

  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),

  address: text("address"),

  cityId: integer("city_id")
    .notNull()
    .references(() => citiesTable.id, { onDelete: "cascade" }),
});



