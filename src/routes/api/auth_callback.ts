import type { LoaderFunction } from '@remix-run/node';

export let loader: LoaderFunction = async ({ request }) => {
    // Extrahieren des Shop- und Code-Werts aus den Headern
    const shop = request.headers.get('shop');
    const code = request.headers.get('code'); 

    // Überprüfen, ob der Shop- und Code-Wert vorhanden ist
    if (!shop || !code) {
        throw new Error("Shop or code header is missing.");
    }
  
    // Anfrage an Shopify, um das Zugriffstoken zu erhalten
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_APP_API_KEY,
        client_secret: process.env.SHOPIFY_APP_SECRET,
        code: code
      })
    });

    // Überprüfen, ob die Anfrage erfolgreich war
    if (!tokenResponse.ok) {
        throw new Error(`Failed to fetch access token: ${tokenResponse.statusText}`);
    }
  
    const { access_token } = await tokenResponse.json();
  
    // Speichern Sie das Zugriffstoken sicher in Ihrer Datenbank
  
    return { redirect: '/dashboard' };
};
