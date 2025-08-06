import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { email, name, wh_id } = req.query;

  if (!email || !name || !wh_id) {
    return res.status(400).json({ error: 'Parâmetros ausentes' });
  }

  // Cria token JWT com dados criptografados
  const token = jwt.sign(
    { email, name, wh_id },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Gera o magic link
  const magicLink = `${process.env.NEXT_PUBLIC_SITE_URL}/api/magic-login?token=${token}`;

  // Redireciona diretamente para o magic link
  return res.redirect(magicLink);
}
