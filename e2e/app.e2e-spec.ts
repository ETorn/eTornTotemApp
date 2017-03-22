import { TotemAppPage } from './app.po';

describe('totem-app App', () => {
  let page: TotemAppPage;

  beforeEach(() => {
    page = new TotemAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
