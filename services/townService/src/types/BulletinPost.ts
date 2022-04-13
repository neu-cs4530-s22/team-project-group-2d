import { nanoid } from 'nanoid';

export interface BulletinPostSchema {
  id: string;
  title: string;
  text: string;
  author: string;
  coveyTownID: string;
  createdAt: Date;
}
export interface DeletedPostsResponse {
  deletedCount: number;
}

export default class ServerBulletinPost {
  private _id: string;

  private _author: string;

  private _title: string;

  private _text: string;

  private _createdAt: Date;

  private _coveyTownID: string;

  constructor(author: string, title: string, text: string, coveyTownID: string) {
    this._id = nanoid();
    this._author = author;
    if (title.length > 50) {
      this._title = title.substring(0, 50);
    } else {
      this._title = title;
    }
    if (text.length > 300) {
      this._text = text.substring(0, 300);
    } else {
      this._text = text;
    }
    this._createdAt = new Date();
    this._coveyTownID = coveyTownID;
  }

  get id(): string {
    return this._id;
  }

  get author(): string {
    return this._author;
  }

  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    if (newTitle.length > 50) {
      this._title = newTitle.substring(0, 50);
    } else {
      this._title = newTitle;
    }
  }

  set text(newText: string) {
    if (newText.length > 300) {
      this._text = newText.substring(0, 300);
    } else {
      this._text = newText;
    }
  }

  get text(): string {
    return this._text;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get coveyTownID(): string {
    return this._coveyTownID;
  }

  toBulletinPostSchema(): BulletinPostSchema {
    return {
      id: this._id,
      title: this._title,
      text: this._text,
      author: this._author,
      coveyTownID: this._coveyTownID,
      createdAt: this._createdAt,
    };
  }
}
