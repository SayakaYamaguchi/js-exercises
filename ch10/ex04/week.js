export function getDayOfWeekFromDate02(year, month, day) {
    // 指定された年月日で Date オブジェクトを作成
    const date = new Date(`${year}-${month}-${day}`);

    // 曜日のテキストを取得するための配列
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Date オブジェクトから曜日のインデックスを取得
    const dayIndex = date.getDay();
    const formattedDate = `${year}-${month}-${day}-${weekdays[dayIndex]}`; // 年-月-日の形式で日付を整形


    // 曜日のテキストを返す
    return formattedDate;
}

