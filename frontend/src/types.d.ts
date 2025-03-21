export interface IMessage {
  messageForEncode: string;
  messageForDecode: string;
  password: string;
}

interface IMessageThunk {
  message: string;
  password: string;
}