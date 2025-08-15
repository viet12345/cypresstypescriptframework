import {Form} from '../../support/components/Form';

describe('Login validation', () => {
    const form = new Form();

    beforeEach(() => {
        cy.visit('/login');
    });

    it('Kiểm tra button disable/required input', () => {
        //Nhập thiếu cả 2 trường
        form.verifySubmitButtonDisabled('#loginButton');

        //Nhập full space
        form.fillInputField('#username', '   ');
        form.fillInputField('#password', '   ');
        form.verifySubmitButtonDisabled('#loginButton');

        //Nhập thiếu password
        form.clearInputField('#username');
        form.clearInputField('#password');
        form.fillInputField('#username', 'username/email');
        form.verifySubmitButtonDisabled('#loginButton');

        //Nhập thiếu username/email
        form.clearInputField('#username');
        form.clearInputField('#password');
        form.fillInputField('#password', 'password');
        form.verifySubmitButtonDisabled('#loginButton');
    });

    it(`Kiểm tra validation rule chung`, () => {
        //Nhập thông tin không hợp lệ
        form.fillInputField('#username', 'invalid-email.com'); // Nhập email format không hợp lệ
        form.fillInputField('#password', 'short'); // Nhập password quá ngắn

        //Submit button phải disable
        form.verifySubmitButtonDisabled('#loginButton');

        // Kiểm tra message lỗi hiển thị
        form.errorMessage('.password-error-message').should('be.visible').and('have.text', 'Password must be at least 8 characters, including upper case and lower case letters, numbers and special characters.');
        form.errorMessage('.email-error-message').should('contain', 'The email must have format @domain.com');
    });

    it('Kiểm tra login fail', () => {
        form.fillInputField('#username', 'emailvalid@gmail.com'); // Nhập email hợp lệ
        form.fillInputField('#password', 'password'); // Nhập password không hợp lệ
        form.clickSubmitButton('#loginButton');
        form.verifyValidationErrorMessage('.error-message', 'Invalid credentials'); // Kiểm tra thông báo lỗi hiển thị
        cy.url().should('include', '/login'); // Kiểm tra vẫn ở trang login
    });

    it('Kiểm tra login success', () => {
        form.fillInputField('#username', 'emailvalid@gmail.com'); // Nhập email hợp lệ
        form.fillInputField('#password', 'ValidPassword123!'); // Nhập password hợp lệ
        form.clickSubmitButton('#loginButton');
        cy.verifyUrl('/dashboard'); // Kiểm tra chuyển hướng đến trang dashboard
    });
});