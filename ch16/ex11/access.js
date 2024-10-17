import net from 'net';

// サーバーのホストとポートを設定
const host = 'localhost';
const port = 8080;

// 接続を維持するクライアント数を指定
const totalClients = 1000;  // ここを増減して限界をテスト
const clients = [];
let connectedClients = 0;

for (let i = 0; i < totalClients; i++) {
  const client = new net.Socket();

  client.connect(port, host, () => {
    connectedClients++;
    console.log(`Client ${i + 1} connected. Total connected: ${connectedClients}`);
  });

  client.on('error', (err) => {
    console.log(`Client ${i + 1} error: ${err.message}`);
  });

  client.on('close', () => {
    connectedClients--;
    console.log(`Client ${i + 1} disconnected. Total connected: ${connectedClients}`);
  });

  clients.push(client);
}

// プロセス終了時に全クライアントを閉じる
process.on('SIGINT', () => {
  console.log('Closing all clients...');
  clients.forEach(client => client.destroy());
  process.exit();
});
