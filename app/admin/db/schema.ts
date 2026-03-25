import { integer,
  pgTable,
   varchar ,
   serial,
   text,
  boolean,
  index,
uniqueIndex,
uuid,
timestamp
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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
slug: text("slug").notNull().unique(),
  price: integer("price").notNull(),

  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),

  address: text("address"),

  cityId: integer("city_id")
    .notNull()
    .references(() => citiesTable.id, { onDelete: "cascade" }),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 120 }),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash"), // nullable for OAuth users later

    emailVerified: boolean("email_verified").notNull().default(false),
    role: varchar("role", { length: 50 }).notNull().default("user"),

    image: text("image"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
     .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailUnique: uniqueIndex("users_email_unique").on(table.email),
  })
);


  export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    sessionTokenHash: text("session_token_hash").notNull(),

    userAgent: text("user_agent"),
    ipAddress: varchar("ip_address", { length: 255 }),

    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
       lastUsedAt: timestamp("last_used_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  },
   (table) => ({
    sessionTokenHashUnique: uniqueIndex("sessions_token_hash_unique").on(
      table.sessionTokenHash
    ),
    userIdIdx: index("sessions_user_id_idx").on(table.userId),
  })
);

  export const emailVerificationTokens = pgTable(
  "email_verification_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    tokenHash: text("token_hash").notNull(),

    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },

  (table) => ({
    tokenHashUnique: uniqueIndex("password_reset_token_hash_unique").on(
      table.tokenHash
    ),
    userIdIdx: index("password_reset_user_id_idx").on(table.userId),
  })
);
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));




