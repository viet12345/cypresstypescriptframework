import { VALID_USER } from "../../fixtures/users";
import { datePicker } from "../../support/components/index.components";
import { DateString as D } from "../../support/constants/components/datePickerConstants";

describe('Test Date Picker', () => {
    before('login the system', () => {
        cy.loginViaUI(VALID_USER.USER, VALID_USER.PASSWORD);
    })

    it('Verify Select range date', () => {
        datePicker.openDatePicker();
        datePicker.selectDate(D.startDate, D.endDate);
        datePicker.verifyPickDateRange(D.startDate, D.endDate);
    })
})