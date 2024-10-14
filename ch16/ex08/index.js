#!/usr/bin/env node

// 環境のセットアップ
import https from 'https';  // GitHub APIとの通信に使うため、Node.jsの標準ライブラリhttpsをインポートしています。
import yargs from 'yargs';  // コマンドライン引数を解析するためのライブラリyargsを使います。
import { hideBin } from 'yargs/helpers';    // 
import dotenv from 'dotenv';    // 環境変数を.envファイルから読み込むためにdotenvを使っています。これにより、GitHubのトークンなどを環境変数として管理できます。
import { Buffer } from 'buffer';    // Bufferを使ってPOSTリクエストのデータを送信するために、bufferモジュールをインポートしています。

// 環境変数をロード
dotenv.config();
const BASE_URL = 'api.github.com';

// GitHub API へのリクエストを送信するための汎用関数
// 標準の https モジュールを使用して、HTTP リクエストを作成・送信し、レスポンスを受け取って処理
// options: APIリクエストの設定（HTTPメソッドやヘッダーなど）が含まれます。
// data: リクエストボディとして送信するデータです。POSTやPATCHリクエスト時に使います。
// callback: リクエストが成功または失敗したときに呼ばれるコールバック関数です。
function sendRequest(options, data, callback) {
    if (options.verbose) {
        console.log(`HTTP Request Options:`);
        console.log(options);
        if (data) {
            console.log(`HTTP Request Body:`);
            console.log(data);
        }
    }
    const req = https.request(options, (res) => {
        let body = '';

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            if (options.verbose) {
                console.log(`HTTP Response: ${res.statusCode}`);
                console.log(`Response Body: ${body}`);
            }
            if (res.statusCode >= 200 && res.statusCode < 300) {
                callback(null, JSON.parse(body));
            } else {
                callback(new Error(`Request failed: ${res.statusCode}`), body);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`HTTP Request Error: ${e.message}`);
        callback(e);
    });

    if (data) {
        req.write(data);
    }

    req.end();
}


// 新しい Issue を作成。POST リクエストを送信
// createIssue: GitHubのリポジトリに新しいIssueを作成するための関数です。
// ownerとrepo: 対象のリポジトリの所有者名とリポジトリ名です。
// titleとbody: Issueのタイトルと本文です。
// token: GitHub APIの認証に使用する個人トークンです。
function createIssue(owner, repo, title, body, token, verbose) {
    const postData = JSON.stringify({ title, body });

    const options = {
        hostname: BASE_URL,
        path: `/repos/${owner}/${repo}/issues`,
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
            'User-Agent': 'node.js',
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
        verbose: verbose, // verbose オプションを options に追加
    };

    if (verbose) {
        console.log(`POST /repos/${owner}/${repo}/issues`);
        console.log(`Request Headers:`, options.headers);
    }

    sendRequest(options, postData, (err, result) => {
        if (err) {
            console.error('Error creating issue:', err.message);
            console.error(result);
        } else {
            console.log('Issue created successfully:');
            console.log(`Issue URL: ${result.html_url}`);
        }
    });
}

// 指定した Issue をクローズ。PATCH リクエストを送信
// closeIssue: 指定したIssue番号のIssueをクローズするための関数です。PATCHリクエストを使ってIssueの状態をclosedにします。
function closeIssue(owner, repo, issueNumber, token, verbose) {
    const postData = JSON.stringify({ state: 'closed' });

    const options = {
        hostname: BASE_URL,
        path: `/repos/${owner}/${repo}/issues/${issueNumber}`,
        method: 'PATCH',
        headers: {
            'Authorization': `token ${token}`,
            'User-Agent': 'node.js',
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
    };

    if (verbose) {
        console.log(`PATCH /repos/${owner}/${repo}/issues/${issueNumber}`);
    }

    sendRequest(options, postData, (err, result) => {
        if (err) {
            console.error('Error closing issue:', err.message);
            console.error(result);
        } else {
            console.log('Issue closed successfully.');
        }
    });
}

// オープンな Issue の一覧を取得し、ID とタイトルを表示。GET リクエストを送信
// listIssues: オープンなIssueの一覧を取得して表示する関数です。
function listIssues(owner, repo, token, verbose) {
    const options = {
        hostname: BASE_URL,
        path: `/repos/${owner}/${repo}/issues?state=open`,
        method: 'GET',
        headers: {
            'Authorization': `token ${token}`,
            'User-Agent': 'node.js',
            'Accept': 'application/vnd.github+json',
        },
    };

    if (verbose) {
        console.log(`GET /repos/${owner}/${repo}/issues?state=open`);
    }

    sendRequest(options, null, (err, result) => {
        if (err) {
            console.error('Error listing issues:', err.message);
        } else {
            console.log('Open Issues:');
            result.forEach(issue => {
                console.log(`ID: ${issue.id}, Title: ${issue.title}`);
            });
        }
    });
}

// Issue にコメントを追加する関数 addComment
// addComment: 指定したIssueにコメントを追加する関数です。POSTリクエストでコメントを送信します。
function addComment(owner, repo, issueNumber, comment, token, verbose) {
    const postData = JSON.stringify({ body: comment });

    const options = {
        hostname: BASE_URL,
        path: `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
            'User-Agent': 'node.js',
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
    };

    if (verbose) {
        console.log(`POST /repos/${owner}/${repo}/issues/${issueNumber}/comments`);
    }

    sendRequest(options, postData, (err, result) => {
        if (err) {
            console.error('Error adding comment:', err.message);
            console.error(result);
        } else {
            console.log('Comment added successfully:');
            console.log(`Comment URL: ${result.html_url}`);
        }
    });
}

// コマンドライン引数の処理 main 関数
// yargs: コマンドライン引数の解析を行い、それぞれのコマンド（create, close, list, add-comment）に対応する処理を実行します。
// argv: 引数オブジェクト。owner や repo などの必須オプションを含みます。
// check(): help オプションが指定された場合には他の必須引数のチェックをスキップします。
// コマンド: それぞれの処理は対応する関数（createIssue, closeIssue, listIssues, addComment）を呼び出します。


async function main() {
    const argv = yargs(hideBin(process.argv)).showHelp()
        .option('o', {
            alias: 'owner',
            describe: 'GitHub repository owner',
            type: 'string',
            demandOption: true,
        })
        .option('r', {
            alias: 'repo',
            describe: 'GitHub repository name',
            type: 'string',
            demandOption: true,
        })
        .option('t', {
            alias: 'token',
            describe: 'GitHub personal access token',
            type: 'string',
        })
        .option('v', {
            alias: 'verbose',
            describe: 'Enable verbose output',
            type: 'boolean',
            default: false,
        })
        .command('create', 'Create a new issue', (yargs) => {
            yargs.option('title', {
                describe: 'Title of the issue',
                type: 'string',
                demandOption: true,
            }).option('body', {
                describe: 'Body of the issue',
                type: 'string',
                default: '',
            });
        })
        .command('close', 'Close an existing issue', (yargs) => {
            yargs.option('number', {
                describe: 'Issue number to close',
                type: 'number',
                demandOption: true,
            });
        })
        .command('list', 'List all open issues')
        .command('add-comment', 'Add a comment to an issue', (yargs) => {
            yargs.option('number', {
                describe: 'Issue number to add a comment to',
                type: 'number',
                demandOption: true,
            }).option('comment', {
                describe: 'Comment text to add',
                type: 'string',
                demandOption: true,
            });
        })
        .help()  // helpを有効にする
        .alias('h', 'help')
        .check((argv) => {
            // help が指定されているときは他の必須引数を無視する
            if (argv.help || argv.h) {
                return true;
            }
            // 必須引数のチェック
            if (!argv.o || !argv.r) {
                throw new Error('Error: --owner (-o) and --repo (-r) are required.');
            }
            return true;
        })
        .version(false)  // versionを無効にする
        .strict()  // 不明なコマンドに対するエラー処理を有効にする
        .argv;  // yargs の解析結果をargvに格納

    const token = argv.token || process.env.GITHUB_TOKEN;
    if (!token) {
        console.error('Error: GitHub token is required. Use --token option or set GITHUB_TOKEN environment variable.');
        process.exit(1);
    }

    const { o: owner, r: repo, v: verbose } = argv;

    switch (argv._[0]) {
        case 'create':
            createIssue(owner, repo, argv.title, argv.body, token, verbose);
            break;
        case 'close':
            closeIssue(owner, repo, argv.number, token, verbose);
            break;
        case 'list':
            listIssues(owner, repo, token, verbose);
            break;
        case 'add-comment':
            addComment(owner, repo, argv.number, argv.comment, token, verbose);
            break;
        default:
            yargs.showHelp();
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});