import BulletinPost from './BulletinPost';

describe('ServerBulletinPost', () => {
  it('creates Bulletin Post with given parameters', () => {
    const date = new Date();
    const bulletinPost = new BulletinPost(
      'id',
      'author',
      'title',
      'text',
      date,
      'coveyTownID',
    );
    expect(bulletinPost.author).toBe('author');
    expect(bulletinPost.id).toBe('id');
    expect(bulletinPost.title).toBe('title');
    expect(bulletinPost.coveyTownID).toBe('coveyTownID');
    expect(bulletinPost.createdAt).toBe(date);
    expect(bulletinPost.text).toBe('text');
  });

  it('creates Bulletin Post and makes sure that text is limited 300 characters', () => {
    const date = new Date();
    const txtWith350 =
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
    const txtWith300 =
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const bulletinPost = new BulletinPost(
      'id',
      'author',
      'title',
      txtWith350,
      date,
      'coveyTownID',
    );
    expect(bulletinPost.text).toBe(txtWith300);
    expect(bulletinPost.text).not.toBe(txtWith350);

    const newText =
      'thisNewTextHas320Characters:)falksdjflaksdjflaksdjflaksdjflaksdjflaksdjflkasdj' +
      'fasdlkfjlskdjflkjsdlkjflskjlkskldslksksdjsdjdsjasdfasdfkjdflkjlskddkdjsdfnsdjflksdljkdslfkjs' +
      'ldkjflksjdlfkjslkdfjalsdjflaksdjflaksdjflaksdjflkasdjfasdlkfjlskdjflkjsdlkjflskjlkskldslksksd' +
      'jsdjdsjasdfasdfkjdflkjlskddkdjsdfnsdjflksdljkdslfkjsldkjf';
    const correctNewText =
      'thisNewTextHas320Characters:)falksdjflaksdjflaksdjflaksdjflaksdjflaksdjf' +
      'lkasdjfasdlkfjlskdjflkjsdlkjflskjlkskldslksksdjsdjdsjasdfasdfkjdflkjlskddkdjsdfnsdjflksdljkds' +
      'lfkjsldkjflksjdlfkjslkdfjalsdjflaksdjflaksdjflaksdjflkasdjfasdlkfjlskdjflkjsdlkjflskjlkskldslk' +
      'sksdjsdjdsjasdfasdfkjdflkjlskddkdjsdfnsdj';
    bulletinPost.text = newText;
    expect(bulletinPost.text).toBe(correctNewText);
    expect(bulletinPost.text).not.toBe(newText);
  });

  it('creates Bulletin Post and makes sure that title is limited 50 characters', () => {
    const date = new Date();
    const titleWith60 = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbaaaaaaaaaa';
    const titleWith50 = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
    const bulletinPost = new BulletinPost(
      'id',
      'author',
      titleWith60,
      'text',
      date,
      'coveyTownID',
    );
    expect(bulletinPost.title).toBe(titleWith50);
    expect(bulletinPost.title).not.toBe(titleWith60);

    const newTitle = 'thisNewTextHas60Characters:)alskdfjlaskdjflskdjflskjlsdkfjkk';
    const correctNewTitle = 'thisNewTextHas60Characters:)alskdfjlaskdjflskdjfls';
    bulletinPost.title = newTitle;
    expect(bulletinPost.title).toBe(correctNewTitle);
    expect(bulletinPost.title).not.toBe(newTitle);
  });
});
