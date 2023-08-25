import type { LoaderFunction } from '@remix-run/node';
import * as admin from 'firebase-admin';

// Firebase-Initialisierung (dies sollte nur einmal in Ihrer Anwendung geschehen)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),  // Um Zeilenumbrüche korrekt zu behandeln
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = admin.database();
const triggersRef = db.ref('triggers');

export let loader: LoaderFunction = async () => {
  const snapshot = await triggersRef.once('value');
  return snapshot.val() || {};
};

export let action: LoaderFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());

  const updatedTriggers = {
    productTrigger: formData.getAll('productTrigger'),
    variantTrigger: formData.getAll('variantTrigger'),
    collectionTrigger: formData.getAll('collectionTrigger'),
    cartAmountTrigger: formData.get('cartAmountTrigger')
  };

  await triggersRef.set(updatedTriggers);

  return { redirect: '/dashboard' };
};