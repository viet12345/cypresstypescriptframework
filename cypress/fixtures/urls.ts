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
  'MY_ACCOUNT': "/user/settings",
  'BANKS_ACCOUNTS': "/bankaccounts",
  'NOTIFICATONS': "/notifications",
  'FRIENDS': "/contacts",
  'MINE': "/personal",
  'NEW_TRANSACTION': "/transaction/new"
}
