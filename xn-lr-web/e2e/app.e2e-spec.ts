import { XnOaWebPage } from './app.po';

describe('xn-oa-web App', () => {
  let page: XnOaWebPage;

  beforeEach(() => {
    page = new XnOaWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
