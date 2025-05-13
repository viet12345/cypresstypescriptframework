import { Form } from '../components/Form';
import { SEARCH_VALUES as V } from '../../fixtures/searchInput';

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

    searchData(inputSelector: string, data: string, apiSearchURL: string) {
        cy.intercept('GET', apiSearchURL).as('searchRequest');
        this.form.clearInputField(inputSelector);
        this.form.fillInputField(inputSelector, data);
        cy.wait('@searchRequest');
    }

    // ---------- Verifications ----------
    verifySearchingNoData(inputSelector: string, tableSelector: string, apiSearchURL:string) {
        //cần tìm cách wait đến khi search result loading xong trước khi assert
        this.searchData(inputSelector, V.NO_DATA_FOUND, apiSearchURL);
        this.getTable(tableSelector).should('have.text', 'No results found');
    }

    verifySearchingMustTrimSpace(inputSelector: string, tableSelector: string, apiSearchURL:string) {
        //cần tìm cách wait đến khi search result loading xong trước khi assert
        this.searchData(inputSelector, V.WITH_TRIM_SPACE, apiSearchURL);
        this.getTable(tableSelector).first().should('contain', V.WITH_TRIM_SPACE.trim());
    }
}
export const dataTable = new DataTable();