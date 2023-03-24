import { createSlice, PayloadAction, createAsyncThunk, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./model";
import { RootState } from "../../app/store";

const API_URL = process.env.API_URL || "http://localhost:80";

interface InitialState {
    user: User;
    status: "authorized" | "unauthorized" | "loading";
    error: string | null;
    token: {token: string | null}
}

const initialState: InitialState = {
    user: {username: "", password: ""},
    status: "unauthorized",
    error: null,
    token: {token: ""}
};

export const loginUser: any = createAsyncThunk(
    "user/login",
    async (user: User) => {
        try {
            const response = await axios.post(API_URL+"/login", {'email': user.username, 'password': user.password})
            return response.data
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<User>) {
            console.log(action.payload, state);
            state.user = action.payload;
            loginUser()
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, {payload} ) => {
                state.status = "authorized";
                state.token = payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "unauthorized";
                state.error = action.error.message;
            });
    },
});

export const { login } = userReducer.actions;
export const selectUser = (state: RootState) => state.user
export default userReducer.reducer;