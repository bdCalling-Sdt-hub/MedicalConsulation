// app/api/link-preview/route.js
import { NextResponse } from "next/server";
import NodeCache from "node-cache";
import ogs from "open-graph-scraper";

// Initialize cache with a 1-hour TTL (Time To Live)
const cache = new NodeCache({ stdTTL: 3600 });

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  // Check cache for existing data
  const cachedData = cache.get(url);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }

  // Fetch metadata using open-graph-scraper
  const options = { url };
  try {
    const { result } = await ogs(options);

    // Cache the result to reuse it in the future
    cache.set(url, result);

    // Return the fetched metadata
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json(
      { error: "Error fetching metadata" },
      { status: 500 }
    );
  }
}
