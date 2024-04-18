/**
 * ## 問題 9.8 💻 🧪

以下の図は、ある目覚まし時計の状態遷移をモデル化した状態遷移図である。

```plantuml
[*] -> 通常
通常 -> アラームセット中: アラーム設定
アラームセット中 -> 通常: アラーム解除
アラームセット中 --> アラーム鳴動中: アラーム設定時刻到達
アラーム鳴動中 --> 通常: アラーム解除
アラーム鳴動中 --> スヌーズ中: スヌーズ
スヌーズ中 --> アラーム鳴動中: スヌーズ設定時間経過
スヌーズ中 --> 通常: アラーム解除
```

この状態遷移を管理するコード例として、以下のようなクラスが考えられる。
`AlarmClock` インスタンスに対して、各イベントに対応するメソッドを呼び出すと、内部で状態遷移が発生し、実行すべきアクションを返り値として返す。

```ts
// 目覚まし時計の状態
type State =
  | "normal" // 通常
  | "alarmSet" // アラームセット中
  | "alarmSounding" // アラーム鳴動中
  | "snoozing"; // スヌーズ中

// イベント時に発生するアクション
type Action =
  | "none" // 何もしない
  | "soundAlarm" // アラームを鳴らす
  | "stopAlarm"; // アラームを止める

// 目覚まし時計クラス
class AlarmClock {
  private state: State;

  constructor() {
    this.state = "normal";
  }

  // アラーム設定イベント
  setAlarm(): Action {
    switch (this.state) {
      case "normal":
        this.state = "alarmSet";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム解除イベント
  cancelAlarm(): Action {
    switch (this.state) {
      case "alarmSet":
        this.state = "normal";
        return "none";
      case "alarmSounding":
        this.state = "normal";
        return "stopAlarm";
      case "snoozing":
        this.state = "normal";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム設定時刻到達イベント
  reachedToAlarmTime(): Action {
    switch (this.state) {
      case "alarmSet":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }

  // スヌーズイベント
  snooze(): Action {
    switch (this.state) {
      case "alarmSounding":
        this.state = "snoozing";
        return "stopAlarm";
      default:
        return "none";
    }
  }

  // スヌーズ設定時間経過イベント
  elapseSnoozeTime(): Action {
    switch (this.state) {
      case "snoozing":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }
}
```

このコードに対して、すべての状態遷移を網羅するテストを作成することを考える。
例えば `アラームセット中` の状態から各イベントを受け取ったときのテストを作成するには、事前条件として毎回 `通常` 状態から、`アラーム設定` と `アラーム設定時刻到達` のイベントを経て `アラームセット中` の状態に遷移させる必要がある。
これを各状態のテストに対して実施するのは煩雑である。

この目覚まし時計の状態遷移モデルのテスト性を向上させるためのアプローチとしてどのような方法があるか考え、それを実装しなさい。
また、作成されたコードに対してすべての状態遷移を検査するテストを作成しなさい。


 */

// 目覚まし時計クラス
// 目覚まし時計の状態
const State = [
  "normal",        // 通常
  "alarmSet",      // アラームセット中
  "alarmSounding", // アラーム鳴動中
  "snoozing"       // スヌーズ中
];

// イベント時に発生するアクション
const Action = [
  "none",        // 何もしない
  "soundAlarm",  // アラームを鳴らす
  "stopAlarm"    // アラームを止める
];

// 目覚まし時計クラス
export class AlarmClock {
  constructor() {
    this.state = State[0]; // 初期状態は通常
  }

  // アラーム設定イベント
  setAlarm() {
    switch (this.state) {
      case State[0]:
        this.state = State[1];
        return Action[0];
      default:
        return Action[0];
    }
  }

  // アラーム解除イベント
  cancelAlarm() {
    switch (this.state) {
      case State[1]:
        this.state = State[0];
        return Action[0];
      case State[2]:
        this.state = State[0];
        return Action[2];
      case State[3]:
        this.state = State[0];
        return Action[0];
      default:
        return Action[0];
    }
  }

  // アラーム設定時刻到達イベント
  reachedToAlarmTime() {
    switch (this.state) {
      case State[1]:
        this.state = State[2];
        return Action[1];
      default:
        return Action[0];
    }
  }

  // スヌーズイベント
  snooze() {
    switch (this.state) {
      case State[2]:
        this.state = State[3];
        return Action[2];
      default:
        return Action[0];
    }
  }

  // スヌーズ設定時間経過イベント
  elapseSnoozeTime() {
    switch (this.state) {
      case State[3]:
        this.state = State[2];
        return Action[1];
      default:
        return Action[0];
    }
  }
}
