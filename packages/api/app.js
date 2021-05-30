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

  fastify
    .ready()
    .then(() => {
      const test = {
        username: "test01",
        password: "123456",
        id: 2,
        uid: "test01",
        name: "YOYOYO1",
        level: 1,
        avatar: "2",
        balance: 500,
      };
      return fastify.addUser(test);
    })
    .then((user) => {
      const items = [
        {
          id: 1,
          count: 2,
          name: "美杜莎碎片",
          quality: "2",
          point: 50,
          img: "https://storage.googleapis.com/naxia-dev/photos/key.png",
          description: "美杜莎掉落的碎片。",
        },
        {
          id: 2,
          count: 3,
          name: "金屬塊",
          quality: "1",
          point: 150,
          img: "https://storage.googleapis.com/naxia-dev/photos/key.png",
          description: "鑄造用的材料。",
        },
      ];

      return fastify.updateItemsBelongUser(user.username, items);
    })
    .then(() => {
      const maps = [
        {
          id: 1,
          name: "初始大陸",
          status: 1,
          image_url:
            "https://storage.googleapis.com/jp_dev/photo_2021-03-22%2010.29.56.jpeg",
        },
      ];

      return Promise.all(maps.map(fastify.addMap));
    })
    .then(() => {
      const dungeons = [
        {
          id: 1,
          map_id: 1,
          name: "惡魔窟",
          img: "https://storage.googleapis.com/naxia-dev/maxresdefault.jpg",
          room_id: "EROOM_SA01_R01",
          stream_link: "https://storage.googleapis.com/naxia-dev/video.flv",
          location_x: 10,
          location_y: 50,
          is_lock: true,
          bet_options: [100, 200, 500, 1000],
          skill_options: {
            banker: {
              img:
                "https://storage.googleapis.com/naxia-dev/photos/shares/skills/%E5%AF%92%E9%9B%AA%E6%93%8A-%E5%A4%A7.png",
              name: "寒雪箭",
            },
            player: {
              img:
                "https://storage.googleapis.com/naxia-dev/photos/shares/skills/%E7%82%99%E7%84%B0%E6%93%8A-%E5%A4%A7.png",
              name: "火球術",
            },
            tie: {
              img:
                "https://storage.googleapis.com/naxia-dev/photos/shares/skills/%E5%BE%AE%E9%A3%8E%E7%A0%B4-%E5%A4%A7.png",
              name: "風刃術",
            },
            bank_pair: {
              img:
                "https://storage.googleapis.com/naxia-dev/photos/shares/skills/%E9%9B%99%E7%84%B0%E6%96%AC-%E5%A4%A7.png",
              name: "雙炎斬",
            },
            player_pair: {
              img:
                "https://storage.googleapis.com/naxia-dev/photos/shares/skills/%E9%9B%99%E5%AF%92%E6%96%AC-%E5%A4%A7.png",
              name: "霜寒斬",
            },
          },
          conditions: [
            {
              type: "item",
              item_name: "美杜莎碎片",
              count: 0,
              accumulate: 10,
              is_reach: false,
            },
            {
              type: "point",
              item_name: null,
              count: 600,
              accumulate: 500,
              is_reach: true,
            },
          ],
        },
      ];

      return Promise.all(dungeons.map(fastify.addDungeon));
    })
    .then(() => {
      const monsters = [
        {
          id: 1,
          name: "美杜莎",
          spine: "https://storage.googleapis.com/naxia-dev/guaiwu1.png",
          spine_json: "https://storage.googleapis.com/naxia-dev/guaiwu1.json",
          spine_atlas: "https://storage.googleapis.com/naxia-dev/guaiwu1.atlas",
          hp: 1,
        },
      ];

      return Promise.all(monsters.map(fastify.addMonster));
    });
}
