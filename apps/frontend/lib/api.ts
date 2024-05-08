import createClient from "openapi-fetch";
import type { paths } from "./api/api";

export const api = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
});
