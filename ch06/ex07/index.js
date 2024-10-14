/**
## 問題 6.7 💻 🧪
`Object.assign()`と等価な関数 `assign()` を作成しなさい。
双方の関数が等価であることを確認するテストも作成しなさい。
少なくとも 6.7 節に記載された `Object.assign()` の仕様をカバーするテストケースを作成すること。
**出題範囲**: 6.7
 */

const marge = {};

export function assign(source1, source2){

    // source1の中身をmargeにコピー
    for(let key of Object.keys(source1)){
        marge[key] = source1[key];
    }

    //source1の中身をmargeにコピー。プロパティ名が重複する場合は上書き
    for(let key of Object.keys(source2)){
        marge[key] = source2[key];
    }
    console.log(marge);
    return(marge);
}

export function ObjAssign(target, source1, source2){
    Object.assign(target, source1, source2);
    return(target);
}
// assign(source1 , source2);
