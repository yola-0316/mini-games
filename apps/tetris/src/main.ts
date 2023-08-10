import P5 from "p5";
import { Tetris } from "./tetris";

const s = (sk: P5) => {
  let tetris: Tetris;

  sk.setup = () => {
    tetris = new Tetris(sk);
  };

  sk.draw = () => {
    tetris.update();
    tetris.draw();
    console.log(sk.getTargetFrameRate());
  };
};

const container = document.createElement("div");
container.id = "tetris";
new P5(s, container);

const mount = document.getElementById("app");
if (mount) {
  mount.appendChild(container);
} else {
  document.body.appendChild(container);
}
