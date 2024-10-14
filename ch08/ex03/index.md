## 問題 8.3 🖋️
書籍8.2.1の 「再帰関数とスタック」には、関数が自身を数千回呼び出した場合はエラーが発生すると書かれている。
1. プログラミング言語や処理系によっては、再帰呼び出しを関数の処理の末尾にする(末尾再帰)ことで、スタックオーバーフローが起こらないよう最適化できるものがある。末尾再帰は何故そのような最適化ができるのか答えなさい。

→通常の再起呼び出しはスタックが増えていくが
再起呼び出しが関数の最後に位置する形式の為、直接結果を返すので新しいスタックフレームを生成せず、同じスタックフレームを再利用するのでコールスタックが増えない。


2. JavaScript で末尾再帰最適化を実装している処理系を答えなさい。  
   利用できる環境があれば、実際に以下の URL を表示・実行してエラーが発生しないことを確認しなさい。  
   https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABMAhtOAnGKA2AKMALkTBAFsAjAUwwEpEBvAWAChFlxp4kYoa8ADhjgATENGKlKNADSIIccHwyTy1Oo1bt2MYIjwKlNRAD4S9Zm23sMVKCAxIho8VADcW7QF9PNuw55lQWExaEQAKnlFMGU5QxjjAGpEAEZaDysfK1t7R0RefhS5NIys1gUwAGc4HCoAOhw4AHM8VHQsXDwUgAZe3tp01iA




**出題範囲**: 8.2.1


