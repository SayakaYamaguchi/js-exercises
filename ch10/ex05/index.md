## 問題 10.5 🖋️

問題10.3, 10.4で作成したそれぞれのモジュールで、エクスポート元の関数・クラスをエディタのリファクタ機能で名前変更した際、インポート側で名前変更がどう追随されるか確認しなさい。
また、デフォルトエクスポート、名前変更を伴うインポート、再エクスポートについても名前変更時の挙動を確認すること。

**出題範囲**: 10.2 10.3


* 10.3
　　関数名を getTodayDate → getTodayDate03 へ変更
    module.exportsの{}に: getTodayDate03 が自動で追記
    module.exports = { getTodayDate: getTodayDate03 };
    動作は問題なし
　
* 10.4
　　関数名を getDayOfWeekFromDate → getDayOfWeekFromDate02 へ変更
    import内関数名が新しい getDayOfWeekFromDate02 へ自動変更
    動作は問題なし
