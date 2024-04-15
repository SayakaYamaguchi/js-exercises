/*
## 問題 8.8 💻📄
文中の counter をグループ化したクロージャを持つ関数 counterGroup を実装しなさい。
具体的には counterGroup は以下のメソッドを持つオブジェクトを返却しなさい。
- counterGroup#newCounter(): 文中の count と reset 同等の機能を持つ counter オブジェクトを返却する
- counterGroup#total(): これまで返却された counter が保持しているカウントの合計を返却する
**出題範囲**: 8.6
*/

export function counterGroup() {
    let totalCount = 0;
    const counters = [];

    function newCounter() {
        let count = 0; // 各カウンターごとに個別のカウントを保持する

        function increment() {
            totalCount++;
            return count++;
        }

        function reset() {
            count = 0;
        }

        function getCount() {
            return count;
        }

        counters.push({ increment, reset, getCount });
        return { count: increment, reset };
    }

    function total() {
        return totalCount;
    }

    return { newCounter, total };
}
const cg = counterGroup();
const counter = cg.newCounter();
console.log(counter.count()); // 0
console.log(counter.count()); // 1
console.log(counter.count()); // 2


const cg1 = counterGroup();

const c11 = cg1.newCounter();
console.log(c11.count());
console.log(c11.count());
console.log(c11.count());
const c12 = cg1.newCounter();
console.log(c12.count());
console.log(c12.count());



/*
console.log(counterGroup.newCounter() );
counterGroup#newCounter()   //  文中の count と reset 同等の機能を持つ counter オブジェクトを返却する
counterGroup#total()        // これまで返却された counter が保持しているカウントの合計を返却する
*/