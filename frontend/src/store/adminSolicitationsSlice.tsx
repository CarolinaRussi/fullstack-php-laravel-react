import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from ".";
import type { Solicitation } from "./solicitationSlice";

export const updateSolicitation = createAsyncThunk<
  Solicitation,
  { id: number; status: string; response: string },
  { state: RootState }
>("adminSolicitations/update", async (payload, thunkAPI) => {
  const { id, status, response } = payload;
  const state = thunkAPI.getState();
  const token = state.auth.token;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/solicitations/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ status, response }),
      }
    );

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Erro ao atualizar solicitação");
    }

    const updated = (await res.json()) as Solicitation;
    return updated;
  } catch (err: unknown) {
    let message = "Erro ao atualizar solicitação";
    if (err instanceof Error) {
      message = err.message;
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchAllSolicitations = createAsyncThunk<
  Solicitation[],
  void,
  { state: RootState }
>("admin/fetchAll", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/solicitations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return rejectWithValue(error.message || "Erro ao buscar solicitações");
    }

    return await res.json();
  } catch {
    return rejectWithValue("Erro de conexão");
  }
});

interface AdminSolicitationsState {
  data: Solicitation[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminSolicitationsState = {
  data: [],
  loading: false,
  error: null,
};

const adminSolicitationsSlice = createSlice({
  name: "adminSolicitations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllSolicitations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSolicitations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllSolicitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSolicitation.fulfilled, (state, action) => {
        const index = state.data.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default adminSolicitationsSlice.reducer;
