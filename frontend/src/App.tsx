import "./App.css";
import {Route, Routes} from "react-router-dom";
import { Container, CssBaseline, Typography } from "@mui/material";
import Message from "./features/message/Message.tsx";

const App = () => {

  return (
    <>
      <CssBaseline/>
      <main>
        <Container maxWidth='xl' sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<Message/>}/>
            <Route path="/products" element={<Message/>}/>
            <Route path="*" element={<Typography variant='h4'>Not found page</Typography>}/>
          </Routes>
        </Container>
      </main>
    </>
  )
};

export default App
