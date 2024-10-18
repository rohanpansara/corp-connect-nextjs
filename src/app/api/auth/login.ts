import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { apiClient } from '@/utils/apiClient';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Forward login request to Spring Boot backend
    const response = await apiClient.post('/login', { email, password });

    const { access_token, refresh_token, logged_user } = response.data.data;

    // Set access token and refresh token in HttpOnly cookies
    res.setHeader('Set-Cookie', [
      cookie.serialize('accessToken', access_token, {
        httpOnly: true,
        secure: false, // Set to false during development
        maxAge: 3600, // 1 hour, ensure it matches backend token expiration
        path: '/',
        sameSite: 'lax',
      }),
      cookie.serialize('refreshToken', refresh_token, {
        httpOnly: true,
        secure: false, // Set to false during development
        maxAge: 86400, // 1 day, ensure it matches backend refresh token expiration
        path: '/',
        sameSite: 'lax',
      }),
    ]);

    // Respond back with user data (without tokens in the body)
    res.status(200).json({
      message: 'Login successful',
      user: logged_user,
    });
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    
    // Capture specific error codes if needed (e.g., 401 Unauthorized, 500 Internal Server Error)
    if (error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      console.error('Login failed:', errorMessage);
      res.status(500).json({ error: errorMessage });
    }
  }
}
