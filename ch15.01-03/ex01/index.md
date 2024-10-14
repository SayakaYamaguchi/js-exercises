2.index.html ファイル内の script タグから type="module" 属性を削除した場合、期待通り動作させるにはどうすべきか答えなさい。

対象が動的に作成される要素の為、JavaScriptコードが実行される時点でHTML要素が存在しないために起こるエラー
JavaScriptコードをHTMLの読み込みが完了した後に実行するように全体をdocument.addEventListener("DOMContentLoaded", () => {で囲い
DOMContentLoadedイベント内で実行する
