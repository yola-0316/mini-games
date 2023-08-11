import P5 from "p5";

import { mount } from "./utils";
import { Walker } from "./emulators/Walker";
import { RandomDistribution } from "./emulators/RandomDistribution";
import { Gaussian } from "./emulators/Gaussian";

const emulatorsPreset = {
  walker: Walker,
  randomDistribution: RandomDistribution,
  gaussian: Gaussian,
} as const;

let emulator: InstanceType<(typeof emulatorsPreset)[typeof emulatorName]>;
let emulatorName = "gaussian" as const;
function sim(mountNode: HTMLElement) {
  new P5((sk: P5) => {
    sk.setup = () => {
      sk.createCanvas(sk.windowWidth / 1.5, sk.windowHeight / 1.5);
      sk.background(255);

      emulator = new emulatorsPreset[emulatorName](sk);
    };

    sk.draw = () => {
      emulator.update?.();
      emulator.draw();
      // console.log(sk.getTargetFrameRate());
    };
  }, mountNode);
}

mount(sim);
