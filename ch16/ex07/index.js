// import fs from 'fs';
import { promises as fs } from 'fs';

async function checkEntry(path){
    try{
        const stats = await fs.stat(path);

        const typeChecker = {
            isFile: 'file',
            isDirectory: 'directory',
            isSymbolicLink: 'symbolicLink',
        };

        // statsオブジェクトをループしてマッピングに合致するものを探す
        for( const [method, type] of Object.entries(typeChecker)){
            if(stats[method]()){
                return type;
            }
        }
        return 'unknown';
    }catch(error){
        return 'Error.message'
    }
}

// 使用例
(async () => {
    console.log(await checkEntry('example.txt')); // ファイルなら 'file'
    console.log(await checkEntry('exampleDir')); // ディレクトリなら 'directory'
})();