import {readLines} from "./index.js";
import fs from 'fs';
import assert from 'assert';

// テスト
describe('readLines', () => {
    const filePath = './ch12/ex05/sample.txt';

    // フックでテスト用のtext.txtファイルを作成し、テスト終了後にafterフックでファイルを削除
    before(() => {
      const content = '123\nあああ\n';
//      const content = '123\n';
      fs.writeFileSync(filePath, content, 'utf8');
    });

    after(()=>{
      fs.unlinkSync(filePath);
    })

    // itブロックでreadLines関数をテストし、生成された行が期待通りの内容であることをchaiのexpect関数を使ってアサート
    it('should correctly read lines from a file', () => {
      const gen = readLines(filePath);
      const lines = Array.from(gen);

      const expectedLines = [
        '123',
        'あああ'
      ];

      // expect(lines).to.deep.equal(expectedLines);
      assert(lines).to.deep.equal(expectedLines);
    
    });
});

