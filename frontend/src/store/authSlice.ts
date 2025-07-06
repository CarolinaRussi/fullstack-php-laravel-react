import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userType: "admin" | "student" | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userType: null,
  loading: false,
  error: null,
};

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  user_type: "admin" | "student";
}

interface RegisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
    user_type: "admin" | "student";
  };
  token: string;
}

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      const detailedError =
        errorData?.errors?.email?.[0] ||
        errorData.message ||
        "Erro ao registrar";

      return rejectWithValue(detailedError);
    }

    const data: RegisterResponse = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(`Erro: ${error}`);
  }
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Erro ao fazer login");
      }

      const data: RegisterResponse = await response.json();
      return data;
    } catch {
      return rejectWithValue("Erro na conexão");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ token: string; userType: "admin" | "student" }>
    ) {
      state.token = action.payload.token;
      state.userType = action.payload.userType;
    },
    logout(state) {
      state.token = null;
      state.userType = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userType = action.payload.user.user_type;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro desconhecido";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userType = action.payload.user.user_type;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
