import { webcrypto } from 'crypto';

import { Request, Headers } from 'node-fetch';

/* global global */
global.Request = Request;
global.Headers = Headers;
global.crypto = webcrypto;
