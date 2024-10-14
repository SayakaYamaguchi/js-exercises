## 問題 2.3 💻🖋

本の文中では Unicode 正規化について é を例にして説明されていますが、それぞれの正規化にはそれぞれ名前がついています。
é を 1 つの Unicode 文字とする正規化を NFC (Normalization Form Canonical Composition)、e とアクセント結合マークに分離する正規化を NFD (Normalization Form Canonical Decomposition) といいます。

Unicode の正規化は日本語のひらがな、カタカナの濁音"゛"や半濁音"゜"にも適用されます。以上を踏まえて、

1. "パン"を Unicode エスケープシーケンスで記述した文字列リテラルを NFC と NFD のそれぞれの形式で作ってください。 💻
2. 濁音や半濁音を含むファイル名のファイルを作ったとき、NFC で保存される OS と、NFD で保存される OS を調べて記述しなさい。 🖋

**出題範囲**: 2.5.2


**回答**
2.
NFC　Windows、Linux
NFD　macOS