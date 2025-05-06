import { Form } from '../components/Form';
import { BasePage } from './BasePage';

export class BankAccountPage extends BasePage {
    private form: Form;

    constructor() {
        super();
        this.form = new Form();
    }

    // ---------- Element Getters ----------
    createNewBankAccountButton() {
        return cy.get("[data-test='bankaccount-new']");
    }

    listOfBankAccount(){
        return cy.get('.bank-account');
    }

    // ---------- Actions ----------

    fillInputField(inputSelector: string, value: string | number): void {
        this.form.fillInputField(inputSelector, value);
    }

    doubleClickSubmitButton(submitSelector: string): void {
        this.form.doubleClickSubmitButton(submitSelector);
    }

    // ---------- Verifications ----------
    verifyBankAccountNameNotExist(inputSelector: string, value: string | number): void {
        this.form.inputField(inputSelector).should('not.exist');
    }

    verifyDuplicateBankAccountName(uniqueItemName: string): void {
        this.fillInputField('[data-test="bankaccount-name"]', uniqueItemName);
        this.fillInputField('[data-test="bankaccount-name"]', 'Test Bank Account');
        this.fillInputField('[data-test="bankaccount-name"]', 'Test Bank Account');
        this.doubleClickSubmitButton('[data-test="bankaccount-submit"]');
        this.listOfBankAccount().filter(`:contains(${uniqueItemName})`).should('have.length', 1);
    }
}

export const bankAccountPage = new BankAccountPage();