import { retryWithExponentialBackoff } from './index.js';

jest.useFakeTimers();

// 成功するリクエストのテスト
test("maxRetry回までにfuncが成功する", async () => {
    let count = 0;
    const mock = jest.fn();
    const func = () => {
        mock();
        count++;
        console.log(`func has been called ${count} times.`);
        if (count > 3) {
            return Promise.resolve(true);
        } else {
            return Promise.reject(new Error("fail"));
        }
    };

    const promise = retryWithExponentialBackoff(func, 5);

    jest.advanceTimersByTime(15000); // 1s + 2s + 4s + 8s = 15s

    await expect(promise).resolves.toBe(true);
    expect(mock).toHaveBeenCalledTimes(4); // 1 initial call + 3 retries
});

// 最大リトライ回数を超えるリクエストのテスト
test("maxRetry回リトライしても成功せずに終了する", async () => {
    let count = 0;
    const mock = jest.fn();
    const func = () => {
        mock();
        count++;
        console.log(`func has been called ${count} times.`);
        return Promise.reject(new Error("fail"));
    };

    const promise = retryWithExponentialBackoff(func, 3);

    jest.advanceTimersByTime(15000); // 1s + 2s + 4s + 8s = 15s

    await expect(promise).rejects.toThrow("fail");
    expect(mock).toHaveBeenCalledTimes(4); // 1 initial call + 3 retries
});

/*
test("maxRetry回までにfuncがtrueを返す", (done) => {
    let count = 0;
    const mock = jest.fn();
    const func = () => {
        mock();
        count++;
        console.log(`func has been called ${count} times.`);
        return count > 3;
    };
    const callback = (result) => {
        expect(result).toBe(true);
        expect(mock).toHaveBeenCalledTimes(4); // 1 initial call + 3 retries
        done();
    };

    retryWithExponentialBackoff(func, 5, callback);

    // Fast-forward until all timers have been executed
    jest.advanceTimersByTime(15000); // 1s + 2s + 4s + 8s = 15s
}, 20000);

test("maxRetry回リトライしても成功せずに終了する", (done) => {
    let count = 0;
    const mock = jest.fn();
    const func = () => {
        mock();
        count++;
        console.log(`func has been called ${count} times.`);
        return count > 5;
    };
    const callback = (result) => {
        expect(result).toBe(false);
        expect(mock).toHaveBeenCalledTimes(4); // 1 initial call + 3 retries
        done();
    };

    retryWithExponentialBackoff(func, 3, callback);

    // Fast-forward until all timers have been executed
    jest.advanceTimersByTime(15000); // 1s + 2s + 4s + 8s = 15s
}, 60000);
*/