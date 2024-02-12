import {jsonParserResult} from "./index.js";
const inputJson1 = '{"yokohama":"045","kawasaki":"044","ebina":"0460"}';
const inputJson2 = '{"yokohama":"045","kawasaki":"044","ebina":"0460",}';
const inputJson3 = '{}';


describe("jsonParserResult", () => {
    it("正常なjson", () => {
        expect(jsonParserResult(inputJson1)).toEqual({ success: true, data: { yokohama: '045', kawasaki: '044', ebina: '0460' }});
    });
    it("末尾に余計な,入り", () => {
        expect(jsonParserResult(inputJson2)).toEqual({ success: false, error: 'Unexpected token } in JSON at position 50' });
    });
    it("空のjson", () => {
        expect(jsonParserResult(inputJson3)).toEqual({ success: true, data: {}});
    });
})


