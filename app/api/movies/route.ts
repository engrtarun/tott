import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Jab admin form submit karega (POST request)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, tags, thumbnailType, thumbnailUrl, githubImagePath, year, qualityBadges, trailerUrl, watchUrl } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Connect to database
    const client = await clientPromise;
    const db = client.db('tott_movies'); // Database ka naam

    // Format the movie data
    const movieData = {
      title,
      year: year || '',
      description: description || '',
      tags: tags ? (typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : tags) : [],
      qualityBadges: qualityBadges || [],
      trailerUrl: trailerUrl || '',
      watchUrl: watchUrl || '',
      thumbnailType, // 'upload' or 'link'
      thumbnailUrl: thumbnailUrl || '',
      githubImagePath: githubImagePath || '',
      createdAt: new Date(),
    };

    // Save to MongoDB collection named 'movies'
    const result = await db.collection('movies').insertOne(movieData);

    return NextResponse.json(
      { message: 'Movie added successfully!', movieId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to add movie', details: error.message },
      { status: 500 }
    );
  }
}

// Ye GET route homepage par movies dikhane ke liye kaam aayega aage
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('tott_movies');

    const movies = await db
      .collection('movies')
      .find({})
      .sort({ createdAt: -1 })
      .limit(10) // Latest 10 movies
      .toArray();

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

// Ye DELETE route movie ko database se hatane ke liye hai
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tott_movies');

    const result = await db.collection('movies').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Movie deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to delete movie', details: error.message }, { status: 500 });
  }
}

