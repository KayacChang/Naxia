import { join, dirname } from "path";
import AutoLoad from "fastify-autoload";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: { ...opts },
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: { ...opts },
  });
}
