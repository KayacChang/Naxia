import { Connection } from "../core.ts";

import { getUserByID } from "../api/user.ts";

export default async function login(connection: Connection, proto: any) {
  const user = await getUserByID(proto.id);

  if (!user) {
    connection.send(JSON.stringify({
      type: "error",
      error: `User ${proto.id} not existed`,
    }));

    return;
  }

  connection.send(JSON.stringify({
    type: "user",
    data: user,
  }));
}
