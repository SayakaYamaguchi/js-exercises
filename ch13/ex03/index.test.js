import {stat, readdir } from "./index.js";
import * as fs from "node:fs";
const path = require('path');

describe('stat', () => {
    const testFilePath = path.join(__dirname, 'test-file.txt');
    
    beforeAll(() => {
      // テスト用のファイルを作成します
      fs.writeFileSync(testFilePath, 'This is a test file.');
    });
  
    afterAll(() => {
      // テスト用のファイルを削除します
      fs.unlinkSync(testFilePath);
    });
  
    it('should resolve with correct stats when file exists', (done) => {
      stat(testFilePath).then(stats => {
        // ファイルが存在し、正しい情報を取得できることを確認します
        expect(stats).toBeDefined();
        expect(stats.isFile()).toBe(true);
        expect(stats.size).toBe(20); // "This is a test file." のサイズは 20 バイト
        done();
      }).catch(err => {
        done(err); // エラーが発生した場合はテストを失敗させます
      });
    });
  
    it('should reject with an error when file does not exist', (done) => {
      const nonExistentFilePath = path.join(__dirname, 'non-existent-file.txt');
  
      stat(nonExistentFilePath).catch(err => {
        // ファイルが存在しない場合はエラーが発生することを確認します
        expect(err).toBeDefined();
        expect(err.code).toBe('ENOENT');
        done();
      });
    });
  });


  describe('readdir', () => {
    const testDirPath = path.join(__dirname, 'test-directory');
    
    beforeAll(() => {
      // テスト用のディレクトリとファイルを作成します
      fs.mkdirSync(testDirPath);
      fs.writeFileSync(path.join(testDirPath, 'file1.txt'), 'File 1 content');
      fs.writeFileSync(path.join(testDirPath, 'file2.txt'), 'File 2 content');
    });
  
    afterAll(() => {
      // テスト用のディレクトリとファイルを削除します
      fs.unlinkSync(path.join(testDirPath, 'file1.txt'));
      fs.unlinkSync(path.join(testDirPath, 'file2.txt'));
      fs.rmdirSync(testDirPath);
    });
  
    it('should resolve with correct file list when directory exists', (done) => {
      readdir(testDirPath).then(files => {
        // ディレクトリ内のファイルリストが正しいことを確認します
        expect(files).toEqual(expect.arrayContaining(['file1.txt', 'file2.txt']));
        done();
      }).catch(err => {
        done(err); // エラーが発生した場合はテストを失敗させます
      });
    });
  
    it('should reject with an error when directory does not exist', (done) => {
      const nonExistentDirPath = path.join(__dirname, 'non-existent-directory');
  
      readdir(nonExistentDirPath).catch(err => {
        // ディレクトリが存在しない場合はエラーが発生することを確認します
        expect(err).toBeDefined();
        expect(err.code).toBe('ENOENT');
        done();
      });
    });
  });