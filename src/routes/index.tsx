import ChangePasswordForm from "@/components/change_password";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import MailRedirect from "@/components/mail_send";
import GoogleCallBack from "@/components/oauth_callback";
import Register from "@/pages/Register";
import RegisterCallback from "@/components/register/register_callback";
import { AppConst } from "@/app-const";
import RacerManage from "@/pages/f1/RacerManage";
import RacerRanking from "@/pages/f1/Ranking/RacerRanking";
import ErrorPage from "@/components/ErrorPage";
import ErrorPage403 from "@/components/ErrorPage/Page_403";
import GrandPrixManage from "@/pages/f1/GrandPrixManage";

const publicRoutes = [
  { path: AppConst.LOGIN_URL, component: Login },
  { path: AppConst.REGISTER_URL, component: Register },
  { path: AppConst.VERIFY_URL, component: MailRedirect },
  { path: AppConst.OAUTH2_CALLBACK_URL, component: GoogleCallBack },
  { path: AppConst.FORGOT_PASSWORD_URL, component: ForgotPassword },
  { path: AppConst.CHANGE_PASSWORD_URL, component: ChangePasswordForm },
  { path: AppConst.REGISTER_CALLBACK_URL, component: RegisterCallback },
  { path: AppConst.ERROR_PAGE_403, component: ErrorPage403 },
  { path: AppConst.RACER_RANKING_URL, component: RacerRanking },
  { path: "*", component: ErrorPage },
];

const privateRoutes = [{ path: AppConst.HOME_URL, component: Home }];

const adminRoutes = [
  { path: AppConst.HOME_ADMIN_URL, component: RacerManage },
  { path: AppConst.GRAND_PRIX_URL, component: GrandPrixManage },
];
export { publicRoutes, privateRoutes, adminRoutes };
