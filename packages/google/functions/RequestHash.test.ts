import { base64url } from 'jose';

import { getRequestHash } from './RequestHash';

it('basic', async () => {
  expect(
    base64url.encode(
      await getRequestHash(
        new Request('https://test.test', {
          headers: new Headers({
            'Accept':
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
            'cf-ipcountry': 'JP',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
          }),
        })
      )
    )
  ).toEqual('MRZ6-WtgTtlK9Bsj5covNC1dgIcV_z-SeRk9Put-Ek0');

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
