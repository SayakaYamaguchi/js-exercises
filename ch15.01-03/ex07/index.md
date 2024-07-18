問題 15.1-3.7 🖋
自分が運営する販売サイトにYouTubeのトップページをiframeで組込み、更に自作のscript.jsによりiframe内のデータを分析しようとしています。

<iframe id="other" src="https://www.youtube.com/"></iframe>
<script src="./script.js"></script>
...
(async () => {
  // YouTube が利用者に推薦する動画タイトルを取得すれば、利用者に最適な商品セットを表示できるのではないか？
  const titles = document.getElementById("").contentWindowquerySelectorAll('#video-title');
  for (const t of titles) {
    await fetch("your-server-path", { method: "POST", body: t.textContent })
  }
});
しかし、トップページを読み込むとエラーになります。用語「クリックジャッキング」を調べて理由を説明しなさい。
また、script.jsも動作しません。ここで、同一オリジンポリシーがなく、iframe内の他サイトのDOM変更が可能な仕様を想定し、どのような重大な問題が発生しうるか記載しなさい。

出題範囲 15.1.8.2


# クリックジャッキング
Webサイト上に隠蔽・偽装したリンクやボタンを設置し、サイト訪問者を視覚的に騙してクリックさせるなど意図しない操作をするよう誘導させる手法
SNSのリンクを踏むと被害にあう事例がある

# トップページを読み込むとエラーの原因
Youtubeがリックジャッキング攻撃を防ぐために、iframeでの埋め込みを制限していることが原因
HTTPヘッダーのX-Frame-OptionsやContent Security Policy (CSP) で制限が可能
X-Frame-Options
　DENY　            ページがすべての<iframe>で表示されるのを拒否
　SAMEORIGIN        同じオリジン（ドメイン、プロトコル、ポート）のページのみが<iframe>で表示
　ALLOW-FROM uri    指定されたURIからのみ<iframe>で表示
Content Security Policy (CSP) 
　default-src       全てのリソースのデフォルトの取得先を指定
　script-src        スクリプトの取得先を指定
　style-src         スタイルシートの取得先を指定
　img-src           画像の取得先を指定
　frame-ancestors   ページが<iframe>や<object>タグで表示されることを制御します。これにより、クリックジャッキングを防止できます。

# script.jsは同一オリジンポリシーがないため動作しない。
同一オリジンポリシーが存在せず、iframe内の他サイトのDOM変更が可能な仕様だった場合
・DOMの書き換えにより、リンク先の変更やコンテンツ内容の改ざんが可能
・信頼できるサイトと見た目を同じに変更しフィッシング詐欺が可能
・ユーザーのデータやセッション情報にアクセスし、個人情報を盗むことが可能
・悪意のあるスクリプトを埋め込んで、クッキーやセッション情報を盗むことが可能





