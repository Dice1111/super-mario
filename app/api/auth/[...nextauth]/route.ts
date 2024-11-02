import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

const handler = NextAuth(authOptions);

// Explicitly export GET and POST as individual handlers
export const GET = handler;
export const POST = handler;
