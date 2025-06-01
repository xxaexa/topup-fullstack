import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserResponse } from "../../types";
import {
  saveUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";

interface UserState {
  user: IUserResponse | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, initialState);
      removeUserFromLocalStorage();
      window.location.reload();
    },
    setUser: (state, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload;
      saveUserToLocalStorage(action.payload);
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
