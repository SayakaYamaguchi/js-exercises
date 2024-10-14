document.getElementById('sendRequest1').addEventListener('click', function() {
  const message = document.getElementById('request1').value;
  sendRequest(message).then(response => {
    document.getElementById('response1').textContent = response;
  }).catch(error => {
    document.getElementById('response1').textContent = error.message;
  });
});

document.getElementById('sendRequest2').addEventListener('click', function() {
  const message = document.getElementById('request2').value;
  sendRequest(message).then(response => {
    document.getElementById('response2').textContent = response;
  }).catch(error => {
    document.getElementById('response2').textContent = error.message;
  });
});
