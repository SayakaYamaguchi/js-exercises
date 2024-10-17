## 問題 16.1 🖋💻

用語「マルチスレッド」について調べなさい。

次にフィボナッチ数を計算するmFib.jsをスレッド数を変更しながら実行し(*1)、
コンソール出力とOS機能(*2)で結果とスレッド数を確認しなさい。

最後にあなたのPCのCPUスペックを調査し、適切なスレッド数についての考察を記しなさい。

*1 mFib.jsは第一引数で項数、第二引数でスレッド数を指定。コンソールには実行時間とフィボナッチ数が出力される。講師PCでは `node mFib.js 45 4` の実行に15秒程かかる。

*2 OSがwindowsの場合"リソースモニター"（"`Winキー+r`"の後"`resmon`"で起動）で実行中プログラムのスレッド数を確認できる。

**出題範囲 16.2**


## マルチスレッド
アプリケーションのプロセスを含酢のスレッドに分けて並行処理する方式
スレッド→マルチタスクOSの処理作業の最小単位
マルチスレッドを用いると、アプリケーション内で必要に応じて複数の処理を並行して進められるため、処理の速度と精度が飛躍的に向上する。

UNIX系OSやWindowsなどのほとんどのOSは、マルチスレッドに対応している。

### 6スレッド　node mFib.js 45 6
- Worker 4 execution time: 610.397ms
- Worker 3 execution time: 915.784ms
- Worker 5 execution time: 1.425s
- Worker 0 execution time: 2.191s
- Worker 1 execution time: 3.415s
- Worker 2 execution time: 5.299s
Total execution time: 5.303s
Fibonacci number: 1836311902
リソースモニター：19


### 8スレッド　node mFib.js 45 8
Process ID: 20060
- Worker 6 execution time: 280.193ms
- Worker 2 execution time: 412.733ms
- Worker 1 execution time: 623.092ms
- Worker 0 execution time: 963.383ms
- Worker 5 execution time: 1.447s
- Worker 7 execution time: 2.227s
- Worker 4 execution time: 3.393s
- Worker 3 execution time: 5.280s
- Total execution time: 5.283s
- Fibonacci number: 1836311902
- リソースモニター：24


### 16スレッド
Process ID: 428
- Worker 14 execution time: 80.418ms
- Worker 12 execution time: 82.579ms
- Worker 1 execution time: 94.648ms
- Worker 5 execution time: 104.858ms
- Worker 9 execution time: 117.674ms
- Worker 10 execution time: 137.967ms
- Worker 3 execution time: 185.143ms
- Worker 7 execution time: 242.575ms
- Worker 0 execution time: 336.566ms
- Worker 13 execution time: 441.031ms
- Worker 8 execution time: 694.945ms
- Worker 4 execution time: 978.973ms
- Worker 15 execution time: 1.483s
- Worker 11 execution time: 2.194s
- Worker 2 execution time: 3.416s
- Worker 6 execution time: 5.297s
- Total execution time: 5.301s
- Fibonacci number: 1836311902
- リソースモニター：32


### 128スレッド
- Total execution time: 6.002s　→　他より時間がかかる。
- Fibonacci number: 1836311902



## PCのCPUスペックと考察
13th Gen Intel(R) Core(TM) i5-13400F   2.50 GHz

Intel Core i5-13400F スペック
物理コア数: 10コア（6つの高性能コア + 4つの高効率コア）
論理プロセッサ数（スレッド数）: 16スレッド（高性能コアがHyper-Threading対応）



128スレッドの場合は6.002sで一番時間がかかった
物理で16スレッドまでしかない為、スレッドのオーバーヘッドやCPUリソースの限界だったのが限定
実行時には、スレッド数を論理プロセッサ数（16スレッド）に近い値に設定するべき