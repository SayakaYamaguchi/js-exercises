# 問題 15.1-3.4 🖋
グローバルオブジェクトを参照する方法を、ブラウザ内、node内、ブラウザnode問わずの３種記しなさい。
また、ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記しなさい。
最後に、グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたかを記しなさい。

出題範囲 15.1.3

## グローバルオブジェクトを参照する方法　３種

### ブラウザ
console.log(window); 
window.alert('Hello　World!');

### node
console.log(global);

### WorkerGlobalScope
console.log(self);

### ECMAScript 2015（ES6）以降では、どの環境でも標準的にグローバルオブジェクトを参照できる globalThis が導入
console.log(globalThis); 



## ブラウザとnodeのグローバルオブジェクトのプロパティやメソッドを比較し、ブラウザ独自のものを10程度記

ブラウザとnode共通
console
setTimeout, setInterval
clearTimeout, clearInterval



### ブラウザ独自
https://developer.mozilla.org/ja/docs/Web/API/Window
Window.closed       現在のウィンドウが閉じているかどうかを示します。
Window.console      ブラウザーのデバッグコンソールへアクセスするための console オブジェクトへの参照を返します。
Window.localStorage 生成元のオリジンからのみアクセスが可能なデータを保存するために使用する、ローカルストレージオブジェクトへの参照を返します。
Window.location     window オブジェクトのロケーション、または現在の URL を取得 / 設定します。
Window.name         ウィンドウ名を取得 / 設定します。
Window.navigator    navigator オブジェクトへの参照を返します。
Window.origin       グローバルオブジェクトのオリジンを、文字列としてシリアライズして返します。
Window.outerHeight  ブラウザーウィンドウの外側の高さを取得します。
Window.outerWidth   ブラウザーウィンドウの外側の幅を取得します。
Window.scrollbars   ウィンドウ内で表示 / 非表示の切り替え (トグル) が可能な、 scrollbars オブジェクトを返す


## グローバルオブジェクトにundefinedが定義されていることを確認し、過去のES仕様でどのような問題が発生していたか
nodeで確認済み
console.log(global.undefined); // undefined
console.log(globalThis.undefined); // undefined


ES3以前はundefined が再代入可だったため、バグやコードの可読性低下の原因となっていた
ES5からundefinedは予約語ではないが、グローバル変数の場合だけは再代入が不可となった

