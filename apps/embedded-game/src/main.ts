import { game } from "./games/demo";

function mount(node: HTMLElement) {
  const mountPoint = document.getElementById("app");
  if (mountPoint) {
    mountPoint.appendChild(node);
  } else {
    document.body.appendChild(node);
  }
}

mount(game());
