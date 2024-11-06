import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import { SECRET_KEY, TOKEN_EXPIRATION_TIME } from '../config/QrConfig.js';

// Generar el token JWT
export function generateTokenService() {
  return jwt.sign({}, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION_TIME });
}

// Generar el código QR con la URL que contiene el token
export async function generateQRCodeService(token) {
  const url = `https://prueba-front-jet.vercel.app/verifyToken.html?token=${token}`;
  try {
    return await QRCode.toDataURL(url);
  } catch (error) {
    console.error('Error generando el QR:', error);
    throw new Error('No se pudo generar el código QR');
  }
}

// Validar el token JWT
export function validateTokenService(token) {
  try {
    jwt.verify(token, SECRET_KEY);
    return true; // Token válido
  } catch (error) {
    return false; // Token inválido o expirado
  }
}
