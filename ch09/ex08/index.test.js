import { AlarmClock } from "./index.js";

describe('AlarmClock', () => {
    let alarmClock;
  
    beforeEach(() => {
      alarmClock = new AlarmClock();
    });
  
    it('should transition state correctly for all events', () => {
        // テストケース見直し中
        
        // アラームセット中 -> 通常: アラーム解除
        // アラームセット中 --> アラーム鳴動中: アラーム設定時刻到達
        // アラーム鳴動中 --> 通常: アラーム解除
        
        // スヌーズ中 --> アラーム鳴動中: スヌーズ設定時間経過
        // スヌーズ中 --> 通常: アラーム解除



      // 通常 -> アラームセット中: アラーム設定
      alarmClock.setAlarm();
      expect(alarmClock.state).toEqual('alarmSet');
  
      // アラーム設定 -> 通常
      alarmClock.cancelAlarm();
      expect(alarmClock.state).toEqual('normal');
  
      // アラームセット -> アラーム鳴動
      alarmClock.setAlarm();
      alarmClock.reachedToAlarmTime();
      expect(alarmClock.state).toEqual('alarmSounding');
  
      // アラーム鳴動 -> 通常 (ストップアラーム)
      alarmClock.cancelAlarm();
      expect(alarmClock.state).toEqual('normal');
  
      // アラーム鳴動中 --> スヌーズ中: スヌーズ
      alarmClock.setAlarm();
      alarmClock.reachedToAlarmTime();
      alarmClock.snooze();
      expect(alarmClock.state).toEqual('snoozing');
  
      // スヌーズ中 -> アラーム鳴動
      alarmClock.elapseSnoozeTime();
      expect(alarmClock.state).toEqual('alarmSounding');
  
      // スヌーズ中 -> 通常 (ストップアラーム)
      alarmClock.cancelAlarm();
      expect(alarmClock.state).toEqual('normal');
    });
  });