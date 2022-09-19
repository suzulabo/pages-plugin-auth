import type { PluginArgs } from '..';

type PluginFunction = PagesPluginFunction<
  unknown,
  string,
  Record<string, string>,
  PluginArgs
>;

export const onRequestGet: PluginFunction = ({ pluginArgs }) => {
  return new Response(JSON.stringify(pluginArgs));
};
