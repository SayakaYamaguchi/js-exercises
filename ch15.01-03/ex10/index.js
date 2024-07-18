/*
問題 15.1-3.10 💻📄
div 要素とテキスト input 要素が以下のようにイベント処理されるように実装を追加しなさい。

div 要素をクリックすると input 要素が focus される
div 要素は通常白色で input 要素に focus されると灰色 (silver)になる (input 要素から focus が外れると白色に戻る)
input 要素に入力された text は div 要素にも表示される
出題範囲 15.2
*/

document.addEventListener('DOMContentLoaded', (event) => {
    const divElement = document.getElementById('editor-front');
    const inputElement = document.getElementById('editor-back');
  
    // div要素をクリックするとinput要素がfocusされる
    divElement.addEventListener('click', () => {
      inputElement.focus();
    });
  
    // input要素にfocusされるとdivの背景色を変更し、focusが外れると戻す
    inputElement.addEventListener('focus', () => {
      divElement.style.backgroundColor = 'silver';
    });
  
    inputElement.addEventListener('blur', () => {
      divElement.style.backgroundColor = 'white';
    });
  
    // input要素に入力されたテキストをdiv要素にも表示する
    inputElement.addEventListener('input', () => {
      divElement.textContent = inputElement.value;
    });
  });