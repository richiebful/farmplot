import { FarmplotPage } from './app.po';

describe('farmplot App', () => {
  let page: FarmplotPage;

  beforeEach(() => {
    page = new FarmplotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
