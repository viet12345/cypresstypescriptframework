import { Form } from '../components/Form';
import { BasePage } from './BasePage';
import { BankAccountsPageSelectors } from '../constants/pages/bankAccountsPageConstants';
import { BANK_ACC } from '../../fixtures/users';

export class BankAccountPage extends BasePage {
    private form: Form;

    constructor() {
        super();
        this.form = new Form();
    }

    // ---------- Element Getters ----------
    createNewBankAccountButton() {
        return cy.get(BankAccountsPageSelectors.createButton);
    }

    listOfBankAccount(){
        return cy.get(BankAccountsPageSelectors.accListItem);
    }

    // ---------- Actions ----------
    openCreateNewBankAccountForm(): void {
        this.createNewBankAccountButton().click();
    }

    fillInputField(inputSelector: string, value: string | number): void {
        this.form.fillInputField(inputSelector, value);
    }

    doubleClickSubmitButton(submitSelector: string): void {
        this.form.doubleClickSubmitButton(submitSelector);
    }

    deleteBankAccount(bankName:string): void {
        this.listOfBankAccount().filter(`:contains(${bankName})`).first().find(BankAccountsPageSelectors.deleteButton).click();
    }

    // ---------- Verifications ----------
    verifyBankAccountNameNotExist( value: string): void {
        this.listOfBankAccount()
            .filter(`:contains(${value})`)
            .should('have.length', 0)
    }

    verifyDuplicateBankAccountName(): void {
        this.fillInputField(BankAccountsPageSelectors.bankAccountName, BANK_ACC.BANK_NAME);
        this.fillInputField(BankAccountsPageSelectors.routingNumber, BANK_ACC.ROUTING_NUM);
        this.fillInputField(BankAccountsPageSelectors.accountNumber, BANK_ACC.ACC_NUM);
        this.doubleClickSubmitButton(BankAccountsPageSelectors.submitCreateButton);
        this.verifyBankAccountNameNotExist(BANK_ACC.BANK_NAME);
        this.listOfBankAccount().filter(`:contains(${BANK_ACC.BANK_NAME})`).should('have.length', 1);
        this.deleteBankAccount(BANK_ACC.BANK_NAME);
    }
}

export const bankAccountPage = new BankAccountPage();