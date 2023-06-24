"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostingNo = void 0;
/**
 * 클라이언트로부터 받은 request.url을 protocol, origin, path, posting No로 분해하여 리턴한다.
 * @param requestURL
 * @returns
 */
function getPostingNo(requestURL) {
    var urlArr = requestURL.split("/");
    return urlArr[urlArr.length - 1];
}
exports.getPostingNo = getPostingNo;
