import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL as string

export const pool = new Pool({ connectionString })

//another method to create a pool

export const pool2 = new Pool({
  user: "mukisaivan",
  password: "mukisaivan12345",
  host: "localhost",
  port: 5432,
  database: "discord-clone",
})
