import ChangePasswordForm from "@/components/change_password";
import ForgotPassword from "@/components/forgot_password";
import Home from "@/components/Home";
import Login from "@/pages/Login";
import MailRedirect from "@/components/mail_send";
import GoogleCallBack from "@/components/oauth_callback";
import Register from "@/pages/Register";
import RegisterCallback from "@/components/register/register_callback";

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/verify", component: MailRedirect },
  { path: "/oauth2/callback", component: GoogleCallBack },
  { path: "/forgot", component: ForgotPassword },
  { path: "/change-password", component: ChangePasswordForm },
  { path: "/register/callback", component: RegisterCallback },
];

const privateRoutes = [{ path: "/", component: Home }];

export { publicRoutes, privateRoutes };
