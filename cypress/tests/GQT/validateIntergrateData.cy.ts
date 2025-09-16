describe('Kiểm tra intergrated data', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    before('Authentication steps', () => {
        cy.clearSession();
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
        cy.visit("https://qalogin-gqt-spa.vacv-nonprod.click/qa-hxjhdknbdklnbklnbkjkld.html#/pages/empty");
        cy.get('.ml-2').should('be.visible').click();
        cy.get("#username").type("GQTProject");
        cy.get("#password").type("QAT2024_lh0sXpVyy0yq");
        cy.get("#submit-user").click();
        cy.get('.p-select-label').click();
        cy.get('.p-select-list-container').should('be.visible').within(() => {
            cy.get('#pv_id_11_53 > .role-options').contains('Lorelei Reid').click();
        });
        cy.get('#submit-user').click();
    });

    it(`Kiểm tra data Gateways có tồn tại và trạng thái checkbox hiển thị chính xác.`, () => {
        const API_ENDPOINT:string = 'https://vacations-qa-api.aircanada.com/gqt-mdt/api/city/list-management';
        const MOCK_DATA_GATEWAYS:any = require('../../fixtures/GQT/gateways.json');
        const GATEWAYS = MOCK_DATA_GATEWAYS.map((gateway: any) => ({
                code: gateway.code,
                status: gateway.status
        }));
        console.log('GATEWAYS_IDs:', GATEWAYS);

        //Intercept API để chờ dữ liệu load xong (có thể mock dữ liệu nếu cần)
        cy.intercept('GET', API_ENDPOINT).as('getPackage');

        cy.visit('https://qalogin-gqt-spa.vacv-nonprod.click/qa-hxjhdknbdklnbklnbkjkld.html#/internal/packages'); // Cập nhật đường dẫn nếu cần
        
        cy.wait(40000);

        cy.log('success');

        //Lấy dữ liệu từ JSON
        cy.get('[pc53=""]').should('be.visible').then(() => {
            GATEWAYS.forEach(($gateway:any) => {
                cy.get('[pc53=""] > .p-datatable-column-header-content > .p-datatable-filter > .p-button').click({ force: true });
                cy.get('input[placeholder="Airport Code"]').type($gateway.code);
                cy.get('button[aria-label="Apply"]').click({ force: true });
                cy.wait(2000); // Chờ dữ liệu load xong
                
                //Kiểm tra dữ liệu Gateway tồn tại trên GUI
                //Kiểm tra trạng thái check-box Package
                cy.get('div[class="city-table"]').should('be.visible').within(() => {
                    cy.get('tr').eq(1).then(($row) => {
                        cy.wrap($row).find('td').eq(0).should('have.text', $gateway.code);
                        cy.wrap($row).find('div[id="Package"]').eq(0).then(($checkbox) => {
                            if ($gateway.status === 'OPEN') {
                                expect($checkbox.attr('data-p-checked')).to.equal('true');
                            }
                            else
                                expect($checkbox.attr('data-p-checked')).to.equal('false');
                        });
                    });
                });

                //Clear data
                cy.get('[pc53=""] > .p-datatable-column-header-content > .p-datatable-filter > .p-button').click({ force: true });
                cy.get('input[placeholder="Airport Code"]').clear();
                cy.get('button[aria-label="Apply"]').click({ force: true });
                cy.wait(2000); // Chờ dữ liệu load xong
            });
        });
    })


    it.only(`Kiểm tra data Destinations có tồn tại và trạng thái checkbox hiển thị chính xác.`, () => {
        const API_ENDPOINT:string = 'https://vacations-qa-api.aircanada.com/gqt-mdt/api/city/list-management';
        const MOCK_DATA_DESTINATIONS:any = require('../../fixtures/GQT/destinations.json');
        const DESTINATIONS = MOCK_DATA_DESTINATIONS.map((destination: any) => ({
                airportCode:destination.airportCode,
                code: destination.code,
                status: destination.status
        }));
        console.log('DESTINATIONS', DESTINATIONS);

        //Intercept API để chờ dữ liệu load xong (có thể mock dữ liệu nếu cần)
        cy.intercept('GET', API_ENDPOINT).as('getPackage');

        cy.visit('https://qalogin-gqt-spa.vacv-nonprod.click/qa-hxjhdknbdklnbklnbkjkld.html#/internal/packages'); // Cập nhật đường dẫn nếu cần
        
        cy.wait(40000);

        cy.log('success');

        //Lấy dữ liệu từ JSON
        cy.get('[pc89=""]').then(() => {
            DESTINATIONS.forEach(($data:any) => {
                cy.get('[pc89=""] > .p-datatable-column-header-content > .p-datatable-filter > .p-button').click({ force: true });
                cy.get('input[placeholder="SV Dest ID"]').type($data.code);
                cy.get('button[aria-label="Apply"]').click({ force: true });
                cy.wait(2000); // Chờ dữ liệu load xong
                
                //Kiểm tra dữ liệu data tồn tại trên GUI
                //Kiểm tra trạng thái check-box Package
                cy.get('div[class="city-table"]').should('be.visible').within(() => {
                    cy.contains('td', $data.airportCode).closest('tr').then(($row) => {
                        cy.wrap($row).find('td').eq(9).should('have.text', $data.code);
                        cy.wrap($row).find('div[id="Package"]').eq(1).then(($checkbox) => {
                            if ($data.status === 'OPEN') {
                                expect($checkbox.attr('data-p-checked')).to.equal('true');
                            }
                            else
                                expect($checkbox.attr('data-p-checked')).to.equal('false');
                        });
                        cy.wrap($row).find('div[id="Hotel"]').eq(1).then(($checkbox) => {
                            if ($data.status === 'OPEN') {
                                expect($checkbox.attr('data-p-checked')).to.equal('true');
                            }
                            else
                                expect($checkbox.attr('data-p-checked')).to.equal('false');
                        });
                    });
                });

                // //Clear data
                cy.get('[pc89=""] > .p-datatable-column-header-content > .p-datatable-filter > .p-button').click({ force: true });
                cy.get('input[placeholder="SV Dest ID"]').clear();
                cy.get('button[aria-label="Apply"]').click({ force: true });
                cy.wait(2000); // Chờ dữ liệu load xong
            });
        });
    })
})