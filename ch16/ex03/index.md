## 問題 16.3 🖋💻

用語`AES`、`Base64`を調べて記しなさい。


## AES
AES（Advanced Encryption Standard）<br>
2000年に米国政府の標準として策定された暗号化方式<br>
無線LANをはじめとしたネットワーク通信データを暗号化する際に使われる暗号化アルゴリズム<br>
完全な仕様が公開されており、特許などの許諾や対価の支払いの必要な技術を含まな板目みません。このためWi-Fiや無線LAN、SSL/TLS化通信、ファイルの暗号化などで広く採用されている

暗号化と復号に同じ暗号鍵を用いる「共通鍵暗号」<br>

## Base64
エンコード方式の一種
データを64種類の印字可能な英数字のみを用いて、それ以外の文字を扱うことの出来ない通信環境にてマルチバイト文字やバイナリデータを扱う
電子メール、Basic認証に用いられる<br>
元のデータよりもデータ量が大きくなるため、メールの添付ファイルなど元のサイズが大きい場合は他の方法にしたほうが早い場合もある<br>
バイナリデータをテキスト形式に変換する際によく使用され、元のデータを簡単に復元できる<br>

----

暗号化と`Base64`を適用した文字列を返す以下のコードを完成させなさい。穴埋め箇所では`crypto.Cipher`と`Buffer.from`を使用しなさい。

なお、暗号化のアルゴリズムは`aes-256-cbc`を指定しなさい。


### crypto.Cipher
Node.js の標準モジュールである crypto の中にあるクラスや関数の一部で暗号化処理を行う
データの暗号化や復号化を行うために使用

### Buffer.from

### aes-256-cbc

```
import crypto from "crypto";
// ここを埋める

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // ここを埋める

  // 暗号化とBase64エンコード
  // ここを埋める

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // ここを埋める（fs.promisesで鍵を保存）
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
}

// 復号して平文を返す
function decrypt64(data, key) {
  // ここを埋める
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();

```

**出題範囲 16.3,16.5**
