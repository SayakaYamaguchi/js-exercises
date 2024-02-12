/* eslint-disable strict */
/*
## 問題 5.10 💻🖋️
オブジェクトのプロパティアクセスで、`with`を使用した場合と使用しない場合での速度をそれぞれ計測しなさい。
**出題範囲**: 5.6.1
*/
function testWithStatement(obj) {
    /* eslint-disable strict */
    let start = performance.now();
    with (obj){
        console.log(prop1, prop2, prop3);
    }
    let end = performance.now();
    console.log('Time with with: ', end - start);
}

function testWithoutStatement(obj) {
    let start = performance.now();
    console.log(obj.prop1, obj.prop2, obj.prop3);
    let end = performance.now();
    console.log('Time with with: ', end - start);
}

// テスト用のオブジェクト
const testObject = { prop1: 1, prop2: 2, prop3: 3 };

testWithStatement(testObject);
testWithoutStatement(testObject);
