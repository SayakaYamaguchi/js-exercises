import { A } from "./index.js"; // ts でも可

test("class puzzle", () => {
  expect(A.method()).toBe(1);
  expect(new A().method()).toBe(2);
  expect(A.B.method()).toBe(3);
  expect(new A.B().method()).toBe(4);
  expect(new A().B.method()).toBe(5);
  expect(new new A().B().method()).toBe(6);
});

