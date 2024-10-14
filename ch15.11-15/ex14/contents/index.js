"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  // ボタンを非活性化
  button.disabled = true;

  // サーバーとのやり取りを開始
  const eventSource = new EventSource("http://localhost:3000/message");

  eventSource.onmessage = function (event) {
    const data = JSON.parse(event.data); // サーバーからのデータをパース
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.textContent = "";
    messageContainer.appendChild(messageElement);

    // TODO: ここにサーバーとのやり取り等を実装しなさい
    // doneがtrueなら通信を終了
    if (data.done) {
      eventSource.close();
      button.disabled = false; // ボタンを再度有効化
    }

    // エラー時の処理
    eventSource.onerror = function () {
      console.error("サーバーとの通信中にエラーが発生しました");
      eventSource.close();
      button.disabled = false; // エラーが発生してもボタンを再度有効化
    };
  };
}
