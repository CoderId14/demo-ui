import ChangePasswordForm from "../components/change_password";
import ForgotPassword from "../components/forgot_password";
import Home from "../components/Home";
import Login from "../components/login";
import MailRedirect from "../components/mail_send";
import GoogleCallBack from "../components/oauth_callback";
import Register from "../components/register";
import RegisterCallback from "../components/register_callback";
import Success from "../components/toastify/success";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/verify", component: MailRedirect },
  { path: "/oauth2/callback", component: GoogleCallBack },
  { path: "/forgot", component: ForgotPassword },
  { path: "/change-password", component: ChangePasswordForm },
  { path: "/register/callback", component: RegisterCallback },
];

const privateRoutes = [{ path: "post", component: Home }];

export { publicRoutes, privateRoutes };
