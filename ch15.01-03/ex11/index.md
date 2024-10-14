
# 最後にブラウザのデバッグツール(Chromeの場合はDeveloper ToolのEvent Listners)で、btn等に登録されているイベントをそれぞれ確認しなさい。

ボタンのclickイベント

1.
div.addEventListener(
        "click",
        () => {
          console.log("div");
        },

2.
      // 3. ボタンにイベントリスナを追加し、ボタン押下するごとに乱数値を変更しなさい。変更にはtriggerを利用しなさい。
      btn.addEventListener("click", ()=> {

3.
      btn.addEventListener("click", () => {
        console.log("button");
      });

