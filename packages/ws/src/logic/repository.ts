import { Connection } from "../core.ts";

import { getRepositoryByUserID } from "../api/repository.ts";

export default async function getRepository(
  connection: Connection,
  proto: any,
) {
  const repository = await getRepositoryByUserID(proto.id);

  connection.send(JSON.stringify({
    type: "repository",
    data: repository,
  }));
}
