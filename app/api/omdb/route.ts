import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const apiKey = 'c5b7be57'; // Hardcoded default key as requested

  if (!title) {
    return NextResponse.json({ error: 'Missing Movie Title' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
    
    if (!res.ok) {
      throw new Error("OMDB api failed to respond");
    }
    
    const data = await res.json();
    if (data.Response === "False") {
      return NextResponse.json({ error: data.Error }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("OMDB Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
