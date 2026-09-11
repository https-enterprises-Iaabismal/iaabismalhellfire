import { MercadoPagoConfig, Preference } from 'mercadopago';
export async function crearPreferenciaMP({ titulo, precioMXN, videoId }: any){
  const token = process.env.MP_ACCESS_TOKEN || 'TEST_TOKEN';
  const client = new MercadoPagoConfig({ accessToken: token });
  const pref = new Preference(client);
  return await pref.create({
    body: {
      items: [{ id: videoId, title: titulo, quantity: 1, unit_price: Number(precioMXN), currency_id: 'MXN' }],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL || 'https://iaabismalhellfire.vercel.app'}/pago/success`,
        failure: `${process.env.NEXT_PUBLIC_URL || 'https://iaabismalhellfire.vercel.app'}/pago/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL || 'https://iaabismalhellfire.vercel.app'}/pago/pending`,
      },
      auto_return: 'approved',
    }
  });
}
