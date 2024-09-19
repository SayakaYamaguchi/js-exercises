async function sendRequestAndDisplay(requestNumber) {
    const input = document.getElementById(`request${requestNumber}`).value;
    const responseDiv = document.getElementById(`response${requestNumber}`);
    
    try {
      responseDiv.textContent = "Waiting for response...";
      const response = await sendRequest(input);
      responseDiv.textContent = `Response: ${response}`;
    } catch (error) {
      responseDiv.textContent = `Error: ${error.message}`;
      responseDiv.classList.add("error");
    }
  }
  
  function sendRequest(requestMessage, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket("ws://localhost:3003");
      const requestId = Math.random().toString(36).substring(2, 15); // リクエストIDを生成
  
      const timer = setTimeout(() => {
        ws.close();
        reject(new Error("Request timed out"));
      }, timeout);
  
      ws.onopen = () => {
        ws.send(JSON.stringify({ requestId, requestMessage }));
      };
  
      ws.onmessage = (event) => {
        const { requestId: receivedId, responseMessage } = JSON.parse(event.data);
        if (receivedId === requestId) {
          clearTimeout(timer);
          resolve(responseMessage);
          ws.close();
        }
      };
  
      ws.onerror = (err) => {
        clearTimeout(timer);
        reject(new Error("WebSocket error"));
      };
  
      ws.onclose = () => {
        clearTimeout(timer);
        reject(new Error("WebSocket connection closed"));
      };
    });
  }
  