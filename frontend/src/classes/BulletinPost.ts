export default class BulletinPost {
    private _author: string;
  
    private _title: string;
  
    private _text: string;
  
    private _creationTime: number;
  
    constructor(author: string, title: string, text: string) {
      this._author = author;
      title.length > 50 ? this._title = title.substring(0,50) : this._title = title;
      text.length > 300 ? this._text = text.substring(0, 300) : this._text = text;
      this._creationTime = Date.now();
    }
  
    get author() {
      return this._author;
    }
  
    get title() {
      return this._title;
    }
  
    set title(newTitle: string) {
      this._title = newTitle;
    }

    set text(newText: string) {
      this._text = newText;
    }
  
    get text() {
      return this._text;
    }

    get creationTime() {
      return this._creationTime;
    }
  }