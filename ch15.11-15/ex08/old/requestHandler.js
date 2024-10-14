let requestIdCounter = 0;
const pendingRequests = new Map();

function sendRequest(requestMessage, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const requestId = requestIdCounter++;
    const messageWithId = JSON.stringify({ requestId, requestMessage });

    // タイムアウト処理
    const timeoutId = setTimeout(() => {
      pendingRequests.delete(requestId);
      reject(new Error("Request timed out"));
    }, timeout);

    // リクエストIDで待機する
    pendingRequests.set(requestId, {
      resolve,
      reject,
      timeoutId,
    });

    ws.send(messageWithId);
  });
}

// サーバーからのメッセージを受信した時の処理
function handleServerMessage(event) {
  const { requestId, responseMessage } = JSON.parse(event.data);

  if (pendingRequests.has(requestId)) {
    const { resolve, timeoutId } = pendingRequests.get(requestId);
    clearTimeout(timeoutId);
    pendingRequests.delete(requestId);
    resolve(responseMessage);
  }
}

// WebSocketが閉じられた時の処理
function handleWebSocketClose() {
  pendingRequests.forEach((_, id) => {
    pendingRequests.get(id)?.reject(new Error("WebSocket disconnected"));
    clearTimeout(pendingRequests.get(id)?.timeoutId);
  });
  pendingRequests.clear();
}
