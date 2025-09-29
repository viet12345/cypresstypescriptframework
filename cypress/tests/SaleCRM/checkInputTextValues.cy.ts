interface InputCase {
  value: string;
  valid: boolean;
  error_mes?: string;
}

describe('Check các input field với text values', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        cy.session('Authentication Session', () => {
            // Cách 1: Thiết lập giá trị cookie trực tiếp
            cy.saveLoginSession();
            // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
        });
    })

    describe('Check Add a new contact', () => {
        const TEXT_DATA_INPUT = require('../../fixtures/SaleCRM/text_data_values.json');
        const TEXT_INPUT = TEXT_DATA_INPUT.text_input;
        const EMAIL_INPUT = TEXT_DATA_INPUT.email_input;
        
        Object.entries(TEXT_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập First name với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                cy.visit('/contacts');
                cy.get('#btn-add-contact').should('be.visible').click().then(() => {
                    if (inputCase.value != "") {
                        // Nhập dữ liệu vào trường First name
                        cy.get('#first_name').clear().type(inputCase.value); 
                    }
                    cy.get('#formContact > .form-contact__button > #save-contact').click();
                    if (!inputCase.valid) {
                        cy.get('#first_name-error').should('be.visible').and('contain.text', inputCase.error_mes);
                    }
                });
            });
        })
    })
})