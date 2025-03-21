import Grid from "@mui/material/Grid2";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Message } from "../../types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const initialState: Message = {
  messageForEncode: "",
  messageForDecode: "",
  password: "",
};

const MessageForm = () => {
  const [form, setForm] = useState<Message>(initialState);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}));
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid container justify-content="space-between" alignItems="center">

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
              type="submit">
              <ArrowDownwardIcon/>
            </Button>

            <Button
              sx={{ml: 2}}
              variant="contained"
              color="secondary"
              type="submit">
              <ArrowUpwardIcon/>
            </Button>
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