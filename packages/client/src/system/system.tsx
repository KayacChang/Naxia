import { createAction, createSlice } from "@reduxjs/toolkit";
import { Modal, SystemModal } from "components";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "system";

export const system = {
  error: createAction<string>("system/error"),
};

type UserState = {
  error?: string;
};
const initialState: UserState = {};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(system.error, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const selectSystemError = (state: RootState) => state.system.error;

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

  return <>{children}</>;
}
