import { base64url, SignJWT } from 'jose';
import { PluginFunction } from './PluginFunction';
import { getRequestHash } from './RequestHash';

// https://developers.google.com/identity/protocols/oauth2/openid-connect#sendauthrequest

export const onRequestGet: PluginFunction = async ({ request, pluginArgs }) => {
  const url = new URL(request.url);

  const reqHash = await getRequestHash(request);
  const jwt = await new SignJWT({})
    .setProtectedHeader({ alg: pluginArgs.state.signAlg })
    .setIssuedAt()
    .setIssuer(url.origin)
    .setAudience(`urn:reqhash:${base64url.encode(reqHash)}`)
    .setExpirationTime(pluginArgs.state.expirationTime)
    .sign(base64url.decode(pluginArgs.state.signKey));

  return Response.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid&prompt=select_account&client_id=${
      pluginArgs.clientID
    }&redirect_uri=${encodeURIComponent(
      request.url + '/callback'
    )}&state=${jwt}`,
    302
  );
};
