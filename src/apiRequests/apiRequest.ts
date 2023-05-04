// import axios, {  } from 'axios'
// import { Dispatch } from 'redux'
// import { getPostsFailed, getPostsStart } from '../redux/postSlice'

// const baseURL = 'http://localhost:8080'
// const LOGIN_URL = '/api/auth/login'
// const REGISTER_URL = '/api/auth/register'
// const POST_URL = '/api/post'
// const LOGOUT_URL = '/api/auth/logout'

// type UserRegister = {
//   username: string
//   password: string
//   email: string
// }
// type UserLogin = {
//   username: string
//   password: string
//   accessToken?: string
// }

// type User = {
//   username: string
//   accessToken?: string
// }
// interface UserSliceState {
//   user: User | undefined
//   isFetching: boolean
//   error: boolean
//   message: string
// }

// interface UserLoginSliceState {
//   user: UserLogin | undefined
//   isFetching: boolean
//   error: boolean
//   message: string
// }

// interface sendMailRecoveryPayload {
//   email: string
//   token: string
// }

// // const showSuccessToast = (message: any) => {
// //   toast.success(message, {
// //     data: {
// //       title: "Success toast",
// //       text: "This is a success message",
// //     },
// //   });
// // };

// // interface IChangePassword {
// //   usernameOrEmail: string;
// //   password: string;
// //   token: string;
// // }

// // export const forgotPasswords = async (
// //   usernameOrEmail: string,
// //   dispatch: Dispatch<AnyAction>,
// //   navigate: NavigateFunction,
// // ) => {
// //   try {
// //     let email = await axios.get(baseURL + "/api/user", {
// //       params: {
// //         usernameOrEmail: usernameOrEmail,
// //       },
// //     });
// //     dispatch(setEmail(email.data.responseData));
// //     navigate("/verify");
// //     sendMailForgotPassword(email.data.responseData, dispatch, navigate);
// //   } catch (error: any) {
// //     console.log(error.response.data.error + " adasd");
// //   }
// // };

// // export const loginUserWithGoogle = async (
// //   accessToken: any,
// //   dispatch: Dispatch<AnyAction>,
// //   navigate: NavigateFunction,
// // ) => {
// //   dispatch(loginStart());
// //   try {
// //     let res = await axios.get(baseURL + "/api/user/current-user", {
// //       headers: { Authorization: `Bearer ${accessToken}` },
// //     });
// //     console.log("login with google");
// //     let user: UserLogin = {
// //       username: res.data.responseData,
// //       password: "",
// //       accessToken: accessToken,
// //     };

// //     let userSlice: UserLoginSliceState = {
// //       user: user,
// //       isFetching: false,
// //       error: false,
// //       message: "Login success",
// //     };
// //     console.log("userSlice: ", userSlice);
// //     dispatch(loginSuccess(userSlice));
// //     navigate("/");
// //     return res;
// //   } catch (error) {
// //     dispatch(loginFailed);
// //   }
// // };

// export const getAllPosts = async (accessToken: string, dispatch: Dispatch) => {
//   dispatch(getPostsStart())

//   try {
//     const res = await axios.get(baseURL + POST_URL, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     })
//   } catch (error) {
//     dispatch(getPostsFailed())
//   }
// }
