import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/store";

const Home = () => {
  const login = useSelector(selectAuth).login;
  const user = login?.user ? login.user : null;

  return (
    <>
      <h1>Hello {user && user.username}</h1>
    </>
  );
};

export default Home;
