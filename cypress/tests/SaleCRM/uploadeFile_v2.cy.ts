function uploadFileAndVerify(fileName: any) {

    cy.intercept('POST', '**/notes/store').as('uploadFileSuccess'); // Thay đổi URL nếu cần
    // Tìm button/input để upload file
    cy.get('#show-notes').should('be.visible').click();
    cy.get('.button--add-note').should('be.visible').click();

    //Nhập form upload file
    cy.get('.form__note--add-new').should('be.visible').within(() => {
        cy.get('.form__input').first().should('be.empty').type('Upload file test by cypress ' + fileName);
        cy.get('iframe[class="tox-edit-area__iframe"]').first().then($iframe => {
            const body = $iframe.contents().find('body');
            cy.wrap(body).type('Upload file test by cypress');
        });
        cy.get('input[class="filepond--browser"]').first().attachFile({filePath: `DataTestingFiles/${fileName}`,encoding: 'base64'},{force: true});
    
        cy.get('ul[class="filepond--list"]').should('be.visible').then($list => {
            cy.wrap($list).find('li').should('have.length.greaterThan', 0);
        }); 
    });

    // Submit form nếu cần
    cy.get('.form__note--add-new > .form__box--button > .button--save').click();

    // Kiểm tra file đã được upload thành công
    cy.wait('@uploadFileSuccess').then(() => {
        cy.get('.body__file-attachment--list > a').should('have.attr', 'href');
        cy.get('.box__header').first().then($firstNote => {
            cy.wrap($firstNote).find('button[class="dropdown-toggle"]').click();
            cy.get('button[class="dropdown-item button--delete-note"]').click();
        })
    });
}

describe('Kiểm tra upload tất cả file từ folder DataTestingFiles.', () => {
    if (!Cypress.env('fileList') || Cypress.env('fileList').length === 0) {
        throw new Error('Không tìm thấy file nào trong thư mục DataTestingFiles. Vui lòng thêm file vào thư mục này để chạy test.');
    }

    console.log('Danh sách file cần kiểm tra:', Cypress.env('fileList'));

    beforeEach('Authentication steps', () => {
        cy.clearSession();
        cy.saveLoginSession(); // Lưu session đăng nhập trước khi thực hiện các thao tác khác
    });

    describe('Upload file từ Contact detail.', () => {
    Object.entries(Cypress.env('fileList')).forEach(([index,fileName]) => {
            it(`Kiểm tra upload file ${fileName} trong tạo Note từ Contact detail.`, () => {
                cy.visit('contacts/49786'); // Cập nhật đường dẫn nếu cần
                uploadFileAndVerify(fileName);
            });
        });
    })


    describe('Upload file từ Deal detail.', () => {
    Object.entries(Cypress.env('fileList')).forEach(([index,fileName]) => {
        it(`Kiểm tra upload file ${fileName} trong tạo Note từ Deal detail.`, () => {
            cy.visit('deals/10394'); // Cập nhật đường dẫn nếu cần
                uploadFileAndVerify(fileName);
            });
        });
    });
});
