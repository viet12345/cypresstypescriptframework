import { Form } from '../components/Form';
import { BasePage } from '../pages/BasePage';

export class DataTable extends BasePage {
      private form: Form;
    
      constructor() {
        super();
        this.form = new Form();
    }
    
    
    // ---------- Element Getters ----------
    // Get the table element
    getTable(tableSelector:string) {
        return this.get(tableSelector);
    }

    
    // ---------- Actions ----------

    // ---------- Verifications ----------
    verifySearchNoData(inputSelector:string, tableSelector:string){
        this.form.clearInputField(inputSelector)
        this.form.fillInputField(inputSelector,'Test searching with no data found.')
        //cần tìm cách wait đến khi search result loading xong trước khi assert
        this.getTable(tableSelector).should('contain','No results found')
    }

}
export const dataTable = new DataTable();