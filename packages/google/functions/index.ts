import { base64url, SignJWT } from 'jose';

import { GoogleAuthPluginFunction } from '..';
import { getRequestHash } from './RequestHash';

// https://developers.google.com/identity/protocols/oauth2/openid-connect#sendauthrequest

export const onRequestGet: GoogleAuthPluginFunction = async ({
  request,
  pluginArgs,
}) => {
  const url = new URL(request.url);

  const reqHash = await getRequestHash(request);
  const state = await new SignJWT({})
    .setProtectedHeader({ alg: pluginArgs.signAlg })
    .setIssuedAt()
    .setIssuer(url.origin)
    .setAudience(`urn:reqhash:${base64url.encode(reqHash)}`)
    .setExpirationTime(pluginArgs.stateExpirationTime)
    .sign(base64url.decode(pluginArgs.signKey));

  const redirectURL = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  redirectURL.searchParams.append('response_type', 'code');
  redirectURL.searchParams.append('scope', pluginArgs.scope);
  pluginArgs.loginHint &&
    redirectURL.searchParams.append('login_hint', pluginArgs.loginHint);
  pluginArgs.prompt &&
    redirectURL.searchParams.append('prompt', pluginArgs.prompt);
  redirectURL.searchParams.append('client_id', pluginArgs.clientID);
  redirectURL.searchParams.append('redirect_uri', `${request.url}/callback`);
  redirectURL.searchParams.append('state', state);

  return Response.redirect(redirectURL.toString(), 302);
};
