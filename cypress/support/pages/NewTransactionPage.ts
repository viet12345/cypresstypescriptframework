import { DataTable } from '../components/DataTable';
import { BasePage } from './BasePage';
import { TransactionSelector as S } from '../../support/constants/pages/transactionNewPage';


export class NewTransactionPage extends BasePage {
  private dataTable: DataTable;

  constructor() {
    super();
    this.dataTable = new DataTable();
  }

  // ---------- Element Getters ----------

  // ---------- Actions ----------


  // ---------- Verifications ----------
  verifySearchingNoData(){
    this.dataTable.verifySearchingNoData(S.searchInput, S.listOfTransaction);
  }

  verifySearchingMustTrimSpace(){
    this.dataTable.verifySearchingMustTrimSpace(S.searchInput,S.listOfTransaction);
  }

}

export const newTransactionPage = new NewTransactionPage();
