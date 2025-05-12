export const MyAccountPageSelectors = {
    emailInput: "[data-test='user-settings-email-input']",
    emailMessageValidation: '#user-settings-email-input-helper-text',
    submitButton: "[data-test='user-settings-submit']",
    firstNameInput: "[data-test='user-settings-firstName-input']",
    lastNameInput: "[data-test='user-settings-lastName-input']",
    phoneInput: "[data-test='user-settings-phoneNumber-input']",
    firstNameErrorMessage: "#user-settings-firstName-input-helper-text",
    lastNameErrorMessage: "#user-settings-lastName-input-helper-text",
    phoneErrorMessage: "#user-settings-phoneNumber-input-helper-text",
}

export const MyAccountPageMessages = {
    invalidEmail: 'Must contain a valid email address',
    noFirstName: 'Enter a first name',
    noLastName: 'Enter a last name',
    noEmail: 'Enter an email address',
    noPhoneNumber: 'Enter a phone number',
}

export const Email = {
    NO_LOCAL_PART: 'email@',
    NO_AT_SYMBOL: 'emailinvalid.com',
    NO_TLD: 'email@invalid.',
    NO_DOMAIN: '@invalid.com',
    NO_SUBDOMAIN: 'email@invalid..com',
    NO_SUBDOMAIN_2: 'email@.com',
    CONTAIN_SPACE: 'email@invalid .com',
    CONTAIN_SPECIAL_CHAR: 'email@invalid!com',
    CONTAIN_UNICODE: 'đâylàemail@invaliđ.com',
}
