import Grid from "@mui/material/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IMessage } from "../../../../types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  selectDecodeLoading,
  selectEncodeLoading, selectError,
  selectMessageForDecode,
  selectMessageForEncode
} from "../../messageSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { decodeMessage, encodeMessage } from "../../messageThunks.ts";

const initialState: IMessage = {
  messageForEncode: "",
  messageForDecode: "",
  password: "",
};

const MessageForm = () => {
  const [form, setForm] = useState<IMessage>(initialState);
  const dispatch = useAppDispatch();

  const encodeLoading = useAppSelector(selectEncodeLoading);
  const decodeLoading = useAppSelector(selectDecodeLoading);
  const messageForEncode = useAppSelector(selectMessageForEncode);
  const messageForDecode = useAppSelector(selectMessageForDecode);
  const error = useAppSelector(selectError);

  useEffect(() => {
    setForm((prev) => ({...prev, messageForDecode}));
  }, [messageForDecode]);

  useEffect(() => {
    setForm((prev) => ({...prev, messageForEncode}));
  }, [messageForEncode]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  const onSubmitEncode = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(encodeMessage({message: form.messageForEncode, password: form.password}));
  };

  const onSubmitDecode = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(decodeMessage({message: form.messageForDecode, password: form.password}));
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid size={{sm: 12}}>
            <TextField
              style={{width: "100%"}}
              multiline
              rows={3}
              id="messageForEncode"
              label="encode"
              name="messageForEncode"
              value={form.messageForEncode}
              onChange={onInputChange}
            />
          </Grid>

          <Grid size={{sm: 12}}>
            <TextField
              sx={{mb: 2}}
              style={{width: "100%"}}
              id="password"
              label="password"
              name="password"
              value={form.password}
              onChange={onInputChange}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={onSubmitEncode}
              disabled={encodeLoading || decodeLoading}
            >
              <ArrowDownwardIcon/>
            </Button>

            <Button
              sx={{ml: 2}}
              variant="contained"
              color="secondary"
              type="submit"
              onClick={onSubmitDecode}
              disabled={encodeLoading || decodeLoading}
            >
              <ArrowUpwardIcon/>
            </Button>

            {error && <Typography color="error" sx={{mt: 2}}>{error}</Typography>}

          </Grid>

          <Grid size={{sm: 12}}>
            <TextField
              style={{width: "100%"}}
              multiline rows={3}
              id="messageForDecode"
              label="decode"
              name="messageForDecode"
              value={form.messageForDecode}
              onChange={onInputChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default MessageForm;