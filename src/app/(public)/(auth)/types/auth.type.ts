import { JwtPayload } from "jwt-decode";

export type LoginType = {
  username: string;
  password: string;
};

export type LoginResponseType = {
  access_token: string;
};

export interface CustomJwtPayload extends JwtPayload {
  username?: string;
}
