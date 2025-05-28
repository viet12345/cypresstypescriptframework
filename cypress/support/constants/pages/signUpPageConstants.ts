export const SignUpPageSelectors = {
    firstNameInput: "#firstName",
    lastNameInput: "#lastName",
    userNameInput: "#username",
    passwordInput: "#password",
    confirmPasswordInput: "#confirmPassword",
    signupButton: "[data-test='signup-submit']",
    signupTitle: "h1",
    signInTextLink: "[href='/signin']",
    firstNameErrorMessage: "[id='firstName-helper-text']",
    lastNameErrorMessage: "[id='lastName-helper-text']",
    userNameErrorMessage: "[id='userName-helper-text']",
    passwordErrorMessage: "[id='password-helper-text']",
    confirmPasswordErrorMessage: "[id='confirmPassword-helper-text']",
    signupErrorMessageAPI: "[data-test='signup-error']",
    showPasswordButton: "[data-test='signup-show-password']",
}

export const SignUpPageMessages = {
    fieldDataIsRequired: (fieldName: string): string => `${fieldName.split(' input')[0]} is required`,
    userNameExisted: 'Username already exists',
};
