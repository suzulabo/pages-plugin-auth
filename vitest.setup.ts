import { webcrypto } from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _global: { crypto: webcrypto.Crypto } = globalThis as any;

_global.crypto = webcrypto;
