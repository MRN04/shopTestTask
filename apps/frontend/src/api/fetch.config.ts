export const baseServer = 'http://localhost:3001';

export const fetchClient = (
  path: string,
  init?: RequestInit,
) => {
  return fetch(`${baseServer}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });
};
