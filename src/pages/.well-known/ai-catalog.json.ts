import type { APIRoute } from "astro";
import { ardResponse } from "../../content/ard";

/** Legacy name of the ARD manifest, still read by Lighthouse 13.5. */
export const GET: APIRoute = () => ardResponse();
