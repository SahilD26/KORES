// Shared data store for the Kores console.
// Any visitor's upload is saved here and served to everyone on next load.
// GET    -> returns the latest uploaded data as JSON (or null if none)
// POST   -> replaces the shared data with the request body
// DELETE -> clears the shared data (revert to embedded reports)
import { getStore } from "@netlify/blobs";

const KEY = "plants-v1";

export default async (req) => {
  const store = getStore("kores-data");
  try {
    if (req.method === "GET") {
      const val = await store.get(KEY);
      return new Response(val ?? "null", {
        headers: { "content-type": "application/json", "cache-control": "no-store" },
      });
    }
    if (req.method === "POST") {
      const body = await req.text();
      // basic guard: must be valid JSON of a non-empty object
      const parsed = JSON.parse(body);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return new Response(JSON.stringify({ error: "invalid payload" }), { status: 400 });
      }
      await store.set(KEY, body);
      return Response.json({ ok: true });
    }
    if (req.method === "DELETE") {
      await store.delete(KEY);
      return Response.json({ ok: true });
    }
    return new Response("Method Not Allowed", { status: 405 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e && e.message ? e.message : e) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
