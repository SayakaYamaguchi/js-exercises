import Point from "./index.js";
// const Point = require('./index.js');

    it("元のpoint1にpoint2の座標を追加する", () => {
      const point1 = new Point(1, 2);
      const point2 = new Point(3, 4);

      point1.add(point2);

      expect(point1.x).toBe(4);
      expect(point1.y).toBe(6);

    });

/*
    it("追加の座標が無効な値の場合は", () => {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 'def');
      
      point1.add(point2);

      expect(point1.x).toBe(2);
      expect(point1.y).toBe(6);

    });
*/