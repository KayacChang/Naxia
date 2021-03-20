import { Connection } from "../core.ts";

import { getAllArea } from "../api/area.ts";

export default async (connection: Connection, proto: any) => {
  const areas = await getAllArea();

  if (!areas) {
    connection.send(JSON.stringify({
      type: "error",
      error: `Areas are empty.`,
    }));

    return;
  }

  connection.send(JSON.stringify({
    type: "area",
    data: areas,
  }));
};
