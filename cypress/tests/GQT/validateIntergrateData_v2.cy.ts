function checkIntegrationPackageData_v2(
  typeOfData: 'Gateways' | 'Destinations',
  codeInput: string,
  statusInput: 'OPEN' | 'CLOSED',
  errorCode: string[],
  airportCodeInput?: string, // optional vì chỉ cần cho Destinations
) {
  const expectedChecked = statusInput === 'OPEN' ? 'true' : 'false';
  const airportCodeInputString = String(airportCodeInput);
  const codeInputString = String(codeInput);
  
  // Hàm phụ để kiểm tra checkbox
  function checkCheckbox($row: JQuery<HTMLElement>, id: string, index: number) {
    cy.wrap($row).find(`div[id="${id}"]`).eq(index).then(($checkbox) => {
      try {
        expect($checkbox.attr('data-p-checked')).to.equal(expectedChecked);
      } catch (err: any) {
        //Bắt gateway lỗi và lưu vào mảng
        //Check nếu codeInput đã tồn tại trong mảng thì không push nữa
        if (!errorCode.includes(codeInput)){
          console.log(`Code bị sai status: ${codeInput}`);
          errorCode.push(codeInput); // Lưu mã bị lỗi
        }
      }
    });
  }

  if (typeOfData === 'Gateways' && codeInputString !== 'null') {
    cy.get('[pc53=""] > .p-datatable-column-header-content > .p-datatable-filter > .p-button')
      .click({ force: true });

    cy.get('input[placeholder="Airport Code"]').type(codeInput);
    cy.get('button[aria-label="Apply"]').click({ force: true });
    cy.wait(2000);

    cy.get('div[class="city-table"]').should('be.visible').within(() => {
      cy.get('tr').eq(1).then(($row) => {
        cy.wrap($row).find('td').eq(0).invoke('text').then(($code) => {
          try {
            expect($code.trim()).to.equal(codeInput.trim());
          } catch (err: any) {
            //Bắt data lỗi và lưu vào mảng
            console.log(`Code gateway không tìm thấy: ${codeInput}`);
            errorCode.push(codeInput); // Lưu mã bị lỗi
            return; // Dừng không chạy tiếp lệnh cy.contains
          }
          checkCheckbox($row, 'Package', 0);
        })
      });
    });
  }

  if (typeOfData === 'Destinations' && airportCodeInputString !== 'null' && codeInputString !== 'null') {
    cy.get('[pc89=""] > .p-datatable-column-header-content > .p-datatable-filter > .p-button').click({ force: true });
    cy.get('input[placeholder="SV Dest ID"]').type(codeInput, {force:true});
    cy.get('button[aria-label="Apply"]').click({ force: true });
    cy.wait(2000);
    cy.get('div.city-table').should('be.visible').within(() => {
      cy.get('tr').then(($rows) => {
        // Tìm row nào chứa airportCodeInputString
        const matchedRow = [...$rows].find(row => 
        row.innerText.includes(airportCodeInputString)
      );

      if (!matchedRow) {
        console.log(`Không tìm thấy row với airportCodeInputString: ${airportCodeInputString}`);
        errorCode.push(codeInput);
        return;
      }

      const $row = Cypress.$(matchedRow);

      // Lấy text từ cột thứ 9
      const codeText = $row.find('td').eq(9).text().trim();

      if (codeText !== codeInput.trim()) {
        console.log(`Code destination không tìm thấy: ${codeInput}`);
        errorCode.push(codeInput);
        return;
      }

    // Nếu khớp thì check checkbox
    checkCheckbox($row, 'Package', 1);
    checkCheckbox($row, 'Hotel', 1);
  });
});

  }

  //Clear data
  cy.get('.flex > #btn-clear-filter').click({ force: true });
  cy.wait(2000); // Chờ dữ liệu load xong
}

describe('Kiểm tra intergrated data', () => {
    const MOCK_DATA_GATEWAYS:any = require('../../fixtures/GQT/gateways.json');
    const GATEWAYS = MOCK_DATA_GATEWAYS.map((gateway: any) => ({
        code: gateway.code,
        status: gateway.status
    }));

    const MOCK_DATA_DESTINATIONS:any = require('../../fixtures/GQT/destinations.json');
    const DESTINATIONS = MOCK_DATA_DESTINATIONS.map((destination: any) => ({
        airportCode:destination.airportCode,
        code: destination.code,
        status: destination.status
    }));

    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps' , () => {
        cy.clearSession();
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
        cy.visit("https://qalogin-gqt-spa.vacv-nonprod.click/qa-hxjhdknbdklnbklnbkjkld.html#/pages/empty");
        cy.get('.ml-2').should('be.visible').click();
        cy.get("#username").type(Cypress.env('username'));
        cy.get("#password").type(Cypress.env('password'));
        cy.get("#submit-user").click();
        cy.get('.p-select-label').click();
        cy.get('.p-select-list-container').should('be.visible').within(() => {
            cy.get('#pv_id_11_53 > .role-options').contains('Lorelei Reid').click();
        });
        cy.get('#submit-user').click();
        cy.visit('https://qalogin-gqt-spa.vacv-nonprod.click/qa-hxjhdknbdklnbklnbkjkld.html#/internal/packages'); // Cập nhật đường dẫn nếu cần
    
        cy.wait(30000);
    
        cy.log('success');
    });
    
    it(`Kiểm tra data Gateways`, () => {
      const errorGateways: string[] = []; 
        GATEWAYS.forEach(($gateway:any) => {
        checkIntegrationPackageData_v2('Gateways',$gateway.code, $gateway.status, errorGateways);
      });
      cy.log('Danh sách Gateways có lỗi: ',errorGateways);
    });
    
    it.only(`Kiểm tra data Destinations`, () => {
      const errorDestinations: string[] = []; 
      DESTINATIONS.forEach(($destination:any) => {
        checkIntegrationPackageData_v2('Destinations', $destination.code, $destination.status, errorDestinations, $destination.airportCode);
      });
      cy.log('Danh sách Destinations có lỗi: ',errorDestinations);
    });
})