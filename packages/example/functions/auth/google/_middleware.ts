import GoogleAuthPlugin, {
  GoogleAuthPagesFunction,
  // eslint-disable-next-line import/no-unresolved
} from '@suzulabo/pages-plugin-auth/google';

type Env = {
  AUTH_GOOGLE_CLIENT_ID: string;
  AUTH_GOOGLE_CLIENT_SECRET: string;
  HS256_SIGN_KEY: string;
};

export const onRequest: GoogleAuthPagesFunction<Env>[] = [
  (context) => {
    const env = context.env;
    return GoogleAuthPlugin({
      clientID: env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.AUTH_GOOGLE_CLIENT_SECRET,
      signAlg: 'HS256',
      signKey: env.HS256_SIGN_KEY,
      stateExpirationTime: '10m',
      scope: 'openid',
      prompt: 'select_account',
    })(context);
  },
  ({ data, next }) => {
    if (data.payload) {
      return new Response(JSON.stringify(data.payload, undefined, 2));
    }
    return next();
  },
];
