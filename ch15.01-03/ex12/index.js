// 通常は非表示にしているIDが "preview" で始まるすべての要素と、IDが "hidden" の要素をまとめて表示に差し替え。IDとクラス名は適当に変更済み
// 元々jquery版で使用していたものをES6で書き換え
javascript:(function(){jQuery("[id^='preview'],#hidden").show()})()
javascript:(function(){const previewElements=document.querySelectorAll("[id^='preview']");const hiddenElement=document.querySelector("#hidden");previewElements.forEach(element=>{element.style.display="block";});if(hiddenElement){hiddenElement.style.display="block";}})();
