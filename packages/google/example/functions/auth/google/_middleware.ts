import GoogleAuthPlugin from '@suzulabo/pages-plugin-auth/google';

export const onRequest: PagesFunction = async (context) => {
  return GoogleAuthPlugin({
    clientID: 'a',
    clientSecret: 'b',
    signKey: 'c',
  })(context);
};
