/*
## 問題 11.2 💻🧪
オブジェクトを1つ引数に取り、何らかの時間のかかる計算を行い、与えられた引数に対して一意な結果を返す関数`slowFn`を考える。
`slowFn`の計算結果をキャッシュし、同じ引数で繰り返し呼び出された時にはキャッシュを返す関数`cachedSlowFn`を生成する関数`cache`を実装しなさい。
ただし`slowFn`の引数のオブジェクトが到達不能になった場合には、キャッシュがガベージコレクションの対象になるように実装しなさい。また`slowFn`は任意の実装で良い。

ガベージコレクション：メモリ上の不要なデータを自動的に削除する仕組みのこと。
```js
*  // f はオブジェクトを1つ引数に取る関数
function cache(f) {
*  // この関数を実装する
}

function slowFn(obj) {
*  // 時間のかかる処理
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);
```
**出題範囲**: 11.1
*/

// f はオブジェクトを1つ引数に取る関数
export function cache(f) { 
  const cacheMap = new WeakMap();   // ガベージコレクションの対象となるのはWeakMap。Mapは対象外

  // cache 関数が slowFn をラップし cachedSlowFn を生成
  function cachedSlowFn(obj){
    if(!cacheMap.has(obj)){         // キャッシュマップにobjがない（初回 or ガベージコレクションの対象)
      console.log(obj);
      console.log('キャッシュマップにobjなし');
      const result = f(obj);        // slowFnを実行して結果を計算
      cacheMap.set(obj, result);    // cacheMapに結果をセット
    }else{
      console.log(obj);
      console.log('キャッシュマップにobj保持');
    }
    return cacheMap.get(obj);
  }
  // キャッシュマップを返す
  return cachedSlowFn;
}

export function slowFn(obj) {
  // 時間のかかる計算　
  let result = 0;
  for(let i = 0; i < 1000000000; i++){
    result += i
  }
  return obj;
}
// cachedSlowFnを生成
// const cachedSlowFn = cache(slowFn);

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
/*
const obj1 = { key: 'value1' };
const obj2 = { key: 'value2' };

console.log(cachedSlowFn(obj1));
console.log(cachedSlowFn(obj1));
console.log(cachedSlowFn(obj2));
console.log(cachedSlowFn(obj2));
*/
