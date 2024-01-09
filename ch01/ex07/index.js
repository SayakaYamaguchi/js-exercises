/*
## 問題 1.7 💻🧪

`Point` クラスに対し、引数として渡された `Point` クラスのインスタンスの座標を自分の座標に加算するメソッド `add` を定義しなさい。

**出題範囲**: 1.3
*/

// Pointクラス
class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(otherPoint){                          // 引数として渡された Point インスタンスの座標を自分の座標に加算するメソッド
        if (otherPoint instanceof Point) {
            this.x += otherPoint.x;
            this.y += otherPoint.y;

        }else{
            console.error('無効な引数です');
        }
    }
}


// test
/*
 const point1 = new Point(1, 2);
 const point2 = new Point('aaa', 4);
 point1.add(point2);
*/

export default Point;
