import { MercadoPagoConfig, Preference } from 'mercadopago';
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});
export async function crearPreferenciaMP({ titulo, precioARS, videoId, emailComprador }: { titulo: string; precioARS: number; videoId: string; emailComprador?: string; }) {
  const preference = new Preference(client);
  const result = await preference.create({
    body: {
      items: [{ id: videoId, title: titulo, quantity: 1, unit_price: Number(precioARS), currency_id: 'ARS' }],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/pago/success?videoId=${videoId}`,
        failure: `${process.env.NEXT_PUBLIC_URL}/pago/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/pago/pending`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/pagos/webhook`,
      metadata: { videoId: videoId },
      payer: emailComprador ? { email: emailComprador } : undefined,
    },
  });
  return result;
}
