import { Schema } from 'mongoose';

export default class ServerBulletinPost {
  private _id: Schema.Types.ObjectId;

  private _author: string;

  private _title: string;

  private _text: string;

  private _createdAt: Date;

  constructor(id: Schema.Types.ObjectId, author: string, title: string, text: string, createdAt: Date) {
    this._id = id;
    this._author = author;
    if (title.length > 50) {
      this._title = title.substring(0, 50);
    } else {
      this._title = title;
    }
    if (text.length > 50) {
      this._text = text.substring(0, 50);
    } else {
      this._text = text;
    }
    this._createdAt = createdAt;
  }

  get id(): Schema.Types.ObjectId {
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
    if (newText.length > 50) {
      this._text = newText.substring(0, 50);
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
}
