/*
## 問題 6.8 💻 📄


p.157 下部で記載されているテンプレートオブジェクトに存在しないプロパティをあるオブジェクトから削除する `restrict()` 、あるオブジェクトのプロパティを別のオブジェクトから削除する `substract()` 関数を以下の通り実装しなさい。
与えられたテストを全てパスすること。
Symbol と継承プロパティは考慮しなくてよい。

```js
function restrict(target, template);
```

**引数**
`target` 削除先オブジェクト — 削除対象プロパティを適用するもので、オリジナル変更後に返されます。Symbol と継承プロパティは削除対象外です。
`template` テンプレートオブジェクト — このオブジェクトに存在しないプロパティは削除先オブジェクトから削除されます。継承プロパティはテンプレートオブジェクトに存在していても削除先オブジェクトが継承プロパティ以外で同名をもつ場合削除対象になります。
**返値**
削除先オブジェクトです。
```js
function substract(target, ...sources);
```
**引数**
`target` 削除先オブジェクト — 削除対象プロパティを適用するもので、オリジナル変更後に返されます。Symbol と継承プロパティは削除対象外です。
`sources` 削除対象指定オブジェクト (単数または複数) — 削除したいプロパティを含むオブジェクトです。Symbol と継承プロパティは削除対象になりません。
**返値**
削除先オブジェクトオブジェクトです。
**出題範囲**: 6.7
 */

/*
function merge(target, ...sources){
    for(let source of sources){
        for(let key of Object.keys(source)){
            if(!(key in target)){
                target[key] = source[key];
            }
        }
    }
    return target;
}
console.log(Object.assign({x:1},{x:2, y:2},{y:3, z:4}));
console.log(merge({x:1},{x:2, y:2},{y:3, z:4}));
*/

export function restrict(target, template){
    for(let key of Object.keys(target)){
        if(!(key in template)){
            delete target[key]
        }
    }
    return target;
};

export function subtract(target, ...sources) {
    for (let source of sources) {
        for (let key of Object.keys(source)) {
            if (key in target) {
                delete target[key];
            }
        }
    }
    return target;
}

const obj = { x: 1, y: 2, z: 3 };
const template = { x: 1, y: 2 };
restrict(obj, template);
console.log(obj); // 出力: { x: 1, y: 2 }

const obj2 = { a: 1, b: 2, c: 3 };
const source1 = { a: 1, b: 2 };
const source2 = { b: 2 };
subtract(obj2, source1, source2);
console.log(obj2); // 出力: { c: 3 }
