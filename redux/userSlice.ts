import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ActionPayload {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

const initialState = {
  id: "",
  username: "",
  email: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ActionPayload>) => {
      return { ...state, ...action.payload };
    },
    delUser: () => {
      return initialState;
    },
  },
});

export const { setUser, delUser } = userSlice.actions;
export default userSlice.reducer
