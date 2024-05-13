import {getTodayDate} from './index.js';

const { year, month, day } = getTodayDate();
const formattedDate = `${year}-${month}-${day}`; // 年-月-日の形式で日付を整形
console.log(formattedDate);

