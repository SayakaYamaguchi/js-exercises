/*
## 問題 5.12 💻

非 strict モードでは動作するが strict モードでは動作しないプログラムを書き、それぞれ `not-strict.js`, `strict.js` として作成しなさい。
`strict.js` を変更することによって、strict モードでも動作するようにしたプログラム `strict-fixed.js` を作成しなさい。
ただし、拡張子 `.js` は必要があれば変更してよい。

**ヒント**:
package.json で `"type": "module"` が指定されている場合、Node 上では `.js` ファイルが常に strict モードで実行される。
非 strict モードで実行したい場合は `.js` ではなく `.cjs` ファイルとして作成するとよい。
他には `.html` ファイルとして作成してブラウザ上で実行する方法もある。

**出題範囲**: 5.6.3
*/


// 海なし県を出力する


    let prefectures = {
        '北海道':'Sea',
        '青森県':'Sea',
        '岩手県':'Sea',
        '宮城県':'Sea',
        '秋田県':'Sea',
        '山形県':'Sea',
        '福島県':'Sea',
        '茨城県':'Sea',
        '栃木県':'notSea',
        '群馬県':'notSea',
        '埼玉県':'notSea',
        '千葉県':'Sea',
        '東京都':'Sea',
        '神奈川県':'Sea',
        '新潟県':'Sea',
        '富山県':'tSea',
        '石川県':'Sea',
        '福井県':'Sea',
        '山梨県':'notSea',
        '長野県':'notSea',
        '岐阜県':'notSea',
        '静岡県':'Sea',
        '愛知県':'Sea',
        '三重県':'Sea',
        '滋賀県':'Sea',
        '京都府':'Sea',
        '大阪府':'Sea',
        '兵庫県':'Sea',
        '奈良県':'notSea',
        '和歌山県':'Sea',
        '鳥取県':'Sea',
        '島根県':'Sea',
        '岡山県':'Sea',
        '広島県':'Sea',
        '山口県':'Sea',
        '徳島県':'Sea',
        '香川県':'Sea',
        '愛媛県':'Sea',
        '高知県':'Sea',
        '福岡県':'Sea',
        '佐賀県':'Sea',
        '長崎県':'Sea',
        '熊本県':'Sea',
        '大分県':'Sea',
        '宮崎県':'Sea',
        '鹿児島県':'Sea',
        '沖縄県':'Sea'
    }

    
    function output(input){
        if(prefectures){
            for (let key in prefectures){
                if(prefectures[key] === input){
                    console.log(key)
                }
            }
        }
    }
    
    output("notSea");
    