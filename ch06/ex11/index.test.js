import {Coordinate} from "./index.js";

test('Setting x and y properties of Coordinate object', () => {
    Coordinate.x = 3;
    Coordinate.y = 4;
    
    // 期待される値
    const expectedR = 5;
    const expectedTheta = 0.9272952180016122;
  
    // 結果の確認
    expect(Coordinate.r).toBe(expectedR);
    expect(Coordinate.theta).toBe(expectedTheta);
  });
  