import { createLoggingProxy } from "./index.js";

describe('Proxy should log method calls with correct details', () => {
    it('should log method calls with correct details', () => {
        const obj = {
            sayHello(name) {
                return `Hello, ${name}!`;
            },
            add(a, b) {
                return a + b;
            }
        };

        const { proxy, callHistory } = createLoggingProxy(obj);

        expect(proxy.sayHello('Alice')).toBe('Hello, Alice!');
        expect(proxy.add(2, 3)).toBe(5);

        // Check call history
        expect(callHistory.length).toBe(2);

        expect(callHistory[0].method).toBe('sayHello');
        expect(callHistory[0].arguments).toEqual(['Alice']);
        expect(callHistory[1].method).toBe('add');
        expect(callHistory[1].arguments).toEqual([2, 3]);

        // Check if timestamps are valid ISO strings
        expect(new Date(callHistory[0].timestamp).toISOString()).toBe(callHistory[0].timestamp);
        expect(new Date(callHistory[1].timestamp).toISOString()).toBe(callHistory[1].timestamp);
    });
});
