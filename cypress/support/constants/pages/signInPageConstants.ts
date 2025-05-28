export const SignInPageSelectors = {
    usernameInput: "#username",
    passwordInput: "#password",
    signinButton: "[data-test='signin-submit']",
    signinTitle: "h1",
    signUpTextLink: "[data-test='signup']",
    checkboxRememberMe: "[data-test='signin-remember-me']",
    signinUserNameErrorMessage: "[id='username-helper-text']",
    signinPasswordErrorMessage: "[id='password-helper-text']",
    signinErrorMessageAPI: "[data-test='signin-error']",
    showPasswordButton: "[data-test='signin-show-password']",
}

export const SignInPageMessages = {
    usernameIsRequired: 'Username is required',
    userNamePasswordInvalid: 'Username or password is invalid',
}
