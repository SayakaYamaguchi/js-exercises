## 問題 15.11-15.17 🖋

実際のサービスの通信をデベロッパーツールなどで眺めて CORS の設定を確認しなさい。

(金融系の認証ページなどで CORS の設定がされていることが多い)

**出題範囲: 15.11.1**



Yahoo! JAPAN

https://pagead2.googlesyndication.com/getconfig/sodar?sv=200&tid=gpt&tv=m202409050101&st=env
参照ポリシー　strict-origin-when-cross-origin
クロスオリジンのリクエストに対する Referer ヘッダーの送信内容を制限する
同一オリジンのリクエストには完全なURLを Referer ヘッダーとして送信し、クロスオリジンのリクエストにはリファラー情報の一部だけ（オリジンまで）を送信する

＜Referrer-Policy＞

クレジットカード
strict-origin-when-cross-origin


no-referrer
最も厳しいポリシーで、すべてのリクエストにおいて Referer ヘッダーを送信しない
同一オリジンでもクロスオリジンでも、どのリクエストに対しても Referer ヘッダーが完全に削除する

no-referrer-when-downgrade

origin

origin-when-cross-origin

same-origin
同一オリジンのリクエストに対しては Referer ヘッダーを送信
クロスオリジンのリクエストには Referer ヘッダーを送信しません

strict-origin

strict-origin-when-cross-origin

unsafe-url
