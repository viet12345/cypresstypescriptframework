// export class NavigationMenu {
//     openMenu() {
//       cy.get('nav').should('be.visible');
//     }
  
//     clickMenuItem(itemText: string) {
//       cy.get('nav').contains(itemText).click();
//     }
  
//     verifyActiveItem(itemText: string) {
//       cy.get('nav .active').should('contain.text', itemText);
//     }
//   }