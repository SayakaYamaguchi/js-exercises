test("各座標のテスト", () => {
    let points = [{x:1, y:2}, {x:3, y:4}];
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = points;
    expect(x1).toBe(1);
    expect(y1).toBe(2);
    expect(x2).toBe(3);
    expect(y2).toBe(4);
});


// 確認
/*
let points = [{x:1, y:2}, {x:3, y:4}];
const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = points;
console.log(x1);
console.log(y1);
console.log(x2);
console.log(y2);
*/
