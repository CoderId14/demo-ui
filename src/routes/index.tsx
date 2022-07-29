import Home from "../components/Home";
import Login from "../components/login";
import MailRedirect from "../components/mail_send";
import Register from "../components/register";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "verify", component: MailRedirect },
];

const privateRoutes = [{ path: "post", component: Home }];

export { publicRoutes, privateRoutes };
