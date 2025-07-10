
import dbConnect from '@/app/utils/db';
import Snippet from '@/models/Snippet';

export async function GET(request) {
    await dbConnect();
    try {
        const snippets = await Snippet.find({}).sort({ createdAt: -1 });
        return new Response(JSON.stringify(snippets), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to fetch snippets', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request) {
    await dbConnect();
    try {
        const { title, code, language_id } = await request.json();
        const newSnippet = await Snippet.create({
            title,
            code,
            language_id,
        });
        return new Response(JSON.stringify(newSnippet), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to save snippet', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
