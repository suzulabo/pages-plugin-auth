import { base64url } from 'jose';

import { getRequestHash } from './RequestHash';

test('basic', async () => {
  expect(
    base64url.encode(
      await getRequestHash(
        new Request('https://test.test', {
          headers: new Headers({
            'Accept': 'a',
            'Accept-Language': 'b',
            'cf-ipcountry': 'c',
            'User-Agent': 'd',
          }),
        })
      )
    )
  ).toEqual('z5Iyb4X1CqhlvnZUA6ING2dyzSTyYooVsx1T65FQsEM');
});

test('empty', async () => {
  expect(
    base64url.encode(await getRequestHash(new Request('https://test.test', {})))
  ).toEqual('cJ6AyISHokEeHuTfufIqhhSS0gxHZRUMDHlKvXD4FHw');
});
