import { NextApiRequest, NextApiResponse } from 'next';
import cookie, { SerializeOptions } from 'cookie'; // Import SerializeOptions

// Define the options for cookies (access token and refresh token)
const cookieOptions: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
    path: '/',
    sameSite: 'strict',
  };

/**
 * Set a cookie on the response.
 * @param res - Next.js response object
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Additional cookie options
 */
export const setCookie = (
    res: NextApiResponse,
    name: string,
    value: string,
    options: Partial<SerializeOptions> = {}
  ) => {
    const serializedCookie = cookie.serialize(name, value, {
      ...cookieOptions,
      ...options,
    });
    res.setHeader('Set-Cookie', serializedCookie);
  };

/**
 * Set both the access token and refresh token cookies.
 * @param res - Next.js response object
 * @param accessToken - JWT access token
 * @param refreshToken - JWT refresh token
 */
export const setAuthCookies = (
  res: NextApiResponse,
  accessToken: string,
  refreshToken: string
) => {
  setCookie(res, 'accessToken', accessToken, { maxAge: 3600 }); // Expires in 1 hour
  setCookie(res, 'refreshToken', refreshToken, { maxAge: 86400 }); // Expires in 1 day
};

/**
 * Parse cookies from the request headers.
 * @param req - Next.js request object
 * @returns Parsed cookies object
 */
export const getCookies = (req: NextApiRequest) => {
  return cookie.parse(req.headers.cookie || '');
};

/**
 * Retrieve a specific cookie from the request headers.
 * @param req - Next.js request object
 * @param name - Cookie name
 * @returns Cookie value or undefined if not found
 */
export const getCookie = (req: NextApiRequest, name: string) => {
  const cookies = getCookies(req);
  return cookies[name];
};

/**
 * Clear a cookie on the response (set it to expire immediately).
 * @param res - NextApiResponse
 * @param name - Cookie name
 */
export const clearCookie = (res: NextApiResponse, name: string) => {
  setCookie(res, name, '', { maxAge: 0 });
};

/**
 * Clear both access token and refresh token cookies.
 * @param res - NextApiResponse
 */
export const clearAuthCookies = (res: NextApiResponse) => {
  clearCookie(res, 'accessToken');
  clearCookie(res, 'refreshToken');
};
