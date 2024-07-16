/*
問題 14.3 💻📄
合成可能なダイアクリティカルマークを無視して文字列比較を行うパターンクラス定義しなさい。 合成可能なダイアクリティカルマークは文字列を Unicode 正規化して分解し、 \u0300-\u036f の範囲を取り除くと除去できます。
*/

export class IgnoreAccentPattern {
    constructor(pattern) {
      if (typeof pattern === 'string') {
        this.pattern = pattern;
      } else if (pattern instanceof RegExp) {
        this.pattern = pattern.source;
        this.flags = pattern.flags;
      } else {
        throw new TypeError('pattern must be a string or RegExp');
      }
    }
  
    [Symbol.match](str) {
      const normalizedPattern = this._normalize(this.pattern);
      const regex = new RegExp(normalizedPattern, this.flags);
      const normalizedStr = this._normalize(str);
      return normalizedStr.match(regex);
    }
  
    [Symbol.search](str) {
        const normalizedPattern = this._normalize(this.pattern);
        const regex = new RegExp(normalizedPattern, this.flags);
        const normalizedStr = this._normalize(str);
        return normalizedStr.search(regex);
      }
    
      _normalize(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }
    }
    