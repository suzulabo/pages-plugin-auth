import { JWTPayload } from 'jose';

type PluginData = {
  payload?: JWTPayload;
};

type PluginArgs = {
  clientID: string;
  clientSecret: string;
  scope: string;
  signAlg: string;
  signKey: string;
  stateExpirationTime: string;
  loginHint?: string;
  prompt?: string;
};

export type GoogleAuthPluginFunction = PagesPluginFunction<
  unknown,
  string,
  PluginData,
  PluginArgs
>;

export type GoogleAuthPagesFunction<Env> = PagesFunction<
  Env,
  string,
  PluginData
>;

export default function GoogleAuthPlugin(args: PluginArgs): PagesFunction;
