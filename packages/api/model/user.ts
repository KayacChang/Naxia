import { Achievement } from "./achievement";

export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: Date;

  balance: number;
  achievements: Achievement["id"][];

  // @TODO record
}
