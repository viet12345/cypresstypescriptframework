//Toàn bộ các page URL mà chỉ có thể truy cập sau khi login
export const PAGE_URLS = {
  SIGNIN_PAGE: "/signin",
  HOMEPAGE: "",
  CONTACTS_PAGE: "/contacts",
  PERSONAL_PAGE: "/personal",
  MY_ACCOUNT: "/user/settings",
  SEARCHING_PAGE: "/transaction/new",
};

//URL có thể truy cập khi chưa cần login
export const GUEST_MODE_URLS = {
  'Sign in': "/signin",
  'Sign Up': "/signup",
}

//URL có thể cần login để truy cập
export const LOGGED_IN_URLS = {
  'My Account': "/user/settings",
  'Bank Accounts': "/bankaccounts",
}

//URL không thể truy cập bằng sub-user
export const ADMIN_URLS = {
  'ADMIN_SITE': "/admin"
}
