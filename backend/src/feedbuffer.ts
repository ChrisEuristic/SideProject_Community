export class Feed {
  feedID: string;
  userImage: string;
  userName: string;
  feedContent: string;
  regidate: string;
  hashTag: string;

  constructor(userImage: string, userName: string, feedContent: string, regidate: string, hashTag: string) {
    this.feedID = (Math.floor(Math.random() * 281474976710655)).toString(16);
    this.userImage = userImage;
    this.userName = userName;
    this.feedContent = feedContent;
    this.regidate = regidate;
    this.hashTag = hashTag;
  }
}

export const feedBuffer: Array<Feed> = [];