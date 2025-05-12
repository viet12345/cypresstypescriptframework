import { Form } from '../components/Form';
import { inputField as I } from '../../fixtures/inputValues';

export class DataTable extends Form {
    private form: Form;

    constructor() {
        super();
        this.form = new Form();
    }


    // ---------- Element Getters ----------
    // Get the table element
    getTable(tableSelector: string) {
        return cy.get(tableSelector);
    }


    // ---------- Actions ----------

    searchData(inputSelector: string, data: string) {
        cy.intercept('GET', 'http://localhost:3001/users/search*').as('searchRequest');
        this.form.clearInputField(inputSelector);
        this.form.fillInputField(inputSelector, data);
        cy.wait('@searchRequest');
    }

    // ---------- Verifications ----------
    verifySearchingNoData(inputSelector: string, tableSelector: string) {
        //cần tìm cách wait đến khi search result loading xong trước khi assert
        this.searchData(inputSelector, I.NO_DATA_FOUND);
        this.getTable(tableSelector).should('have.text', 'No results found');
    }

    verifySearchingMustTrimSpace(inputSelector: string, tableSelector: string) {
        //cần tìm cách wait đến khi search result loading xong trước khi assert
        this.searchData(inputSelector, I.WITH_TRIM_SPACE);
        this.getTable(tableSelector).first().should('contain', I.WITH_TRIM_SPACE.trim());
    }
}
export const dataTable = new DataTable();