"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedBuffer = exports.Feed = void 0;
var Feed = /** @class */ (function () {
    function Feed(userImage, userName, feedContent, regidate, hashTag) {
        this.feedID = (Math.floor(Math.random() * 281474976710655)).toString(16);
        this.userImage = userImage;
        this.userName = userName;
        this.feedContent = feedContent;
        this.regidate = regidate;
        this.hashTag = hashTag;
    }
    return Feed;
}());
exports.Feed = Feed;
exports.feedBuffer = [];
