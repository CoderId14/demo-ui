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

const publicRoutes = [
  { path: AppConst.LOGIN_URL, component: Login },
  { path: AppConst.REGISTER_URL, component: Register },
  { path: AppConst.VERIFY_URL, component: MailRedirect },
  { path: AppConst.OAUTH2_CALLBACK_URL, component: GoogleCallBack },
  { path: AppConst.FORGOT_PASSWORD_URL, component: ForgotPassword },
  { path: AppConst.CHANGE_PASSWORD_URL, component: ChangePasswordForm },
  { path: AppConst.REGISTER_CALLBACK_URL, component: RegisterCallback },
  { path: '/book/:id', component: BookDetail },
  { path: '/loadcoin', component: LoadCoin },
  { path: '/userProfile', component: UserProfile },
  { path: '/bookmark', component: BookMarkList },
  { path: '/search', component: SearchBook },

  { path: AppConst.ERROR_PAGE_403, component: ErrorPage403 },

  { path: '*', component: ErrorPage }
]

const privateRoutes = [{ path: AppConst.HOME_URL, component: Home }]

const specialRoutes = [{ path: '/book/:bookId/chapter/:chapterId', component: ChapterDetail }]
const adminRoutes = [
  //todo
  {
    path: AppConst.ADD_RACER_TO_GRAND_PRIX_URL,
    component: ErrorPage403
  }
]
export { publicRoutes, privateRoutes, adminRoutes, specialRoutes }
