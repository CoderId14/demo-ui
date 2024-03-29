import ChangePasswordForm from '@/components/change_password'
import ForgotPassword from '@/pages/ForgotPassword'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import MailRedirect from '@/components/mail_send'
import GoogleCallBack from '@/components/oauth_callback'
import Register from '@/pages/Register'
import RegisterCallback from '@/components/register/register_callback'
import { AppConst } from '@/app-const'

import ErrorPage from '@/components/ErrorPage'
import ErrorPage403 from '@/components/ErrorPage/Page_403'
import BookDetail from '@/pages/BookDetail'
import ChapterDetail from '@/pages/ChapterDetail'
import SearchBook from '@/pages/SearchBook'
import BookMarkList from '@/pages/BookMarkList'
import LoadCoin from '@/pages/LoadCoin'
import UserProfile from '@/pages/UserProfile'
import RedirectLoadCoin from '@/pages/LoadCoin/RedirectLoadCoin'
import DashBoardWriter from '@/pages/Writer/DashBoard'
import CreateBook from '@/pages/Writer/WorkSpace/Book/CreateBook'
import ChapterAdd from '@/pages/Writer/WorkSpace/Chapter/ChapterAdd'
import ChapterEdit from '@/pages/Writer/WorkSpace/Chapter/ChapterEdit'
import BookEdit from '@/pages/Writer/WorkSpace/Book/EditBook'

const publicRoutes = [
  { path: AppConst.LOGIN_URL, component: Login },
  { path: AppConst.REGISTER_URL, component: Register },
  { path: AppConst.VERIFY_URL, component: MailRedirect },
  { path: AppConst.OAUTH2_CALLBACK_URL, component: GoogleCallBack },
  { path: AppConst.FORGOT_PASSWORD_URL, component: ForgotPassword },
  { path: AppConst.CHANGE_PASSWORD_URL, component: ChangePasswordForm },
  { path: AppConst.REGISTER_CALLBACK_URL, component: RegisterCallback },
  { path: '/book/:id', component: BookDetail },
  { path: AppConst.LOAD_COIN_URL, component: LoadCoin },
  { path: AppConst.LOAD_COIN_URL + '/redirect', component: RedirectLoadCoin },
  { path: AppConst.USER_PROFILE_URL, component: UserProfile },
  { path: '/bookmark', component: BookMarkList },
  { path: '/search', component: SearchBook },

  { path: AppConst.ERROR_PAGE_403, component: ErrorPage403 },

  { path: '*', component: ErrorPage }
]

const privateRoutes = [{ path: AppConst.HOME_URL, component: Home }]

const specialRoutes = [{ path: '/book/:bookId/chapter/:chapterId', component: ChapterDetail }]
const writerRoutes = [

  { path: AppConst.WRITER_DASHBOARD_URL, component: DashBoardWriter },
  { path: AppConst.WRITER_CREATE_BOOK, component: CreateBook },
  { path: AppConst.WRITER_EDIT_BOOK_URL + ":bookId", component: BookEdit },

  {path: AppConst.WRITER_ADD_CHAPTER_URL + ':id', component: ChapterAdd},
  {path: AppConst.WRITER_EDIT_CHAPTER_URL + ':id', component: ChapterEdit},


]
export { publicRoutes, privateRoutes, specialRoutes, writerRoutes }
