import { createAction, createSlice } from "@reduxjs/toolkit";
import { Modal, SystemModal, BusyLoading } from "components";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "system";

export const system = {
  error: createAction<string>("system/error"),
  loading: createAction<boolean>("system/loading"),
};

type UserState = {
  error?: string;
  loading: boolean;
};
const initialState: UserState = {
  loading: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(system.error, (state, action) => {
      state.error = action.payload;
    })
    builder.addCase(system.loading, (state, action) => {
      state.loading = action.payload;
    });
  },
});

export const selectSystemError = (state: RootState) => state.system.error;
export const selectSystemLoading = (state: RootState) => state.system.loading;

export default systemSlice.reducer;

type ErrorBoundaryProps = {
  children: ReactNode;
};
export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const error = useSelector(selectSystemError);

  if (error) {
    return (
      <Modal>
        <SystemModal
          title="系統錯誤"
          button="回到大廳"
          onConfirm={() => window.location.replace("/")}
          className="justify-center items-center text-white text-lg"
        >
          <p>{String(error)}</p>
        </SystemModal>
      </Modal>
    );
  }

  return <>
    <BusyLoading />
    {children}
  </>;
}
