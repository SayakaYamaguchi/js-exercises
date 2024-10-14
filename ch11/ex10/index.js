/*
## 問題 11.10 💻🧪
**出題範囲**: 11.4
*/

// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function daysCalculation(year, month){
    const dayMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];  // 12か月の日数

    if(month === 2){
        if((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)){     // うるう年の場合は29日
            return 29;
        }
        return dayMonth[month - 1];                                     // 日数配列から月で日付取得
    }else{
        return dayMonth[month - 1];                                     // 日数配列から月で日付取得
    }

}


//- 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function daysCount(start, end){
    const startDays = new Date(start);  // 開始日のDataオブジェクト
    const endDays = new Date(end);      // 終了日のDataオブジェクト

    let countWeekdays = 0;
    let currentDate = new Date(startDays);

    while(currentDate <= endDays){
        const dayofWeek = currentDate.getDay();

        if(dayofWeek !== 0 && dayofWeek !==6){      // 日曜と土曜以外に日付をカウント
            countWeekdays++;
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }
    return countWeekdays
}

//- 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function dayWeek(inputDate, inputLocale){
    const date = new Date(inputDate);
    const options = { weekday: 'long', timeZone: 'UTC', locale: inputLocale };  // ロケールを指定して曜日を取得するためのオプション
    const dayOfWeek = new Intl.DateTimeFormat(inputLocale, options).format(date);    // 日付から曜日を取得してロケールに基づいた文字列を生成
    return dayOfWeek;
}
/*
const inputDate = '2024-07-01';
const inputLocale = 'en-US'; // ロケールを日本語（日本）に設定
const dayOfWeek = dayWeek(inputDate, inputLocale);
console.log(`指定された日付の曜日は「${dayOfWeek}」です。`);
*/


// 途中
//- ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。
// ただし getMonth、setMonth は利用してはいけない。
export function dateObj(){
//    const currentDate = new Date();
    const date = new Date();
    const localString = date.toLocaleDateString();
    console.log(localString );
    const regex = /\/([^/]+)\//g;
    const matches  = localString.match(regex);
    const matchesMonth = matches.map(match => match.slice(1, -1));
    const month = matchesMonth[0];
    console.log(month );
    
    const year = localString.substring(0, 4);
    console.log(year);

    if(month == 0){
        month = 12;
        year = year - 1;
    }

    let lastMonthStartDate = new Date(year, month - 1, 1, 0, 0, 0, 0);

    return(lastMonthStartDate);
}
console.log(dateObj());


