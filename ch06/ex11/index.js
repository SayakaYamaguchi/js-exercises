/*
## 問題 6.11 💻 🧪
極座標 `r` と `theta` をプロパティにもち、ゲッターとセッターをもつ読み書き可のアクセサプロパティとしてデカルト座標 `x` と `y` をもつオブジェクトを実装しなさい。
セッターメソッドにおいて `x` と `y` それぞれに `NaN` が設定される場合にはエラーにしなさい。

Math.hypot：与えられた数値の平方和の平方根を計算する
　例）Math.hypot(3, 4) // =>5
Math.atan2()：角度　2つの引数を取り、y軸とx軸の間の角度をラジアンで返す 
　例）Math.atan2(1, 1)　// => 0.7853981633974483 (45度をラジアンで表現)

極座標:点の位置を原点からの距離と原点からの角度で表します。極座標系は、直交座標系（デカルト座標系）と対照をなす座標系
 r:半径　原点から点までの距離を表します。原点からの距離が r の円周上に点があると考えらる
 theta:角度　原点から点への直線がX軸となす角度を表します。一般的に、X軸の正の方向から反時計回りに角度が測られる

 デカルト座標：X座標とY座標だけでなく、基準となる原点（原点の座標）が必要
 const x = 3;
 const y = 4;
 デカルト座標を表示する
 console.log(`(${x}, ${y})`); // 出力: (3, 4)


**出題範囲**: 6.10.6
*/
export const Coordinate ={
    _x : 0,       // デカルト座標
    _y : 0,       // デカルト座標
    _r : 0,       // 極座標の半径
    _theta : 0,   // 極座標の角度

    // X座標
    get x(){return this._x;},
    set x(val){
        if(isNaN(val)){
            throw new Error('xは数値以外の値です');
        }
        this._x = val;
        this._r = Math.hypot(this._x, this._y);
        this._theta = Math.atan2(this._y, this._x);
    },

    // y座標
    get y(){return this._y;},
    set y(val){
        if(isNaN(val)){
            throw new Error('yは数値以外の値です');
        }
        this._y = val;
        this._r = Math.hypot(this._x, this._y);
        this._theta = Math.atan2(this._y, this._x);
    },

    // r半径
    get r(){return this._r;},
    set r(val){
        if(isNaN(val)){
            throw new Error('rは数値以外の値です');
        }
        this._r = val;
        this._x = Math.cos(this._theta);
        this._y = Math.sin(this._theta);
    },

    // theta角度
    get theta(){return this._theta;},
    set theta(val){
        if(isNaN(val)){
            throw new Error('rは数値以外の値です');
        }
        this._r = val;
        this._x = Math.cos(this._theta);
        this._y = Math.sin(this._theta);
    }
};


// デカルト座標の設定
/*
Coordinate.x = 3;
Coordinate.y = 4;

console.log(`x: ${Coordinate.x}, y:${Coordinate.y}`);
console.log(`r: ${Coordinate.r}, theta:${Coordinate.theta}`);
*/
