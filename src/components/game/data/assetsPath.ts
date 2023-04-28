import { Assets } from "pixi.js";

const baseUrl = "http://localhost:3000";
export async function assetsPath() {
  const manifest = {
    bundles: [
      {
        name: "neo-slots",
        assets: [
          { name: "s1", srcs: "/Assets/neo_1.png" },
          { name: "s2", srcs: "Assets/neo_2.png" },
          { name: "s3", srcs: "Assets/neo_3.png" },
          { name: "s4", srcs: "Assets/neo_4.png" },
          { name: "s5", srcs: "Assets/neo_5.png" },
          { name: "s6", srcs: "Assets/neo_6.png" },
          { name: "s7", srcs: "Assets/neo_7.png" },
        ],
      },
      {
        name: "background",
        assets: [{ name: "border", srcs: "/Assets/border.png" }],
      },
    ],
  };
  await Assets.init({ manifest: manifest });
}
