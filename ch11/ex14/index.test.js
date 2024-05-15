import {sortJapanese, toJapaneseDateString} from "./index.js";


describe("toJapaneseDateString", () => {
  let test01 = ["つ", "ば", "は", "っ", "だ", "あ", "た", "わ", "ぱ" ];
  expect(sortJapanese(test01)).toBe(['あ', 'た', 'だ', 'っ', 'つ', 'は', 'ば', 'わ']);


});


describe("toJapaneseDateString", () => {
  let today = new Date();
  let reiwa =  new Date(2020,1,13);
  let heisei = new Date(1999,2,20);
  let showa =  new Date(1981,9,10);
  let taisyo = new Date(1912,6,30);
  let meizi =  new Date(1912,6,29);
  
  let keio =   new Date(1867,1,250);
  let kaho =   new Date(1094,12,15);
  let kara =   new Date(794,1,15);
  let err = '入力は 明治～令和 以外の日付にしてください';
  expect(toJapaneseDateString(today)).toBe("令和6年5月16日");
  expect(toJapaneseDateString(reiwa)).toBe("令和2年2月13日");
  expect(toJapaneseDateString(heisei)).toBe("平成11年3月20日");
  expect(toJapaneseDateString(showa)).toBe("昭和56年10月10日");
  expect(toJapaneseDateString(taisyo)).toBe("大正1年7月30日");
  expect(toJapaneseDateString(meizi)).toBe("明治45年7月29日");
  expect(toJapaneseDateString(keio)).toBe(err);
  expect(toJapaneseDateString(kaho)).toBe(err);
  expect(toJapaneseDateString(kara)).toBe(err);
});
