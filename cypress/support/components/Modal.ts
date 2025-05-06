import { ModalSelectors as S } from "../constants/components/modalConstants";

export class Modal {
    get modal() {
      return cy.get(S.modal); // hoặc class/modal-id cụ thể
    }
  
    get confirmButton() {
      return cy.get(S.confirmButton);
    }
  
    get cancelButton() {
      return cy.get(S.cancelButton);
    }
  
    shouldBeVisible() {
      this.modal.should('be.visible');
    }
  
    shouldContainText(text: string) {
      this.modal.should('contain.text', text);
    }
  
    confirm() {
      this.confirmButton.click();
    }
  
    cancel() {
      this.cancelButton.click();
    }
  
    confirmAndCheckClosed() {
      this.confirm();
      this.modal.should('not.exist');
    }
  
    cancelAndCheckClosed() {
      this.cancel();
      this.modal.should('not.exist');
    }
  }

  export const modal = new Modal();
  