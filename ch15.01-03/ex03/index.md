問題 15.1-3.3 💻🧪🖋️
自作のスクリプトに対し script タグで integrity 属性を付けると、適切な integrity 値の場合はロードされ、そうでない場合ロードされないことを確認しなさい。またこのようなセキュリティ機能があるとどのような攻撃を防御できるか記述しなさい。

出題範囲 15.1.1


ブラウザがロードする前にｍその名洋画指定されたハッシュ値と一致するか確認をする
不一致の場合はロードをせずエラーしを出力する

外部からjsの改ざんをした場合に、ハッシュ値が一致しないためjsを起動させない

不一致の場合のエラー文
```
integrity 属性に含まれているハッシュをデコードできませんでした。 index.html
integrity 属性内の “sha384” ハッシュが subresource のコンテンツと一致しません。計算されたハッシュ値は “jP0isIWbhAVu6HsOirFeLac15EjoSzxd2jG77F1g2zM6o52nmZMsHeRAa0Wtk/Mm” です。
```
