// pages/api/auth/refresh-token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { apiClient } from '@/utils/apiClient';

export default async function refreshToken(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return res.status(401).json({ error: 'Missing refresh token' });
  }

  const { refreshToken } = cookie.parse(cookies);

  try {
    // Call Spring Boot backend to refresh the token
    const response = await apiClient.post('/refresh-token', { refreshToken });
    const { access_token, refresh_token } = response.data;

    // Set new tokens in cookies
    res.setHeader('Set-Cookie', [
      cookie.serialize('accessToken', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 3600, // 1 hour
        path: '/',
      }),
      cookie.serialize('refreshToken', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 86400, // 1 day
        path: '/',
      }),
    ]);

    res.status(200).json({ accessToken: access_token, refreshToken: refresh_token });
  } catch (error) {
    console.error('Failed to refresh token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}
