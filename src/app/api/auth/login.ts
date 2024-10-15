// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { apiClient } from '@/utils/apiClient';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Forward login request to Spring Boot backend
      const response = await apiClient.post('/login', { email, password });

      const { access_token, refresh_token, logged_user } = response.data.data;

      console.log('Tokens set in cookies:', access_token, refresh_token); // Debugging log

      // Set access token and refresh token in HttpOnly cookies
      res.setHeader('Set-Cookie', [
        cookie.serialize('accessToken', access_token, {
          httpOnly: true,
          secure: false, // Set to false during development
          maxAge: 3600, // 1 hour
          path: '/',
          sameSite: 'lax', // Adjust as necessary
        }),
        cookie.serialize('refreshToken', refresh_token, {
          httpOnly: true,
          secure: false, // Set to false during development
          maxAge: 86400, // 1 day
          path: '/',
          sameSite: 'lax', // Adjust as necessary
        }),
      ]);

      // Respond back with user data (without tokens in the body)
      res.status(200).json({
        message: 'Login successful',
        user: logged_user,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      console.error('Login failed:', errorMessage);
      res.status(500).json({ error: errorMessage });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}