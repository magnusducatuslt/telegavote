export type TokenChangePassword = {
  password: string;
  username: string;
  email: string;
  origin: string;
  tokenExpiredAt: number;
  intentionForChange: string;
  sender?: string;
};
export type TokenRegistration = {
  password: string;
  username: string;
  email: string;
  origin: string;
  tokenExpiredAt: number;
};
export type TokenConfirm = {
  id: string;
  username: string;
  email: string;
  password: string;
  tokenExpiredAt: number;
};
export type TokenSendInvite = {
  password: string;
  mailReciever: string;
  sender: string;
  origin: string;
  tokenExpiredAt: number;
};
