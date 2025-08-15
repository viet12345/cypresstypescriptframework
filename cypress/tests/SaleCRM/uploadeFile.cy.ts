describe.only('Lấy danh sách file trong folder', () => {
        it('Kiểm tra upload tất cả file từ folder DataTestingFiles', () => {
            const folderPath = 'cypress/fixtures/DataTestingFiles';
            cy.task('listFiles', folderPath).then((fileList) => {
                (fileList as string[]).forEach((fileName) => {
                cy.saveLoginSession(); // Lưu session đăng nhập trước khi thực hiện các thao tác khác
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
        });
});