interface InputCase {
  value: string;
  valid: boolean;
  error_mes?: string;
}

function typeInputAndVerify(actionType: 'add' | 'edit',btnOpenForm:string ,inputSelector: string, btnSaveForm:string , errorSelector: string, inputCase:InputCase) {
    cy.get(btnOpenForm).should('be.visible').click().then(() => {
    if (inputCase.value != "") {
        // Nhập dữ liệu vào trường First name
        cy.get(inputSelector).clear().type(inputCase.value); 
    }
    cy.get(btnSaveForm).click({ force: true });
    if (!inputCase.valid && actionType === 'add') {
        cy.get(errorSelector).should('be.visible').and('contain.text', inputCase.error_mes);
    }
    });
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

    describe('Check trong form Add a new contact', () => {
        const TEXT_DATA_INPUT = require('../../fixtures/SaleCRM/text_data_values.json');
        const FIRST_NAME_INPUT = TEXT_DATA_INPUT.first_name_input;
        const LAST_NAME_INPUT = TEXT_DATA_INPUT.last_name_input;
        const EMAIL_INPUT = TEXT_DATA_INPUT.email_input;
        const PHONE_NUMBER_INPUT = TEXT_DATA_INPUT.phone_without_code_input;
        const LINK_INPUT = TEXT_DATA_INPUT.dynamic_link_input;
        
        Object.entries(FIRST_NAME_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập First name với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '#first_name';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#first_name-error';

                cy.visit('/contacts');
                typeInputAndVerify('add',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        })

        Object.entries(LAST_NAME_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập Last name với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '#last_name';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#last_name-error';

                cy.visit('/contacts');
                typeInputAndVerify('add',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        });

        Object.entries(EMAIL_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập Email với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '#email';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#email-error';

                cy.visit('/contacts');
                typeInputAndVerify('add',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        });

        Object.entries(PHONE_NUMBER_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập Phone number với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '[name="phone"]';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#phone-no-error';

                cy.visit('/contacts');
                typeInputAndVerify('add',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        });

        Object.entries(LINK_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập LINK_INPUT với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '#linked_in';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#linked_in-error';

                cy.visit('/contacts');
                typeInputAndVerify('add',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        });
    })

    describe('Check trong form Edit a contact', () => {
        const TEXT_DATA_INPUT = require('../../fixtures/SaleCRM/text_data_values.json');
        const FIRST_NAME_INPUT = TEXT_DATA_INPUT.first_name_input;
        const LAST_NAME_INPUT = TEXT_DATA_INPUT.last_name_input;
        const EMAIL_INPUT = TEXT_DATA_INPUT.email_input;
        const PHONE_NUMBER_INPUT = TEXT_DATA_INPUT.phone_without_code_input;
        const LINK_INPUT = TEXT_DATA_INPUT.dynamic_link_input;
        
        Object.entries(FIRST_NAME_INPUT).forEach(([$case, $valueObj]) => {
            it.only(`Kiểm tra nhập First name với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '.button-edit';
                const inputSelector = '[name="first_name"]';
                const btnSaveForm = '#btnSaveEditContact';
                const errorSelector = '#first_name-error';

                cy.visit('/contacts/312');
                typeInputAndVerify('edit',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        })

        Object.entries(LAST_NAME_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập Last name với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '#last_name';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#last_name-error';

                cy.visit('/contacts');
                typeInputAndVerify('edit',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        });

        Object.entries(EMAIL_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập Email với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '#email';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#email-error';

                cy.visit('/contacts');
                typeInputAndVerify('edit',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        });

        Object.entries(PHONE_NUMBER_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập Phone number với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '[name="phone"]';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#phone-no-error';

                cy.visit('/contacts');
                typeInputAndVerify('edit',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        });

        Object.entries(LINK_INPUT).forEach(([$case, $valueObj]) => {
            it(`Kiểm tra nhập LINK_INPUT với input ${$case}`, () => {
                const inputCase = $valueObj as InputCase; // Ép kiểu tại đây
                const btnOpenForm = '#btn-add-contact';
                const inputSelector = '#linked_in';
                const btnSaveForm = '#formContact > .form-contact__button > #save-contact';
                const errorSelector = '#linked_in-error';

                cy.visit('/contacts');
                typeInputAndVerify('edit',btnOpenForm, inputSelector, btnSaveForm, errorSelector, inputCase);
            });
        });
    })
})