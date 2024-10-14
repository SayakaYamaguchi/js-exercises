const ws = new WebSocket('ws://localhost:3003');

// サーバーからメッセージを受信した時の処理
ws.onmessage = function(event) {
  handleServerMessage(event);
};

// WebSocketが閉じられた場合の処理
ws.onclose = function() {
  handleWebSocketClose();
};
