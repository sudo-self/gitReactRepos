// app/api/github/route.js
import axios from 'axios';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username') || 'octocat'; // Default user if none provided

    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Error fetching repositories', { status: 500 });
    }
}
