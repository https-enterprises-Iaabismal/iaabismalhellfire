import { MercadoPagoConfig, Preference } from 'mercadopago';
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
export async function crearPreferenciaMP({ titulo, precioMXN, videoId }: any){
  const pref = new Preference(client);
  return await pref.create({
    body: {
      items: [{ id: videoId, title: titulo, quantity: 1, unit_price: Number(precioMXN), currency_id: 'MXN' }],
      back_urls: { success: `${process.env.NEXT_PUBLIC_URL}/`, failure: `${process.env.NEXT_PUBLIC_URL}/`, pending: `${process.env.NEXT_PUBLIC_URL}/` },
      auto_return: 'approved',
    }
  });
}
