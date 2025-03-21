import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { IMessageThunk } from "../../types";

export const encodeMessage = createAsyncThunk<string, IMessageThunk>(
  "message/encodeMessage",
  async ({ message, password }) => {
    if (!message || !password) {
      throw new Error("Incorrect password or fill in message and password fields");
    }

    const response = await axiosApi.post("/encode", { message, password });
    return response.data.encoded;
  }
);

export const decodeMessage = createAsyncThunk<string, IMessageThunk>(
  "message/decodeMessage",
  async ({ message, password }) => {
    if (!message || !password) {
      throw new Error("Please fill in both the message and password fields.");
    }

    const response = await axiosApi.post("/decode", { message, password });
    return response.data.decoded;
  }
);