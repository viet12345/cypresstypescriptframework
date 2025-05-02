export const SignInPageSelectors = {
    usernameInput: "#username",
    passwordInput: "#password",
    loginButton: "[data-test='signin-submit']",
    loginTitle: "h1",
    buttonSignUp: "[data-test='signup']",
    checkboxRememberMe: "[data-test='signin-remember-me']",
    loginUserNameErrorMessage: "[id='username-helper-text']",
    loginPasswordErrorMessage: "[id='password-helper-text']",
    loginErrorMessageAPI: "[data-test='signin-error']",
}

export const SignInPageMessages = {
    usernameIsRequired: 'Username is required',
    userNamePasswordInvalid: 'Username or password is invalid',
}
