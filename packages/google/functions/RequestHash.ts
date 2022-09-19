const HASH_HEADERS = [
  'accept',
  'accept-language',
  'cf-ipcountry',
  'user-agent',
];

export const getRequestHash = async (req: Request) => {
  const headers = req.headers;

  const s = HASH_HEADERS.map((k) => {
    return headers.get(k) || '';
  }).join('\0');

  return new Uint8Array(
    await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  );
};
