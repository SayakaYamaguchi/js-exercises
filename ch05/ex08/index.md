実行結果
5

説明
tryでthrow Error()を実行でcatchに飛び、
breakでループは中断するが
finalliyは必ず通るため、continueを実行し次のイテレーションが始まる。
 i <= 5の条件まで繰り返すため実行結果は5