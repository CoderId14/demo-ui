import Home from "../components/Home";
import Login from "../components/login";
import MailRedirect from "../components/mail_send";
import GoogleCallBack from "../components/oauth_callback";
import Register from "../components/register";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/verify", component: MailRedirect },
  { path: "/oauth2/callback", component: GoogleCallBack },
];

const privateRoutes = [{ path: "post", component: Home }];

export { publicRoutes, privateRoutes };
