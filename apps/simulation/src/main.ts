import P5 from "p5";

import { mount } from "./utils";
import { Walker } from "./emulators/Walker";
import { RandomDistribution } from "./emulators/RandomDistribution";

const emulatorsPreset = {
  walker: Walker,
  randomDistribution: RandomDistribution,
} as const;

let emulator: InstanceType<(typeof emulatorsPreset)[typeof emulatorName]>;
let emulatorName = "randomDistribution" as const;
function sim(mountNode: HTMLElement) {
  new P5((sk: P5) => {
    sk.setup = () => {
      sk.createCanvas(sk.windowWidth, sk.windowHeight);
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
