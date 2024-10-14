/*
## 問題 11.12 💻
テキストでは独自のエラーとして ParseError や HTTPError クラスの例がありました。
自分でも独自のエラーを実装しなさい。
エラーの例が思いつかない場合には、ファイルのパスを引数に受けとる関数で、
ファイルのサイズが許容サイズをオーバーしている場合に投げるエラーを実装しなさい。
**出題範囲**: 11.5
*/


// APIの戻り値のエラー処理

function getData(url){
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response =>{
                if(!response.ok){
                    if(response.status === 404){
                        reject(new Error('not found'));             // 404エラーをreject
                    }else{
                        reject(`HTTP error: ${response.status}`);   // その他のエラーをrejectする
                    }
                }else{
                    resolve(response.json());    // 正常にjson取得
                    // jsonに対する処理
                }
            })
            .catch(error => {
                reject(error);      // fetch自体のエラーをreject
            });
    });
}


fetchData('http://www.sample.co.jp')
    .then(data =>{
        console.log('Data received:', data);
        // 正常なレスポンス時の処理
    })
    .catch(error => {
        console.error('Fetch error;', error.message);
    });

