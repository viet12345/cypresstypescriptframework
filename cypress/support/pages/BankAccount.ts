import { Form } from '../components/Form';
import { BasePage } from './BasePage';
import { BankAccountsPageSelectors as S } from '../constants/pages/bankAccountsPageConstants';
import { BANK_ACC } from '../../fixtures/users';

export class BankAccountPage extends BasePage {
    private form: Form;

    constructor() {
        super();
        this.form = new Form();
    }

    // ---------- Element Getters ----------
    createNewBankAccountButton() {
        return cy.get(S.createButton);
    }

    listOfBankAccount(){
        return cy.get(S.accListItem);
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
        this.listOfBankAccount().filter(`:contains(${bankName})`).first().find(S.deleteButton).click();
    }

    // ---------- Verifications ----------
    verifyBankAccountNameNotExist( value: string): void {
        this.listOfBankAccount()
            .filter(`:contains(${value})`)
            .should('have.length', 0);
    }

    verifyDuplicateBankAccountName(): void {
        //Nhập form
        this.fillInputField(S.bankAccountName, BANK_ACC.BANK_NAME);
        this.fillInputField(S.routingNumber, BANK_ACC.ROUTING_NUM);
        this.fillInputField(S.accountNumber, BANK_ACC.ACC_NUM);
        //Double click để submit form
        this.doubleClickSubmitButton(S.submitCreateButton);
        //Verify double click không tạo ra bản ghi duplicated
        this.listOfBankAccount().filter(`:contains(${BANK_ACC.BANK_NAME})`).should('have.length', 1);
        //Dọn data test
        this.deleteBankAccount(BANK_ACC.BANK_NAME);
    }
}

export const bankAccountPage = new BankAccountPage();