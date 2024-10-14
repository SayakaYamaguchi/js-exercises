/*
## 問題 9.6 💻 🧪
例 9-6 の `TypedMap` を継承ではなくコンポジションを使って書き換えなさい。処理を完全に Map に委譲するメソッドはテストを省略してもよい。
**出題範囲**: 9.5.3
*/

export class TypedMap {
    constructor(keyType, valueType, entries) {
        this.map = new Map();

        if (entries) {
            for (let [k, v] of entries) {
                if (typeof k !== keyType || typeof v !== valueType) {
                    throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
                }
            }
        }

        // entries を使って Map インスタンスを初期化
        if (entries) {
            for (let [k, v] of entries) {
                this.set(k, v);
            }
        }

        // 型情報を保存
        this.keyType = keyType;
        this.valueType = valueType;
    }

    set(key, value) {
        // 型チェック
        if (this.keyType && typeof key !== this.keyType) {
            throw new TypeError(`${key} is not of type ${this.keyType}`);
        }
        if (this.valueType && typeof value !== this.valueType) {
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }

        // Map インスタンスにキーと値を追加
        this.map.set(key, value);
    }

    get(key) {
        // Map インスタンスから値を取得
        return this.map.get(key);
    }

    // 他の Map メソッドも同様に委譲できます

    // 例えば、次のように clear() メソッドを委譲することができます
    clear() {
        this.map.clear();       // Map クラスの get メソッドは、キーが存在しない場合には単に undefined を返すだ
                                // value === undefinedの場合にthrow new TypeErrorにできるが、そうなると「存在しないキーを取得するとエラーへスロー」テストはOkだが
                                // 「値を正しくクリア」は期待値がundefinedなので動かなくなる
    }
}

const map = new TypedMap("string", "number");
  
console.log(map.get("nonexistent")); //.toThrow(TypeError);
/*  
    const map = new TypedMap("string", "number");
    map.set("key1", 10);
    map.set("key2", 20);

    map.clear();

    console.log(map.get("key1"));
    console.log(map.get("key2"));
*/
/*
// 9.5.2 extendsとsuperによるサブクラス化
class TypedMap extends Map{
    constructor(keyType, valueType, entries){
        if(entries){
            for(let [k, v] of entries){
                if ( typeof k !== keyType || typeof v != valueType){
                    throw new TypeError('Wrong type for entry [[${k}, ${v}]');
                }
            }
        }
        // （型チェックされた）entriesを使って、スーパークラスを初期化する
        super (entries);

        // 次に型を保存して、サブクラスを初期化する
        this.keyType = keyType;
        this.values = valueType;
    }


    // set()メソッドを再定義して、マップに追加されるキーと値のペアに対して型チェックを行うようにする
    set(key, value){
        // keyやvalueの方が異なっている場合はエラーをスローする
        if(this.keyType && typeof key !== this.keyType){
            throw new TypeError(`${key} is not of type ${this.valueType}`);
        }
        if(this.valueType && typeof value!== this.valueType){
            throw new TypeError(`${value} is not of type ${this.valueType}`);
        }

        // 型が正しい場合、スーパークラスのset()メソッドを呼び出し
        // エントリをマップに追加する。スーパークラスから返されたものを
        // そのまま返す
        return super.set(key, value);
    }
}
 */