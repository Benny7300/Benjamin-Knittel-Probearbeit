export async function GET() {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random', {
        cache: 'no-store' 
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return new Response(JSON.stringify({ value: data.value }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch quote' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  