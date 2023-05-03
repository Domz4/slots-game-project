import { Assets } from "pixi.js";
import urlJoin from "url-join";

const baseUrl = "http://localhost:3000";
export async function assetsPath() {
  const manifest = {
    bundles: [
      {
        name: "neo-slots",
        assets: [
          { name: "s1", srcs: urlJoin(baseUrl, "/assets/neo_4.png") },
          { name: "s2", srcs: urlJoin(baseUrl, "/assets/neo_3.png") },
          { name: "s3", srcs: urlJoin(baseUrl, "/assets/neo_6.png") },
          { name: "s4", srcs: urlJoin(baseUrl, "/assets/neo_5.png") },
          { name: "s5", srcs: urlJoin(baseUrl, "/assets/neo_1.png") },
          { name: "s6", srcs: urlJoin(baseUrl, "/assets/neo_7.png") },
          { name: "s7", srcs: urlJoin(baseUrl, "/assets/neo_2.png") },
        ],
      },
      {
        name: "ui",
        assets: [
          { name: "border", srcs: urlJoin(baseUrl, "/assets/border.png") },
          { name: "addBet", srcs: urlJoin(baseUrl, "/assets/add.svg") },
          { name: "subBet", srcs: urlJoin(baseUrl, "/assets/sub.svg") },
        ],
      },
    ],
  };
  await Assets.init({ manifest: manifest });
}
