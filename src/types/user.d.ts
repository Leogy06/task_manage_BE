import { z } from "zod";

export type UserTypes = {
  id: string;
  given_name: string;
  family_name: string;
  middle_name: string;
  suffix?: string;
  username: string;
  password: string;
};
