import Home from "../components/Home";
import Login from "../components/login";
import Register from "../components/register";
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const privateRoutes = [{ path: "/post", component: null }];

export { publicRoutes, privateRoutes };
