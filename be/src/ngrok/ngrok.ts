// scripts/ngrok.ts
import ngrok from 'ngrok';

(async function () {
  const url = await ngrok.connect({
    addr: 3000,
    authtoken: process.env.NGROK_AUTH_TOKEN, 
  });

  console.log('🔗 Ngrok URL:', url);
  console.log(`👉 Callback URL (Midtrans): ${url}/api/midtrans/callback`);
})();
