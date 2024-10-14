/*
## 問題 10.3 💻
任意の関数・クラスを作成し、「Nodeのモジュール」方式で別ファイルから利用するコードを実装しなさい。
**出題範囲**: 10.2
*/

// date.jsモジュールをインポートする
const { getTodayDate } = require('./date');

// インポートした関数を使用して今日の日付を取得する
const todayDate = getTodayDate();
console.log(todayDate);