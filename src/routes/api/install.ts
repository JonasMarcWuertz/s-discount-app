import type { LoaderFunction } from '@remix-run/node';

export let loader: LoaderFunction = async ({ request }) => {
    // Extrahieren des Shop-Werts aus den Headern
    const shop = request.headers.get('shop');
    
    // Überprüfen, ob der Shop-Wert vorhanden ist
    if (!shop) {
        throw new Error("Shop header is missing.");
    }

    // Extrahieren der erforderlichen Umgebungsvariablen
    const apiKey = process.env.SHOPIFY_APP_API_KEY;
    if (!apiKey) {
        throw new Error("SHOPIFY_APP_API_KEY is not set in environment variables.");
    }

    // Definieren der erforderlichen Scopes und der Redirect-URI
    const scopes = 'read_products,write_products,read_orders,write_orders';
    const redirectUri = 'https://yourapp.com/auth/callback';

    // Erstellen der Authentifizierungs-URL
    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;

    return { redirect: authUrl };
};
