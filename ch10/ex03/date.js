function getTodayDate() {
    const today = new Date(); // 現在の日時を取得
    const year = today.getFullYear(); // 年を取得
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月を取得 (0-indexedなので+1する)
    const day = String(today.getDate()).padStart(2, '0'); // 日を取得
  
    const formattedDate = `${year}-${month}-${day}`; // 年-月-日の形式で日付を整形
    return formattedDate;
}

// 関数をexportする
module.exports = { getTodayDate };