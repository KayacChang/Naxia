import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

async function post(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

interface LoginError {
  title: string;
  detail: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

type Config = {
  rejectValue: LoginError;
};

const login = createAsyncThunk<string, LoginRequest, Config>(
  "user/login",
  async (request, { rejectWithValue }) => {
    const { data, errors } = await post("/api/token", request);

    if (errors) {
      return rejectWithValue(errors);
    }

    return data;
  }
);

const slice = createSlice({
  name: "user",
  initialState: {
    token: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload;
    });
  },
});

const reducer = slice.reducer;
const actions = { ...slice.actions, login };
export { reducer, actions };
