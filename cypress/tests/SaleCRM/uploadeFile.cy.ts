import { PAGE_URLS } from '../../fixtures/urls'
import { signInPage, homePage } from '../../support/pages/index.page'
import { VALID_USER, INVALID_USER } from '../../fixtures/users'
import { INVALID_PASSWORD } from '../../fixtures/passwords'


describe('my first demo', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('redirect to the signin page have upload function', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.setCookie('XSRF-TOKEN', 'eyJpdiI6IndDZkd0VnlzRjhsdVBPbjQvc043WlE9PSIsInZhbHVlIjoiTXRCako1VHQ2NGVVbFJpMTlGZUgvZ21mUkFieVZsR0lBUWdTMzBlY2ViTSt5bm1Oa0Z1RElOVUMySVo4aFZoVDhKVHFvL2Q0cTIvVWVWKzk4cm9wZHBkK0Fvb3JZY2ZnZmEwR0paSXlMRy80alFHNzh6YTJXS2h6aDFyWmdWSUoiLCJtYWMiOiIzNWE4NzI1YTYyYTM1ZmFhNzI1ZjQ5MWZiOGViNGZhNTFjYWQ5ZWI0NTU0MjA2YTM5YzhkODQxZjcwODlmN2QwIiwidGFnIjoiIn0%3D');
        cy.setCookie('adamo_sales_crm_session', 'eyJpdiI6Ik5GbjhlekVWeDhyc1VEUkkyaGhVVGc9PSIsInZhbHVlIjoiNHVLMmMzVEEvZTZiSU9yeklsaFVmVUgvOGhqaE5zYTNwRWpBWG9Hc0F3SjlEY1FnR2NCMHJiTS9ZSDdETDE4K09yYnpiQVprU3BHRE9oZURKMzFwV1I2QnNBb1ZpRXB2VHdDMVp6T0w0OW41Y0lrd1lsR0pTZnBNaTE4SnIrWnYiLCJtYWMiOiJkNzZmOWNiNGFiN2UyMDE4YTUyZTM0ZDQ5MDkyNDU0MWQ2NGJjMGQxMmI2ZjVkNTM1NjhjYjBhZWJkZTY3ZGY2IiwidGFnIjoiIn0%3D');
        // Cách 2: Với các hệ thống có chức năng login cơ bản, nên sử dụng hàm LoginbyApi từ command.
    })

    describe('Check upload with multi file type', () => {
        const files = [
            'download.jpeg',
            'download.png',
            'download.jfif',
            'download.jpg',
        ];
        files.forEach((fileName) => {
            it(`Kiểm tra upload file: ${fileName}`, () => {
                //Mở form có upload function
                cy.visit('contacts/49787'); // Cập nhật đường dẫn nếu cần

                // Tìm button/input để upload file
                // Giả sử input có selector là '#file-upload'
                cy.get('#show-notes').should('be.visible').click();
                cy.get('.button--add-note').should('be.visible').click();
                cy.get('.form__note--add-new > :nth-child(5) > .form__input').should('be.empty').type('Upload file test by cypress ' + fileName);
                cy.get('iframe[class="tox-edit-area__iframe"]').first().then($iframe => {
                    const body = $iframe.contents().find('body');
                    cy.wrap(body).type('Upload file test by cypress');
                });
                cy.get('input[type="file"]').attachFile(`DataTestingFiles/${fileName}`);
                // // Submit form nếu cần
                cy.get('.form__note--add-new > .form__box--button > .button--save').click();

                // // Kiểm tra file đã được upload thành công
                cy.contains(fileName).should('exist');
            });
        });
    })  
})