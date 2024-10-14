const request = require("supertest");
const app = require("./index.js");

describe("GET /test/mirror", () => {
  let server;

  // サーバーをポート8000で起動
  beforeAll((done) => {
    server = app.listen(8000, () => {
      done();
    });
  }, 20000); // タイムアウトを10秒に設定

  // サーバーの終了処理
  afterAll((done) => {
    server.close(() => {
      done();
    });
  }, 10000); // タイムアウトを10秒に設定

  // 正常なリクエストを確認するテスト
  it("should respond with the same request data", async () => {
    const response = await request(server)
      .get("/test/mirror")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.text).toContain("GET /test/mirror");
  });

  // 404エラーテスト
  it("should return 404 for nonexistent files", async () => {
    const response = await request(server).get("/nonexistent");
    expect(response.status).toBe(404);
  });


});
