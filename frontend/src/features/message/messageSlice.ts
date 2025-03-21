import { createSlice } from "@reduxjs/toolkit";
import { decodeMessage, encodeMessage } from "./messageThunks.ts";
import { RootState } from "../../app/store.ts";

interface IMessageState {
  messageForEncode: string;
  messageForDecode: string;
  encodeLoading: boolean;
  decodeLoading: boolean;
  error: null | string;
}

const initialState: IMessageState = {
  messageForEncode: "",
  messageForDecode: "",
  encodeLoading: false,
  decodeLoading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(encodeMessage.pending, (state) => {
        state.encodeLoading = true;
        state.error = null;
      })
      .addCase(encodeMessage.fulfilled, (state, {payload: messageForDecode}) => {
        state.messageForDecode = messageForDecode;
        state.encodeLoading = false;
      })
      .addCase(encodeMessage.rejected, (state) => {
        state.encodeLoading = false;
        state.error = "failed decode";
        state.messageForDecode = '';
      })

      .addCase(decodeMessage.pending, (state) => {
        state.decodeLoading = true;
        state.error = null;
      })
      .addCase(decodeMessage.fulfilled, (state, {payload: messageForEncode}) => {
        state.messageForEncode = messageForEncode;
        state.decodeLoading = false;
      })
      .addCase(decodeMessage.rejected, (state) => {
        state.decodeLoading = false;
        state.error = "failed encode";
        state.messageForEncode = "";
      });
  }
});

export const selectMessageForEncode = (state: RootState) => state.message.messageForEncode;
export const selectMessageForDecode = (state: RootState) => state.message.messageForDecode;
export const selectEncodeLoading = (state: RootState) => state.message.encodeLoading;
export const selectDecodeLoading = (state: RootState) => state.message.decodeLoading;
export const selectError = (state: RootState) => state.message.error;

export const messageReducer = messageSlice.reducer;
