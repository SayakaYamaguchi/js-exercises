## 問題 10.2 🖋️

CommonJS と ES Module 以外の JavaScript のモジュール方式名を調べて記述しなさい

**出題範囲**: 10.2


# AMD (Asynchronous Module Definition)
* CommonJSプロジェクトのTransport/Cという規格提案としてスタート
* RequireJS
　　AMDフォーマットをサポートするために開発された
　　過去に主にブラウザ環境でのJavaScriptモジュール管理において広く使用された

# UMD
* AMDとCommonJSの両方をサポート
* Node.jsでもブラウザでも動かすこどができる
<https://github.com/umdjs/umd>

# System.register
* SystemJSモジュールローダーが使用するモジュール定義形式の一つ
* AMDやUMDと違い特定の独自実装に基づく