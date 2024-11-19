import https from 'https';
import { Buffer } from 'buffer';

// GitHub APIのベースURL
const BASE_URL = 'api.github.com';

// 汎用的なHTTPリクエスト関数
export function sendRequest(options, data, callback) {
  if (options.verbose) {
    console.log(`HTTP Request Options:`, options);
    if (data) {
      console.log(`HTTP Request Body:`, data);
    }
  }
  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => (body += chunk));
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

  req.on('error', (e) => callback(e));
  if (data) req.write(data);
  req.end();
}

// 新しいIssueを作成
export function createIssue(owner, repo, title, body, token, verbose) {
  console.log('call');
  const postData = JSON.stringify({ title, body });
  const options = {
    hostname: BASE_URL,
    path: `/repos/${owner}/${repo}/issues`,
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'node.js',
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
    verbose,
  };

  sendRequest(options, postData, (err, result) => {
    console.log('sendRequest is called with:', options, postData);
    if (err) {
      console.error('Error creating issue:', err.message);
    } else {
      console.log('Issue created successfully:', result.html_url);
    }
  });
}

// 指定したIssueをクローズ
export function closeIssue(owner, repo, issueNumber, token, verbose) {
  const postData = JSON.stringify({ state: 'closed' });
  const options = {
    hostname: BASE_URL,
    path: `/repos/${owner}/${repo}/issues/${issueNumber}`,
    method: 'PATCH',
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'node.js',
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
    verbose,
  };

  sendRequest(options, postData, (err) => {
    if (err) {
      console.error('Error closing issue:', err.message);
    } else {
      console.log('Issue closed successfully.');
    }
  });
}

// オープンなIssueを一覧表示
export function listIssues(owner, repo, token, verbose) {
  const options = {
    hostname: BASE_URL,
    path: `/repos/${owner}/${repo}/issues?state=open`,
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'node.js',
      Accept: 'application/vnd.github+json',
    },
    verbose,
  };

  sendRequest(options, null, (err, result) => {
    if (err) {
      console.error('Error listing issues:', err.message);
    } else {
      console.log('Open Issues:');
      result.forEach((issue) =>
        console.log(`ID: ${issue.id}, Title: ${issue.title}`)
      );
    }
  });
}

// Issueにコメントを追加
export function addComment(owner, repo, issueNumber, comment, token, verbose) {
  const postData = JSON.stringify({ body: comment });
  const options = {
    hostname: BASE_URL,
    path: `/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'node.js',
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
    verbose,
  };

  sendRequest(options, postData, (err, result) => {
    if (err) {
      console.error('Error adding comment:', err.message);
    } else {
      console.log('Comment added successfully:', result.html_url);
    }
  });
}
