import { PluginArgs } from '..';

export type PluginFunction = PagesPluginFunction<
  unknown,
  string,
  Record<string, string>,
  PluginArgs
>;
