/*
## 問題 6.1 💪 💻 🧪

p.141 では、文字列から値へのマッピングの構造として、「ハッシュ」や「ハッシュテーブル」の記載がある。
文字列をハッシュ値（数値）に変換する[ハッシュ関数](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E9%96%A2%E6%95%B0)と、
ハッシュ関数を用いて文字列から値へのマッピングを行う[ハッシュテーブル](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB) オブジェクトを実装しなさい。
ハッシュテーブルは下記のコードを参考に、以下の要件を満たすようにしなさい。

- マッピングの追加、取得、削除を行うメソッドおよびマッピング数を示すプロパティをもつこと。
- ハッシュ値が衝突した場合はリンクリスト形式で複数のマッピングを保持すること。
- リハッシュ/リサイズについては考慮しなくてよいものとする。

```js
function newHashTable() {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries:[] // マッピングを格納する配列
    get(key) {
      // keyにマップされた値を取得する
    },
    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
    },
    remove(key) {
      // keyのマッピングを削除する
    },
  };
}

function sample() {
  const hashTable = newHashTable();
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}
```

**出題範囲**: 6.1
 */

function newHashTable() {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries:[] // マッピングを格納する配列
    get(key) {
      // keyにマップされた値を取得する
    },
    put(key, value) {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
    },
    remove(key) {
      // keyのマッピングを削除する
    },
  };
}

function sample() {
  const hashTable = newHashTable();
  hashTable.put("key1", "value1");
  hashTable.put("key2", { value: "value2" });

  console.log(`size=${hashTable.size}`); // => size=2
  console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
  console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

  hashTable.put("key2", "new value");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

  hashTable.remove("key2");

  console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
  console.log(`size=${hashTable.size}`); // => size=1
}