import QRCode from 'qrcode';

export async function generateQR(id) {
  const url = `https://shinehope.vercel.app/verify/${id}`;
  return await QRCode.toDataURL(url);
}