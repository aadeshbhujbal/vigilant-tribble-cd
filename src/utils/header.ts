export interface ServiceHeaders {
  [key: string]: Record<string, string>;
}

export function createBasicAuthHeader(username: string, password: string): Record<string, string> {
  return {
    'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

export function createBearerAuthHeader(token: string): Record<string, string> {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}

export function createCustomHeaders(headers: Record<string, string>): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...headers,
  };
}

export function getDefaultHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'Health-Service/1.0.0',
  };
}
