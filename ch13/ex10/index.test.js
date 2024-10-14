import { fetchFirstFileSize, fetchSumOfFileSizes } from './index';
import { promises as fsPromises } from 'node:fs';
import { join } from 'node:path';

// テスト用ディレクトリとファイルの定義
const testDir = './testDir';
const emptyDir = './emptyDir';
const file1 = 'file1.txt';
const file2 = 'file2.txt';

// すべてのテストが実行される前に一度だけ実行 テスト用ディレクトリの作成
beforeAll(() => {
  return fsPromises.mkdir(testDir, { recursive: true }) // { recursive: true } ですでに存在する場合でもエラーにならない
    .then(() => fsPromises.writeFile(join(testDir, file1), 'Hello, World!'))
    .then(() => fsPromises.writeFile(join(testDir, file2), 'Jest testing'))
    .then(() => fsPromises.mkdir(emptyDir, { recursive: true }));
});

// すべてのテストが完了した後に一度だけ実行　テスト用に作成したディレクトリを削除
afterAll(() => {
  return Promise.all([
    fsPromises.rm(testDir, { recursive: true, force: true }),
    fsPromises.rm(emptyDir, { recursive: true, force: true })
  ]);
});

// 最初のファイルのサイズを返すかのテスト
test('fetchFirstFileSize returns the size of the first file', () => {
  return fetchFirstFileSize(testDir)
    .then(size => {
      return fsPromises.stat(join(testDir, file1))
        .then(stats => {
          expect(size).toBe(stats.size);
        });
    });
});

// 空のディレクトリに対して fetchFirstFileSize が null を返すかのテスト
test('fetchFirstFileSize returns null for empty directory', () => {
  return fetchFirstFileSize(emptyDir)
    .then(size => {
      expect(size).toBeNull();
    });
});

// すべてのファイルサイズの合計を返すかのテスト
test('fetchSumOfFileSizes returns the sum of all file sizes', () => {
  return fetchSumOfFileSizes(testDir)
    .then(size => {
      return Promise.all([
        fsPromises.stat(join(testDir, file1)),
        fsPromises.stat(join(testDir, file2))
      ])
        .then(([stats1, stats2]) => {
          const expectedSize = stats1.size + stats2.size;
          expect(size).toBe(expectedSize);
        });
    });
});