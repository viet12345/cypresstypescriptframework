export class Header {
  private get root() {
    return cy.get('header');
  }

  logo() {
    return this.root.find('.NavBar-logo')
  }
}

export const header = new Header();