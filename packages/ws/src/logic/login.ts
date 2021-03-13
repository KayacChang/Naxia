import { Connection } from "../core.ts";

import { getUserByID } from "../api/user.ts";

export default async function login(connection: Connection, proto: any) {
  const user = await getUserByID(proto.id);

  if (!user) {
    connection.send(JSON.stringify({
      type: "error",
      error: `User not found by this user id ${proto.id}`,
    }));

    return;
  }

  connection.send(JSON.stringify({
    type: "user",
    data: user,
  }));
}
