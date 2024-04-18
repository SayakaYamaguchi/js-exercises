import { AlarmClock } from "./index.js";

// 例えば `アラームセット中` の状態から各イベントを受け取ったときのテストを作成するには、事前条件として毎回 `通常` 状態から、`アラーム設定` と `アラーム設定時刻到達` のイベントを経て `アラームセット中` の状態に遷移させる必要がある。

// テスト対象の状態遷移関数
const { setAlarm, cancelAlarm, reachedToAlarmTime, snooze, elapseSnoozeTime } = AlarmClock.prototype;

describe('AlarmClock', () => {
  describe('setAlarm', () => {
    test('＞アラームセット状態', () => {
      const alarmClock = new AlarmClock();
      alarmClock.state = 'normal';

      expect(setAlarm.call(alarmClock)).toEqual('none');
      expect(alarmClock.state).toEqual('alarmSet');
    });
  });

  describe('cancelAlarm', () => {
    test('アラームセット状態＞通常状態', () => {
      const alarmClock = new AlarmClock();
      alarmClock.state = 'alarmSet';

      expect(cancelAlarm.call(alarmClock)).toEqual('none');
      expect(alarmClock.state).toEqual('normal');
    });

    test('アラーム鳴動状態＞通常状態', () => {
      const alarmClock = new AlarmClock();
      alarmClock.state = 'alarmSounding';

      expect(cancelAlarm.call(alarmClock)).toEqual('stopAlarm');
      expect(alarmClock.state).toEqual('normal');
    });

    test('スヌーズ状態＞通常状態', () => {
      const alarmClock = new AlarmClock();
      alarmClock.state = 'snoozing';

      expect(cancelAlarm.call(alarmClock)).toEqual('none');
      expect(alarmClock.state).toEqual('normal');
    });
  });

  describe('reachedToAlarmTime', () => {
    test('＞アラーム鳴動状態', () => {
      const alarmClock = new AlarmClock();
      alarmClock.state = 'alarmSet';

      expect(reachedToAlarmTime.call(alarmClock)).toEqual('soundAlarm');
      expect(alarmClock.state).toEqual('alarmSounding');
    });
  });

  describe('snooze', () => {
    test('＞スヌーズ状態', () => {
      const alarmClock = new AlarmClock();
      alarmClock.state = 'alarmSounding';

      expect(snooze.call(alarmClock)).toEqual('stopAlarm');
      expect(alarmClock.state).toEqual('snoozing');
    });
  });

  describe('elapseSnoozeTime', () => {
    test('＞アラーム鳴動状態', () => {
      const alarmClock = new AlarmClock();
      alarmClock.state = 'snoozing';

      expect(elapseSnoozeTime.call(alarmClock)).toEqual('soundAlarm');
      expect(alarmClock.state).toEqual('alarmSounding');
    });
  });

});