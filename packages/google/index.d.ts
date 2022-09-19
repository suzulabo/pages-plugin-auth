export type PluginArgs = {
  clientID: string;
  clientSecret: string;
  scope: string;
  signAlg: string;
  signKey: string;
  stateExpirationTime: string;
  loginHint?: string;
  prompt?: string;
};

export default function GoogleAuthPlugin(args: PluginArgs): PagesFunction;
