import { setupControls } from './controls';
import { postitionReticle, setupAim } from './controls/aim';
import { initFirebase } from './core/firebase';
import { renderer, setupRenderer } from './core/renderer';
import { updateTimeDelta } from './core/time';
import { RESET, transmit } from './events/event_manager';
import { setupPointerHandler } from './events/pointer';
import { setupResizeHandler } from './events/resize';
import { setupBoatAsync, updateBoat } from './scene/boat';
import { setupBobberAsync, updateBobber } from './scene/bobber';
import { camera, setupCamera, updateOrbitControls } from './scene/camera';
import { updateDebug } from './scene/debug_orbs';
import { setupFishAsync, updateFish } from './scene/fish';
import { setupFishermanAsync, updateFisherman } from './scene/fisherman';
import { setupFishingLineAsync, updateFishingLine } from './scene/fishing_line';
import { setupLights } from './scene/lights';
import { rootScene, initScene } from './scene/scene';
import { setupSky } from './scene/sky';
import { setupWater, updateWater } from './scene/water';
import { setupUI, updateUI } from './ui';
import { setupStats, updateStats } from './ui/stats';

import '/assets/styles/main.scss';

main().catch((e: Error) => {
  console.error(e);
});

async function main() {
  initFirebase();
  initScene();
  await loadModels();
  setup();
  run();
}

async function loadModels() {
  await Promise.all([
    setupBoatAsync(),
    setupFishermanAsync(),
    setupFishingLineAsync(),
    setupBobberAsync(),
    setupFishAsync(),
  ]);
}

function setup() {
  setupRenderer();
  setupCamera();
  setupResizeHandler();
  setupPointerHandler();
  setupAim();
  setupControls();
  setupStats();
  setupSky();
  setupWater();
  setupLights();
  setupUI();

  transmit(RESET);
}

function run() {
  requestAnimationFrame(run);
  updateTimeDelta();
  updateStats();
  updateOrbitControls();
  updateWater();
  updateBoat();
  updateFisherman();
  updateFishingLine();
  updateBobber();
  updateFish();
  postitionReticle();
  updateUI();

  updateDebug();

  renderer.render(rootScene, camera);
}
