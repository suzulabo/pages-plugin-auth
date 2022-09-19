import { base64url, createRemoteJWKSet, jwtVerify } from 'jose';
import { GoogleAuthPluginFunction } from '..';
import { getRequestHash } from './RequestHash';

// https://developers.google.com/identity/protocols/oauth2/openid-connect#exchangecode

const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/oauth2/v3/certs')
);

export const onRequestGet: GoogleAuthPluginFunction = async ({
  request,
  pluginArgs,
  data,
  next,
}) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state) {
    return new Response('Bad Request', { status: 400 });
  }

  {
    const reqHash = await getRequestHash(request);
    await jwtVerify(state, base64url.decode(pluginArgs.signKey), {
      algorithms: [pluginArgs.signAlg],
      issuer: url.origin,
      audience: `urn:reqhash:${base64url.encode(reqHash)}`,
    });
  }

  const formData = new FormData();
  formData.set('code', code);
  formData.set('client_id', pluginArgs.clientID);
  formData.set('client_secret', pluginArgs.clientSecret);
  formData.set('redirect_uri', url.origin + url.pathname);
  formData.set('grant_type', 'authorization_code');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: formData,
  });

  const json = (await res.json()) as { id_token: string };
  const jwt = json.id_token;

  const { payload } = await jwtVerify(jwt, JWKS, {
    issuer: 'https://accounts.google.com',
    audience: pluginArgs.clientID,
  });

  data.payload = payload;
  return next();
};
