// index.test.js
// import { expect } from 'chai';
import { retryWithExponentialBackoff } from './index.js';

jest.useFakeTimers();

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



/*
describe('retryWithExponentialBackoff', () => {


    it('should succeed on the first try', () => {
        const func = jest.fn().mockReturnValue(true);
        const callback = jest.fn();

        retryWithExponentialBackoff(func, 3, callback);

        expect(func).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(true);
    });

    it('should retry and succeed', () => {
        const func = jest
            .fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);
        const callback = jest.fn();

        retryWithExponentialBackoff(func, 3, callback);

        // Fast-forward until all timers have been executed
        jest.advanceTimersByTime(7000); // 1s + 2s + 4s

        expect(func).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenCalledWith(true);
    });

    it('should retry and fail after maxRetry', () => {
        const func = jest.fn().mockReturnValue(false);
        const callback = jest.fn();

        retryWithExponentialBackoff(func, 3, callback);

        // Fast-forward until all timers have been executed
        jest.advanceTimersByTime(15000); // 1s + 2s + 4s + 8s

        expect(func).toHaveBeenCalledTimes(4);
        expect(callback).toHaveBeenCalledWith(false);
    });

    it('should handle thrown errors and retry', () => {
        const func = jest
            .fn()
            .mockImplementationOnce(() => { throw new Error(); })
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);
        const callback = jest.fn();

        retryWithExponentialBackoff(func, 3, callback);

        // Fast-forward until all timers have been executed
        jest.advanceTimersByTime(7000); // 1s + 2s + 4s

        expect(func).toHaveBeenCalledTimes(3);
        expect(callback).toHaveBeenCalledWith(true);
    });

    it('should handle thrown errors and fail after maxRetry', () => {
        const func = jest
            .fn()
            .mockImplementation(() => { throw new Error(); });
        const callback = jest.fn();

        retryWithExponentialBackoff(func, 3, callback);

        // Fast-forward until all timers have been executed
        jest.advanceTimersByTime(15000); // 1s + 2s + 4s + 8s

        expect(func).toHaveBeenCalledTimes(4);
        expect(callback).toHaveBeenCalledWith(false);
    });
});
*/