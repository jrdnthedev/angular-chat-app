export type Chat = { user: string; message: string; timestamp: Date };
export type User = {
  username: string;
  password: string;
  isLoggedIn: boolean;
  token: string;
};

export type Sender = {
  username: string;
  message: string;
  room: string;
  timestamp: Date;
};
