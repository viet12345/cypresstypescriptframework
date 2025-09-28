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
          errorCode.push(codeInput + ' ' + 'status lỗi'); // Lưu mã bị lỗi
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
            errorCode.push(codeInput + ' ' + 'gateway code không tìm thấy'); // Lưu mã bị lỗi
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
        row.innerText.includes(airportCodeInputString));

      if (!matchedRow) {
        errorCode.push(codeInput + ' ' + 'airportCode không tìm thấy'); // Lưu mã bị lỗi
        return;
      }

      const $row = Cypress.$(matchedRow);

      // Lấy text từ cột thứ 9
      const codeText = $row.find('td').eq(9).text().trim();

      if (codeText !== codeInput.trim()) {
        errorCode.push(codeInput + ' ' + 'Code destination không tìm thấy'); // Lưu mã bị lỗi
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

    
    // Tạo timestamp để file không bị ghi đè
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}-${String(now.getMinutes()).padStart(2,'0')}-${String(now.getSeconds()).padStart(2,'0')}`;

    const fileName_Gateway = `cypress/reports/GQT/GatewayLog_${timestamp}.json`;
    const fileName_Destination = `cypress/reports/GQT/DestinationsLog_${timestamp}.json`;

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
        cy.get('.p-select-list').should('be.visible').within(() => {
            cy.get('[aria-label="Lorelei"]').click();
        });
        cy.get('#submit-user').click({force:true});
        cy.visit('https://qalogin-gqt-spa.vacv-nonprod.click/qa-hxjhdknbdklnbklnbkjkld.html#/internal/packages'); // Cập nhật đường dẫn nếu cần
    
        cy.wait(30000);
    
        cy.log('success');
    });
    
    it(`Kiểm tra data Gateways`, () => {
      const errorGateways: string[] = []; 
        GATEWAYS.forEach(($gateway:any) => {
        checkIntegrationPackageData_v2('Gateways',$gateway.code, $gateway.status, errorGateways);
      });
      cy.writeFile(fileName_Gateway, {
        runAt: now.toISOString(),
        totalErrors: errorGateways.length,
        errorGateways: errorGateways
      });
    });
    
    
    it(`Kiểm tra data Destinations`, () => {
      const errorDestinations: string[] = []; 
      DESTINATIONS.forEach(($destination:any) => {
        checkIntegrationPackageData_v2('Destinations', $destination.code, $destination.status, errorDestinations, $destination.airportCode);
      });
      cy.writeFile(fileName_Destination, {
        runAt: now.toISOString(),
        totalErrors: errorDestinations.length,
        errorDestinations: errorDestinations
      });
    });
})