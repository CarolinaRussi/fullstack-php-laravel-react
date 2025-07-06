import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

export type SolicitationStatus =
  | "pending"
  | "in_review"
  | "completed"
  | "canceled";

export interface Solicitation {
  id: number;
  type: string;
  description: string;
  status: SolicitationStatus;
  response: string | null;
  created_at: string;
}

interface SolicitationState {
  list: Solicitation[];
  loading: boolean;
  error: string | null;
}

const initialState: SolicitationState = {
  list: [],
  loading: false,
  error: null,
};

export const createSolicitation = createAsyncThunk<
  Solicitation,
  { type: string; description: string; status: "pending" },
  { rejectValue: string }
>("solicitations/create", async (data, { rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const token = state.auth.token;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/solicitations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Erro ao criar solicitação.");
    }

    return await response.json();
  } catch {
    return rejectWithValue("Erro de conexão.");
  }
});

export const fetchSolicitations = createAsyncThunk<
  Solicitation[],
  void,
  { state: RootState }
>("solicitations/fetch", async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/my-solicitations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.message || "Erro ao buscar solicitações");
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue(`Erro de conexão com o servidor: ${error}`);
  }
});

const solicitationSlice = createSlice({
  name: "solicitations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolicitations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSolicitations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSolicitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default solicitationSlice.reducer;
