import GoogleAuthPlugin from '@suzulabo/pages-plugin-auth/google';

type Env = {
  AUTH_GOOGLE_CLIENT_ID: string;
  AUTH_GOOGLE_CLIENT_SECRET: string;
  HS256_SIGN_KEY: string;
};

export const onRequest: PagesFunction<Env> = async (context) => {
  const env = context.env;
  console.log({ env });
  return GoogleAuthPlugin({
    clientID: env.AUTH_GOOGLE_CLIENT_ID,
    clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
    signAlg: 'HS256',
    signKey: env.HS256_SIGN_KEY,
    stateExpirationTime: '10m',
    scope: 'openid',
    prompt: 'select_account',
  })(context);
};
