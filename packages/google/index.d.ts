export type PluginArgs = {
  clientID: string;
  clientSecret: string;
  state: {
    signAlg: string;
    signKey: string;
    expirationTime: string;
  };
};

export default function GoogleAuthPlugin(args: PluginArgs): PagesFunction;
