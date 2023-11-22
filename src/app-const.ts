// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppConst {
  // Route path
  export const LOGIN_URL = '/login'
  export const REGISTER_URL = '/register'
  export const VERIFY_URL = '/verify'
  export const OAUTH2_CALLBACK_URL = '/oauth2/callback'
  export const FORGOT_PASSWORD_URL = '/forgot'
  export const CHANGE_PASSWORD_URL = '/change-password'
  export const REGISTER_CALLBACK_URL = '/register/callback'
  export const HOME_ADMIN_URL = '/admin/home'
  export const LOAD_COIN_URL = '/load-coin'
  export const HOME_URL = '/'
  export const RACER_RANKING_URL = '/bxh-racer'
  export const GRAND_PRIX_URL = '/admin/grandPrix'
  export const RACE_TEAM_URL = '/admin/raceTeams'
  export const RACER_RESULT_DETAIL_URL = '/result/racer/'
  export const ADD_RACER_TO_GRAND_PRIX_URL = '/admin/race-team/addRacer/'
  export const BOOK_DETAIL_URL = '/book/'
  export const CHAPTER_DETAIL_URL = '/chapter/'
  export const USER_PROFILE_URL = '/user/profile'
  export const ERROR_PAGE = '/error'
  export const ERROR_PAGE_403 = '/error_403'

  //writer
  export const WRITER_DASHBOARD_URL = '/writer/dashboard'
  export const WRITER_CREATE_BOOK = '/writer/book/create'

  // messages
  export const LOGIN_FAILED_400 = 'Username not exist'
  export const LOGIN_FAILED_401 = 'Password not valid'
  export const LOGIN_FAILED_SERVER = 'Server not available'

  export const REGISTER_FAILED_400 = 'Username or Password not exist'
  export const REGISTER_FAILED_401 = 'Password not valid'
  export const REGISTER_FAILED_SERVER = 'Server not available'

  export const DEFAULT_MESSAGE_400 = 'Bad Request 400'
  export const DEFAULT_MESSAGE_404 = 'Bad Request 404'
  export const DEFAULT_MESSAGE_401 = "You don't have permission"

  export const DEFAULT_MESSAGE_NETWORK_ERROR = 'Network Error'

  export const PAGE_404_MESSAGE = 'Sorry, the page you visited does not exist.'
  export const PAGE_403_MESSAGE = "Sorry, you don't have permission to access this page."
  export const PAGE_500_MESSAGE = 'Sorry, Something went wrong on server.'
}
