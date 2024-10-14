
describe("Emoji Tests", () => {
  it("文字名 `Hundred Points Symbol`の絵文字表現の長さを計測", () => {
    const emoji = "💯";
    expect(emoji.length).toBe(2);
  });

  it("utf-16 コードポイント表現 `\uD83D\uDCAF`が絵文字と同じ", () => {
    const emoji = "💯";
    const utf16 = "\uD83D\uDCAF";
    expect(emoji).toBe(utf16);
  });

  it("utf-32 コードポイント表現 `\u{0001F4AF}`が絵文字と同じ", () => {
    const emoji = "💯";
    const utf32 = "\u{0001F4AF}";
    expect(emoji).toBe(utf32);
  });
});


// 絵文字は2文字以上。さいきんはリガチャと言って複数の絵文字を重ねて使用するため７文字とかある。
// 例）ベースの顔＋肌の色＋髪型