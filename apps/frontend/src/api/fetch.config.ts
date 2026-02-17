import { API_CONFIG } from "@/config";

export const baseServer = API_CONFIG.BASE_URL;

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
