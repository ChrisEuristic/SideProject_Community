"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validAdmin = exports.removeLike = exports.addLike = exports.getIsLikeThis = exports.getLikeCount = exports.deleteReply = exports.addReply = exports.getReplyCount = exports.getReply = exports.incrementNoticeVisit = exports.deleteNoticePosting = exports.updateNoticePosting = exports.addNoticePosting = exports.getNoticeAll = exports.getNoticeOne = exports.killConnection = exports.getConnection = void 0;
var promise_1 = require("mysql2/promise");
var dotenv_1 = require("dotenv");
function getConnection() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dotenv_1.default.config();
                    return [4 /*yield*/, (0, promise_1.createConnection)({
                            host: "localhost",
                            port: 3306,
                            user: process.env.DB_ID,
                            password: process.env.DB_PW,
                            database: process.env.DB_NAME,
                        })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getConnection = getConnection;
function killConnection(connection) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.end()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.killConnection = killConnection;
function getNoticeOne(noticeId) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, rows, field;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _b.sent();
                    return [4 /*yield*/, connection.query("SELECT * FROM NOTICE WHERE ID = '".concat(noticeId, "'"))];
                case 2:
                    _a = _b.sent(), rows = _a[0], field = _a[1];
                    killConnection(connection);
                    return [2 /*return*/, rows[0]];
            }
        });
    });
}
exports.getNoticeOne = getNoticeOne;
function getNoticeAll(pageNo) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, count, field1, _b, rows, field2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _c.sent();
                    return [4 /*yield*/, connection.query("SELECT COUNT(*) as postingQty FROM NOTICE")];
                case 2:
                    _a = _c.sent(), count = _a[0], field1 = _a[1];
                    return [4 /*yield*/, connection.query("SELECT * FROM NOTICE ORDER BY ID DESC LIMIT 10 OFFSET " + (parseInt(pageNo) - 1) * 10)];
                case 3:
                    _b = _c.sent(), rows = _b[0], field2 = _b[1];
                    killConnection(connection);
                    return [2 /*return*/, [count[0].postingQty, rows]];
            }
        });
    });
}
exports.getNoticeAll = getNoticeAll;
function addNoticePosting(value) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, nickname, parsingNickname;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.query("SELECT NICKNAME FROM ADMIN WHERE ACCOUNT='" + value.account + "'")];
                case 2:
                    nickname = _a.sent();
                    parsingNickname = JSON.parse(JSON.stringify(nickname))[0][0];
                    return [4 /*yield*/, connection.query("INSERT INTO NOTICE(`title`,`content`,`writer`) VALUES('" +
                            value.title +
                            "','" +
                            value.content +
                            "','" +
                            parsingNickname['NICKNAME'] +
                            // value.account +
                            "')")];
                case 3:
                    _a.sent();
                    killConnection(connection);
                    return [2 /*return*/];
            }
        });
    });
}
exports.addNoticePosting = addNoticePosting;
function updateNoticePosting(value) {
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.query("UPDATE NOTICE SET TITLE = \"".concat(value.title, "\", CONTENT = \"").concat(value.content, "\" WHERE ID = ").concat(parseInt(value.postingNo)))];
                case 2:
                    _a.sent();
                    killConnection(connection);
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateNoticePosting = updateNoticePosting;
function deleteNoticePosting(noticeId) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, e_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.query("DELETE FROM REPLY WHERE POSTINGID = ".concat(noticeId))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log("deleteNoticePosting SQL Error: 댓글 지우기 중 에러");
                    console.error(e_1);
                    return [3 /*break*/, 5];
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, connection.query("DELETE FROM NOTICE WHERE ID = ".concat(noticeId))];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_2 = _a.sent();
                    console.log("deleteNoticePosting SQL Error: 본문 지우기 중 에러");
                    console.error(e_2);
                    return [3 /*break*/, 8];
                case 8:
                    killConnection(connection);
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteNoticePosting = deleteNoticePosting;
// !! 조회수, 좋아요 기능
/**
 * 조회수 1 증가
 * @param postingNo 게시물 번호
 */
function incrementNoticeVisit(postingNo) {
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.query("UPDATE NOTICE SET VISIT = VISIT + 1 WHERE ID = ".concat(postingNo))];
                case 2:
                    _a.sent();
                    killConnection(connection);
                    return [2 /*return*/];
            }
        });
    });
}
exports.incrementNoticeVisit = incrementNoticeVisit;
// !! 댓글 기능
function getReply(postingid) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, rows, field;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _b.sent();
                    return [4 /*yield*/, connection.query("SELECT * FROM REPLY WHERE POSTINGID=" + postingid + " ORDER BY ID ASC")];
                case 2:
                    _a = _b.sent(), rows = _a[0], field = _a[1];
                    killConnection(connection);
                    return [2 /*return*/, rows];
            }
        });
    });
}
exports.getReply = getReply;
function getReplyCount(postingid) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, rows, field;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _b.sent();
                    return [4 /*yield*/, connection.query("SELECT COUNT(*) as replyCount FROM REPLY WHERE POSTINGID=" + postingid)];
                case 2:
                    _a = _b.sent(), rows = _a[0], field = _a[1];
                    killConnection(connection);
                    return [2 /*return*/, rows[0]];
            }
        });
    });
}
exports.getReplyCount = getReplyCount;
function addReply(reply) {
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.query("INSERT INTO REPLY(`postingid`,`username`,`userid`,`content`) VALUES(" +
                            reply.postingid +
                            ",'" +
                            reply.username +
                            "','" +
                            reply.userid +
                            "','" +
                            reply.content +
                            "')")];
                case 2:
                    _a.sent();
                    killConnection(connection);
                    return [2 /*return*/];
            }
        });
    });
}
exports.addReply = addReply;
function deleteReply(replyID) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.query("DELETE FROM REPLY WHERE ID = ".concat(replyID))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    console.log("deleteNoticePosting SQL Error");
                    console.error(e_3);
                    return [3 /*break*/, 5];
                case 5:
                    killConnection(connection);
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteReply = deleteReply;
// !! 좋아요 기능
function getLikeCount(postingid) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, rows, field;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _b.sent();
                    return [4 /*yield*/, connection.query("SELECT COUNT(*) as likeCount FROM notice_like WHERE POSTINGID=" + postingid)];
                case 2:
                    _a = _b.sent(), rows = _a[0], field = _a[1];
                    killConnection(connection);
                    return [2 /*return*/, rows[0]];
            }
        });
    });
}
exports.getLikeCount = getLikeCount;
function getIsLikeThis(postingid, userid) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, rows, field;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _b.sent();
                    return [4 /*yield*/, connection.query("SELECT * FROM notice_like WHERE ID=".concat(postingid, " AND memberid='").concat(userid, "'"))];
                case 2:
                    _a = _b.sent(), rows = _a[0], field = _a[1];
                    killConnection(connection);
                    return [2 /*return*/, rows[0]];
            }
        });
    });
}
exports.getIsLikeThis = getIsLikeThis;
function addLike(postingid, userid) {
    return __awaiter(this, void 0, void 0, function () {
        var connection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.query("INSERT INTO notice_like(`postingid`,`memberid`) VALUES(" +
                            postingid +
                            ",'" +
                            userid +
                            "')")];
                case 2:
                    _a.sent();
                    killConnection(connection);
                    return [2 /*return*/];
            }
        });
    });
}
exports.addLike = addLike;
function removeLike(postingid, userid) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.query("DELETE FROM notice_like WHERE postingid = ".concat(postingid, " and memberid = '").concat(userid, "'"))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _a.sent();
                    console.log("deleteNoticePosting SQL Error");
                    console.error(e_4);
                    return [3 /*break*/, 5];
                case 5:
                    killConnection(connection);
                    return [2 /*return*/];
            }
        });
    });
}
exports.removeLike = removeLike;
// !: 어드민 계정 검증
function validAdmin(account) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, _a, rows, field;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getConnection()];
                case 1:
                    connection = _b.sent();
                    return [4 /*yield*/, connection.query("SELECT * FROM ADMIN WHERE ACCOUNT='".concat(account, "'"))];
                case 2:
                    _a = _b.sent(), rows = _a[0], field = _a[1];
                    killConnection(connection);
                    return [2 /*return*/, rows[0] ? true : false];
            }
        });
    });
}
exports.validAdmin = validAdmin;
