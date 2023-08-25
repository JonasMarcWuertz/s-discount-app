import type { LoaderFunction } from '@remix-run/node';
export let loader: LoaderFunction = async ({ request }) => {
  const shop = request.headers.get('shop');
  const code = request.headers.get('code'); 

  if (!shop || !code) {
    console.error('Shop or code missing in headers.');
    return { error: 'Required headers missing.' };
  }

  const tokenEndpoint = `https://${shop}/admin/oauth/access_token`;

  try {
    const tokenResponse = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_APP_API_KEY,
        client_secret: process.env.SHOPIFY_APP_SECRET,
        code
      })
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to fetch access token: ${tokenResponse.statusText}`);
    }

    const { access_token } = await tokenResponse.json();

    // Speichern Sie das Zugriffstoken sicher in Ihrer Datenbank
    await saveAccessTokenToDatabase(shop, access_token);

    return { redirect: '/dashboard' };

  } catch (error) {
    console.error('Error:', error);
    return { error: 'Failed to fetch access token or save it to the database.' };
  }
};

// Fiktive Funktion zum Speichern des Zugriffstokens in der Datenbank
async function saveAccessTokenToDatabase(shop: string, token: string) {
  // Hier kommt Ihr Datenbankcode hin.
  // Zum Beispiel:
  // await database.query('INSERT INTO tokens (shop, access_token) VALUES (?, ?)', [shop, token]);
}
