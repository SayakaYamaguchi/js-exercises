import { setupPolly } from './polly-config';
import { createIssue, closeIssue, listIssues, addComment } from './index';

describe('GitHub API Functions', () => {
  let polly;

  beforeAll(() => {
    polly = setupPolly();
  });

  afterAll(() => {
    return polly.stop();
  });

  it('should create a new issue', async () => {
    const token = 'test-token'; // 実際のテストではモックトークンを使用
    const mockCallback = jest.fn();
    const owner = 'test-owner';
    const repo = 'test-repo';
    const title = 'Test Issue';
    const body = 'This is a test issue.';

    // ライブラリのモックを使用して確認
    createIssue(owner, repo, title, body, token, false);

    // 実行後の確認
    expect(mockCallback).toHaveBeenCalledTimes(1);
    const response = mockCallback.mock.calls[0][1];
    expect(response.title).toBe(title);
  });

  it('should close an existing issue', async () => {
    const token = 'test-token';
    const mockCallback = jest.fn();
    const owner = 'test-owner';
    const repo = 'test-repo';
    const issueNumber = 1;

    closeIssue(owner, repo, issueNumber, token, false);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    const response = mockCallback.mock.calls[0][1];
    expect(response.state).toBe('closed');
  });

  it('should list open issues', async () => {
    const token = 'test-token';
    const mockCallback = jest.fn();
    const owner = 'test-owner';
    const repo = 'test-repo';

    listIssues(owner, repo, token, false);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    const issues = mockCallback.mock.calls[0][1];
    expect(Array.isArray(issues)).toBeTruthy();
  });

  it('should add a comment to an issue', async () => {
    const token = 'test-token';
    const mockCallback = jest.fn();
    const owner = 'test-owner';
    const repo = 'test-repo';
    const issueNumber = 1;
    const comment = 'Test comment';

    addComment(owner, repo, issueNumber, comment, token, false);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    const response = mockCallback.mock.calls[0][1];
    expect(response.body).toBe(comment);
  });
});
