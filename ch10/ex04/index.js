/*
任意の関数・クラスを作成し、「ES6のモジュール」方式で別ファイルから利用するコードを実装しなさい。
ただし、デフォルトのインポート、名前変更を伴うインポート、再エクスポートをそれぞれ実施すること。
*/

// デフォルトのインポート
import getTodayDate from './date.js';
const { year, month, day } = getTodayDate();
const formattedDate = `${year}-${month}-${day}`; // 年-月-日の形式で日付を整形
console.log(formattedDate);

// 名前を伴うインポート
/*
import { getTodayDate, getDayOfWeekFromDate } from './date.js';
const { year, month, day } = defaultValue.getTodayDate();
const today = defaultValue.getDayOfWeekFromDate(year, month, day);
console.log(today);
*/

// 名前変更を伴うインポート

import {getDayOfWeekFromDate02 as week} from './week.js';
const today = week(year, month, day);
console.log(today);


// 再エクスポート
export {getTodayDate};
