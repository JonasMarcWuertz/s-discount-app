import { fetch } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import type { CartData, Discount, CartItem } from '../types';
 // Importieren Sie den CartData-Typ aus types.ts

export let loader: LoaderFunction = async ({ request }): Promise<CartData | { error: string }> => {
  try {
    const response = await fetch('https://YOUR_SHOPIFY_STORE_URL/cart.js', {
      headers: {
        'Content-Type': 'application/json',
        // Weitere erforderliche Header für die Shopify API
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cart data: ${response.statusText}`);
    }

    const cart: CartData = await response.json();
    return cart;

  } catch (error) {
    console.error('Error fetching cart data:', error);
    return { error: 'Failed to fetch cart data.' };
  }
};
