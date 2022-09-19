export type PluginArgs = {
  clientID: string;
  clientSecret: string;
  signKey: string;
};

export default function GoogleAuthPlugin(args: PluginArgs): PagesFunction;
