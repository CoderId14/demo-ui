export namespace AppConst {
  // Route path
  export const LOGIN_URL: string = "/login";
  export const REGISTER_URL: string = "/register";
  export const VERIFY_URL: string = "/verify";
  export const OAUTH2_CALLBACK_URL: string = "/oauth2/callback";
  export const FORGOT_PASSWORD_URL: string = "/forgot";
  export const CHANGE_PASSWORD_URL: string = "/change-password";
  export const REGISTER_CALLBACK_URL: string = "/register/callback";
  export const HOME_ADMIN_URL: string = "/admin/home";
  export const HOME_URL: string = "/";
  export const RACER_RANKING_URL: string = "/bxh-racer";
  export const ERROR_PAGE: string = "/error";
  export const ERROR_PAGE_403: string = "/error_403";

  // messages
  export const LOGIN_FAILED_400 = "Username not exist";
  export const LOGIN_FAILED_401 = "Password not valid";
  export const LOGIN_FAILED_SERVER = "Server not available";

  export const REGISTER_FAILED_400 = "Username or Password not exist";
  export const REGISTER_FAILED_401 = "Password not valid";
  export const REGISTER_FAILED_SERVER = "Server not available";

  export const DEFAULT_MESSAGE_400 = "Bad Request 400";
  export const DEFAULT_MESSAGE_404 = "Bad Request 404";
  export const DEFAULT_MESSAGE_401 = "You don't have permission";

  export const DEFAULT_MESSAGE_NETWORK_ERROR = "Network Error";

  export const PAGE_404_MESSAGE = "Sorry, the page you visited does not exist.";
  export const PAGE_403_MESSAGE =
    "Sorry, you don't have permission to access this page.";
  export const PAGE_500_MESSAGE = "Sorry, Something went wrong on server.";
}
