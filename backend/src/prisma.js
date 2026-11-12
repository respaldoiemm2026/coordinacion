import {PrismaPg} from "@prisma/adapter-pg";
import "dotenv/config";
import {PrismaClient} from "@prisma/client";

const urlDatabase = process.env.DATABASE_URL;

if(!urlDatabase){
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const adapter = new PrismaPg({ connectionString: urlDatabase });
const prisma = new PrismaClient({adapter});

export default prisma;