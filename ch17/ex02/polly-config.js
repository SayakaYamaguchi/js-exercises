import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FsPersister from '@pollyjs/persister-fs';

Polly.register(NodeHttpAdapter);
Polly.register(FsPersister);

export function setupPolly() {
  return new Polly('GitHubAPI', {
    adapters: ['node-http'],
    persister: 'fs',
    logging: true,
    recordIfMissing: true, // 未記録のリクエストを記録
    recordFailedRequests: true, // 失敗リクエストも記録
    mode: 'record', // リクエストを記録するモード
    matchRequestsBy: {
      headers: {
        exclude: ['authorization'], // トークンはマッチングから除外
      },
    },
  });
}
