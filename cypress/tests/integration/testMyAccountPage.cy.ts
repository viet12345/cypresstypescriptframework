import { homePage } from '../../pages/index.page'
import { form } from '../../components/Form'


describe('Validation input field test', () => {
    it.only(`Verify invalid email fields`, () => {
        homePage.switchTab("[data-test='sidenav-user-settings']");
        form.fillInputField("[data-test='user-settings-email-input']", 'Santos.Runte65â@@gmail.comâ');
        form.verifyValidationError('#user-settings-email-input-helper-text', 'Must contain a valid email address');
    })
})