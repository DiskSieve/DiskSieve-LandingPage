import type { APIRoute } from "astro";
import { ardResponse } from "../../content/ard";

export const GET: APIRoute = () => ardResponse();
