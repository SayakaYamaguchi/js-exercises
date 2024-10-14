// checkEntry.test.js
import { checkEntry } from './index.js';
import fs from 'fs/promises';

describe('checkEntry function', () => {
    beforeAll(async () => {
        // テスト用のファイルやディレクトリを作成
        await fs.writeFile('testFile.txt', 'This is a test file.');
        await fs.mkdir('testDir');
        await fs.symlink('testFile.txt', 'testLink.txt');
    });

    afterAll(async () => {
        // テスト後にファイルやディレクトリを削除
        await fs.unlink('testFile.txt');
        await fs.rmdir('testDir');
        await fs.unlink('testLink.txt');
    });

    test('should return "file" for a regular file', async () => {
        const result = await checkEntry('testFile.txt');
        expect(result).toBe('file');
    });

    test('should return "directory" for a directory', async () => {
        const result = await checkEntry('testDir');
        expect(result).toBe('directory');
    });

    test('should return "symbolic link" for a symbolic link', async () => {
        const result = await checkEntry('testLink.txt');
        expect(result).toBe('symbolic link');
    });

    test('should return error for a non-existent path', async () => {
        const result = await checkEntry('nonExistent.txt');
        expect(result).toMatch(/^Error:/);
    });
});