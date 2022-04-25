export interface BulletinPostSchema {
  id: string;
  title: string;
  text: string;
  author: string;
  coveyTownID: string;
  createdAt: Date;
}

/**
 * Frontend representation of a bulletin post. Contains same values as the backend class
 */
export default class BulletinPost {
  private _id: string;

  private _author: string;

  private _title: string;

  private _text: string;

  private _createdAt: Date;

  private _coveyTownID: string;

  constructor(
    id: string,
    author: string,
    title: string,
    text: string,
    createdAt: Date,
    coveyTownID: string,
  ) {
    this._id = id;
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
    this._createdAt = createdAt;
    this._coveyTownID = coveyTownID;
  }

  get id(): string {
    return this._id;
  }

  get author() {
    return this._author;
  }

  get title() {
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

  get text() {
    return this._text;
  }

  get createdAt() {
    return this._createdAt;
  }

  get coveyTownID() {
    return this._coveyTownID;
  }

  /**
   * Converts a BulletinPost to a BulletinPostSchema
   * @returns BulletinPostSchema represntation of the current post
   */
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
