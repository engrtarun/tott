import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const apiKey = searchParams.get('apiKey') || process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (!id || !apiKey) {
    return NextResponse.json({ error: 'Missing TMDB ID or API Key' }, { status: 400 });
  }

  try {
    // Ye request Netlify ke server se jayegi, isliye India ka Jio/Airtel ISP isko block nahi kar payega!
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos&language=en-US`);
    
    if (!res.ok) {
      throw new Error("TMDB api failed to respond");
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("TMDB Proxy Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
