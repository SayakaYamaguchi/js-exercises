/**
 * ## 問題 5.9 💻🧪
任意の文字列を引数にとり、その文字列が JSON としてパース出来る場合 `{success: true, data: <パースしたデータ>}`を返し、できない場合 `{success: false, error: <エラー内容>}` を返す関数を書きなさい
**出題範囲**: 5.5.7
 */
 
const inputJson = '{"yokohama":"045","kawasaki":"044","ebina":"0460"}';

export function jsonParserResult(input){
    const firstJsonString = '{"success": true}';
    const firstJsonObject = JSON.parse(firstJsonString);
    console.log(firstJsonObject);
    try{
        const inputData = JSON.parse(input);
        return {success: true, data: inputData};
    }
    catch(error){
        console.log(error.message);
        return {success: false, error: error.message}
    }

}


const result = jsonParserResult(inputJson);
console.log(result);