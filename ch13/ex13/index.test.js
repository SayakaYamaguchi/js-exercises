import { expect } from 'chai';
import {walk} from "./index.js";

// モックファイルシステムをセットアップ
const mockFs = {
  'c:/dir': {
      'dir2': {
          'dir3': {
              'file2.txt': '',
              'file3.md': ''
          },
          'file2.txt': '',
          'file3.md': ''
      },
      'file1.md': '',
      'file1.txt': ''
  }
};


  // テスト
  describe("walk", () => {
    const rootPath = 'c:/www/http_server/images';

    it("returns same value when positive value given", () => {
      const gen = walk(rootPath);
      const entries = Array.from(gen);
      const expectedEntries = [
{ path: 'c:\\www\\http_server\\hello.js', isDirectory: false },
{ path: 'c:\\www\\http_server\\images', isDirectory: true },
{path: 'c:\\www\\http_server\\images\\sample.png',
  isDirectory: false
},
{ path: 'c:\\www\\http_server\\index.html', isDirectory: false },
{ path: 'c:\\www\\http_server\\main.js', isDirectory: false }
/*
        { path: 'c:/dir/dir2/dir3', isDirectory: true },
        { path: 'c:/dir/dir2/dir3/file2.txt', isDirectory: false },
        { path: 'c:/dir/dir2/dir3/file3.md', isDirectory: false },
        { path: 'c:/dir/dir2/file2.txt', isDirectory: false },
        { path: 'c:/dir/dir2/file3.md', isDirectory: false }
*/
        ];
        expect(entries).to.deep.equal(expectedEntries);
      
    });
  });