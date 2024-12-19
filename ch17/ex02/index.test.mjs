import { createIssue, closeIssue, listIssues, addComment } from "./index.mjs"; // テスト対象のライブラリ
import https from "https"; // モック対象のモジュール

jest.mock("https", () => ({
  request: jest.fn(), // https.requestをモック
}));

describe("GitHub API Library Tests", () => {
  let mockRequest;
  let mockOn;

  beforeEach(() => {
    // モック化されたhttps.requestの動作を設定
    mockRequest = {
      write: jest.fn(),
      end: jest.fn(),
      on: jest.fn(),
    };

    mockOn = jest.fn((event, callback) => {
      if (event === "data") {
        callback(
          JSON.stringify({
            id: 123,
            title: "Test Issue",
            html_url: "https://github.com/test/repo/issues/123",
          })
        );
      } else if (event === "end") {
        callback();
      }
    });

    mockRequest.on.mockImplementation(mockOn);

    https.request.mockImplementation((options, callback) => {
      callback({
        on: mockOn,
        statusCode: 200, // 正常なレスポンスをシミュレート
      });
      return mockRequest;
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // モックをリセット
  });

  test("createIssue should send a POST request to create a new issue", () => {
    createIssue(
      "owner",
      "repo",
      "Test Issue",
      "This is a test issue.",
      "fake-token",
      true
    );

    expect(https.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        path: "/repos/owner/repo/issues",
      }),
      expect.any(Function)
    );

    expect(mockRequest.write).toHaveBeenCalledWith(
      JSON.stringify({ title: "Test Issue", body: "This is a test issue." })
    );
    expect(mockRequest.end).toHaveBeenCalled();
  });

  test("closeIssue should send a PATCH request to close an issue", () => {
    closeIssue("owner", "repo", 123, "fake-token", true);

    expect(https.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "PATCH",
        path: "/repos/owner/repo/issues/123",
      }),
      expect.any(Function)
    );

    expect(mockRequest.write).toHaveBeenCalledWith(
      JSON.stringify({ state: "closed" })
    );
    expect(mockRequest.end).toHaveBeenCalled();
  });

  test("listIssues should send a GET request to fetch open issues", () => {
    listIssues("owner", "repo", "fake-token", true);

    expect(https.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        path: "/repos/owner/repo/issues?state=open",
      }),
      expect.any(Function)
    );

    expect(mockRequest.end).toHaveBeenCalled();
  });

  test("addComment should send a POST request to add a comment to an issue", () => {
    addComment("owner", "repo", 123, "This is a comment.", "fake-token", true);

    expect(https.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        path: "/repos/owner/repo/issues/123/comments",
      }),
      expect.any(Function)
    );

    expect(mockRequest.write).toHaveBeenCalledWith(
      JSON.stringify({ body: "This is a comment." })
    );
    expect(mockRequest.end).toHaveBeenCalled();
  });
});
