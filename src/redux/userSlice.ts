import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { forgotPasswords } from "./apiRequest";

interface forgotPasswordInitialState {
  email: string | null;
  token: string | null;
  message?: string;
  error: boolean;
}

interface sendMailRecoveryPayload {
  email: string;
  token: string;
}

const forgotPasswordInitialState: forgotPasswordInitialState = {
  email: null,
  token: null,
  message: "",
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    forgotPassword: forgotPasswordInitialState,
  },
  reducers: {
    setEmail: (state: any, action: PayloadAction<string>) => {
      state.forgotPassword.email = action.payload;
    },

    sendMailRecovery: (
      state: any,
      action: PayloadAction<sendMailRecoveryPayload>,
    ) => {
      state.forgotPassword.email = action.payload.email;
      state.forgotPassword.token = action.payload.token;
      state.forgotPassword.error = false;
    },
    afterChangePassword: (state: any) => {
      state.forgotPassword.email = null;
      state.forgotPassword.token = null;
      state.forgotPassword.error = false;
    },
  },
});

export const { setEmail, sendMailRecovery, afterChangePassword } =
  userSlice.actions;

export default userSlice.reducer;
