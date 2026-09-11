import { MercadoPagoConfig, Preference } from 'mercadopago';
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
export async function crearPreferenciaMP({ titulo, precioMXN, videoId, emailComprador }: { titulo: string; precioMXN: number; videoId: string; emailComprador?: string; }) {
  const preference = new Preference(client);
  return await preference.create({
    body: {
      items: [{ id: videoId, title: titulo, quantity: 1, unit_price: Number(precioMXN), currency_id: 'MXN' }],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/pago/success?videoId=${videoId}`,
        failure: `${process.env.NEXT_PUBLIC_URL}/pago/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/pago/pending`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/pagos/webhook`,
      metadata: { videoId },
      payer: emailComprador ? { email: emailComprador } : undefined,
    },
  });
}
