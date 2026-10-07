import {PrismaPg} from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client.js";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({adapter});
async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Conexión exitosa a PostgreSQL!");
  } catch (error) {
    console.error("❌ Error al conectar a PostgreSQL:", error);
  }
}
testConnection();
export default prisma;