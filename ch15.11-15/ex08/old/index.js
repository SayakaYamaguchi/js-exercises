let ws = null;
const responseMap = new Map();

// WebSocket接続関数
function connectWebSocket() {
  ws = new WebSocket('ws://localhost:3003');

  ws.onopen = () => {
    console.log('WebSocket connection opened');
  };

  ws.onmessage = (event) => {
    const { id, message } = JSON.parse(event.data);
    if (responseMap.has(id)) {
      const { resolve } = responseMap.get(id);
      resolve(message); // レスポンスを返す
      responseMap.delete(id); // マップから削除
    }
  };

  ws.onclose = () => {
    console.error('WebSocket connection closed');
    // すべてのリクエストをエラーとして処理
    responseMap.forEach(({ reject }) => reject(new Error('WebSocket disconnected')));
    responseMap.clear();
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
}

// リクエストを送信する関数
function sendRequest(requestBody, timeout = 5000) {
  return new Promise((resolve, reject) => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      reject(new Error('WebSocket is not connected'));
      return;
    }

    const id = Date.now().toString(); // 一意のIDを生成
    const message = { id, requestBody };

    responseMap.set(id, { resolve, reject });

    ws.send(JSON.stringify(message)); // リクエストを送信

    // タイムアウト処理
    setTimeout(() => {
      if (responseMap.has(id)) {
        reject(new Error('Request timed out'));
        responseMap.delete(id); // タイムアウト後に削除
      }
    }, timeout);
  });
}

// ページが読み込まれた時にWebSocket接続
window.addEventListener('load', () => {
  connectWebSocket();

  // 各リクエスト送信ボタンにイベントを追加
  const sendButtons = document.querySelectorAll('.send-btn');
  sendButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const inputField = button.previousElementSibling;
      const responseField = button.nextElementSibling;
      const requestValue = inputField.value;

      // リクエスト送信
      sendRequest(requestValue)
        .then((response) => {
          responseField.textContent = `Response: ${response}`;
          responseField.style.color = 'green';
        })
        .catch((error) => {
          responseField.textContent = `Error: ${error.message}`;
          responseField.style.color = 'red';
        });
    });
  });
});
