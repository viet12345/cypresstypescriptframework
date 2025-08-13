describe('uploadeFile', () => {
    //Authentication steps: Lưu cookies/session để sử dụng lại trong các test khác.
    beforeEach('Authentication steps', () => {
        // Cách 1: Thiết lập giá trị cookie trực tiếp
        cy.saveLoginSession();
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
                cy.get('#show-notes').should('be.visible').click();
                cy.get('.button--add-note').should('be.visible').click();
                cy.get('.form__note--add-new > :nth-child(5) > .form__input').should('be.empty').type('Upload file test by cypress ' + fileName);
                cy.get('iframe[class="tox-edit-area__iframe"]').first().then($iframe => {
                    const body = $iframe.contents().find('body');
                    cy.wrap(body).type('Upload file test by cypress');
                });
                cy.get('input[type="file"]').attachFile(`DataTestingFiles/${fileName}`);
                // Submit form nếu cần
                cy.get('.form__note--add-new > .form__box--button > .button--save').click();

                // Kiểm tra file đã được upload thành công
                cy.contains(fileName).should('exist');
            });
        });
    })  
})