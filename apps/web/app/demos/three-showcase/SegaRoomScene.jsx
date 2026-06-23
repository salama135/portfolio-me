'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

// ─── CRT shader (scanlines + noise + vignette + color bleed) ───────────────
const CRT_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const CRT_FRAG = `
  uniform sampler2D tDiffuse;
  uniform float time;
  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;

    // Barrel distortion
    vec2 cc = uv - 0.5;
    float dist = dot(cc, cc);
    uv += cc * (0.18) * dist;

    // Out of bounds = black
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    // Color aberration
    float aberr = 0.003;
    vec4 col;
    col.r = texture2D(tDiffuse, vec2(uv.x + aberr, uv.y)).r;
    col.g = texture2D(tDiffuse, uv).g;
    col.b = texture2D(tDiffuse, vec2(uv.x - aberr, uv.y)).b;
    col.a = 1.0;

    // Scanlines
    float scanline = sin(uv.y * 600.0) * 0.06;
    col.rgb -= scanline;

    // Noise
    col.rgb += (rand(uv + time * 0.01) - 0.5) * 0.04;

    // Vignette
    vec2 vig = uv * (1.0 - uv.yx);
    float vigFactor = pow(vig.x * vig.y * 18.0, 0.35);
    col.rgb *= vigFactor;

    // Phosphor glow tint
    col.rgb *= vec3(0.95, 1.05, 0.95);

    gl_FragColor = col;
  }
`;

// ─── Static noise shader for no-signal screen ─────────────────────────────
const STATIC_FRAG = `
  uniform float time;
  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy + time * 0.3, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float noise = rand(vUv * vec2(64.0, 48.0));
    float v = noise * 0.9 + 0.05;
    gl_FragColor = vec4(v, v, v, 1.0);
  }
`;

// ─── Game definitions ──────────────────────────────────────────────────────
const GAMES = [
  {
    id: 'rtype',
    title: 'R-Type',
    spineColor: 0x1a3a6e,
    caseColor: 0xf0f0f0,
    labelColor: 0x1a3a6e,
    screenColor: 0x0a1a3a,
    frontImg: 'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/5ecfc9d4-03f4-4074-8d4f-e4c634ba3605/preview',
    backImg:  'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/130b3e07-f066-440f-8388-02774bf54cd6/preview',
    cartImg:  'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/3c85ce2e-0c82-4e44-88a3-aa5ae916f740/preview',
  },
  {
    id: 'rtype2',
    title: 'R-Type',
    spineColor: 0x1a3a6e,
    caseColor: 0xf0f0f0,
    labelColor: 0x1a3a6e,
    screenColor: 0x0a1a3a,
    frontImg: 'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/5ecfc9d4-03f4-4074-8d4f-e4c634ba3605/preview',
    backImg:  'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/130b3e07-f066-440f-8388-02774bf54cd6/preview',
    cartImg:  'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/3c85ce2e-0c82-4e44-88a3-aa5ae916f740/preview',
  },
  {
    id: 'rtype3',
    title: 'R-Type',
    spineColor: 0x1a3a6e,
    caseColor: 0xf0f0f0,
    labelColor: 0x1a3a6e,
    screenColor: 0x0a1a3a,
    frontImg: 'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/5ecfc9d4-03f4-4074-8d4f-e4c634ba3605/preview',
    backImg:  'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/130b3e07-f066-440f-8388-02774bf54cd6/preview',
    cartImg:  'https://claude.ai/api/f1130d24-aa19-4475-a2c5-635598234c6d/files/3c85ce2e-0c82-4e44-88a3-aa5ae916f740/preview',
  },
];

// ─── Camera hotspot positions ──────────────────────────────────────────────
const HOTSPOTS = {
  tv:    { pos: new THREE.Vector3(0, 0.6, 3.2),   target: new THREE.Vector3(0, 0.5, 0) },
  shelf: { pos: new THREE.Vector3(2.4, 0.9, 2.8), target: new THREE.Vector3(2.4, 0.6, 0) },
};

// ─── Helper: load texture ──────────────────────────────────────────────────
function loadTex(url, loader) {
  return new Promise((res) => {
    loader.load(url, res, undefined, () => {
      // fallback placeholder
      const canvas = document.createElement('canvas');
      canvas.width = 4; canvas.height = 4;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#334';
      ctx.fillRect(0, 0, 4, 4);
      const t = new THREE.CanvasTexture(canvas);
      res(t);
    });
  });
}

// ─── Build game case mesh ──────────────────────────────────────────────────
async function buildGameCase(game, loader) {
  const group = new THREE.Group();
  group.userData.game = game;

  const [frontTex, backTex] = await Promise.all([
    loadTex(game.frontImg, loader),
    loadTex(game.backImg, loader),
  ]);

  // Case body  W=0.32  H=0.44  D=0.04
  const W = 0.32, H = 0.44, D = 0.04;

  const materials = [
    new THREE.MeshStandardMaterial({ color: game.spineColor, roughness: 0.7, metalness: 0.1 }), // +X spine
    new THREE.MeshStandardMaterial({ color: game.spineColor, roughness: 0.7, metalness: 0.1 }), // -X
    new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 }), // +Y top
    new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 }), // -Y bottom
    new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.6 }),   // +Z front
    new THREE.MeshStandardMaterial({ map: backTex,  roughness: 0.6 }),   // -Z back
  ];

  const geo = new THREE.BoxGeometry(W, H, D);
  const mesh = new THREE.Mesh(geo, materials);
  mesh.castShadow = true;
  group.add(mesh);
  group.userData.caseMesh = mesh;

  return group;
}

// ─── Build cartridge mesh ──────────────────────────────────────────────────
async function buildCartridge(game, loader) {
  const group = new THREE.Group();
  const cartTex = await loadTex(game.cartImg, loader);

  const W = 0.22, H = 0.26, D = 0.03;
  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }),
    new THREE.MeshStandardMaterial({ map: cartTex, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }),
  ];

  const geo = new THREE.BoxGeometry(W, H, D);
  const mesh = new THREE.Mesh(geo, materials);
  mesh.castShadow = true;
  group.add(mesh);
  return group;
}

// ─── Build Sega Master System console ─────────────────────────────────────
function buildConsole() {
  const group = new THREE.Group();

  // Main body
  const bodyGeo = new THREE.BoxGeometry(0.9, 0.12, 0.55);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.7, metalness: 0.2 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Red accent stripe
  const stripeGeo = new THREE.BoxGeometry(0.9, 0.015, 0.03);
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xcc2211, roughness: 0.5, metalness: 0.3 });
  const stripe = new THREE.Mesh(stripeGeo, stripeMat);
  stripe.position.set(0, 0.055, -0.2);
  group.add(stripe);

  // Cartridge slot
  const slotGeo = new THREE.BoxGeometry(0.24, 0.04, 0.08);
  const slotMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  const slot = new THREE.Mesh(slotGeo, slotMat);
  slot.position.set(0.15, 0.08, -0.08);
  group.add(slot);

  // Power button
  const btnGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.015, 12);
  const btnMat = new THREE.MeshStandardMaterial({ color: 0xcc2211, roughness: 0.4, metalness: 0.4 });
  const btn = new THREE.Mesh(btnGeo, btnMat);
  btn.position.set(-0.3, 0.065, 0.0);
  btn.rotation.x = Math.PI / 2;
  group.add(btn);

  // Reset button
  const rBtnGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.012, 12);
  const rBtnMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5 });
  const rBtn = new THREE.Mesh(rBtnGeo, rBtnMat);
  rBtn.position.set(-0.22, 0.065, 0.0);
  rBtn.rotation.x = Math.PI / 2;
  group.add(rBtn);

  // SEGA lettering panel (raised)
  const panelGeo = new THREE.BoxGeometry(0.28, 0.008, 0.12);
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  panel.position.set(0.22, 0.064, 0.15);
  group.add(panel);

  group.userData.cartridgeSlotPos = new THREE.Vector3(0.15, 0.14, -0.08);
  return group;
}

// ─── Build controller ──────────────────────────────────────────────────────
function buildController() {
  const group = new THREE.Group();

  // Body
  const bodyGeo = new THREE.BoxGeometry(0.32, 0.025, 0.18);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7, metalness: 0.1 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  group.add(body);

  // D-pad
  const dpadMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.6 });
  const dH = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.008, 0.018), dpadMat);
  const dV = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.009, 0.055), dpadMat);
  dH.position.set(-0.1, 0.016, 0.0);
  dV.position.set(-0.1, 0.016, 0.0);
  group.add(dH, dV);

  // Buttons
  const btn1Geo = new THREE.CylinderGeometry(0.014, 0.014, 0.01, 12);
  const btn1Mat = new THREE.MeshStandardMaterial({ color: 0xcc2211, roughness: 0.4, metalness: 0.3 });
  const btn1 = new THREE.Mesh(btn1Geo, btn1Mat);
  btn1.position.set(0.1, 0.018, -0.03);
  group.add(btn1);

  const btn2Geo = new THREE.CylinderGeometry(0.014, 0.014, 0.01, 12);
  const btn2 = new THREE.Mesh(btn2Geo, btn1Mat.clone());
  btn2.position.set(0.13, 0.018, 0.02);
  group.add(btn2);

  // Start/Pause buttons
  const sBtnGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.008, 12);
  const sBtnMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.5 });
  [-0.02, 0.02].forEach((x) => {
    const sb = new THREE.Mesh(sBtnGeo, sBtnMat);
    sb.position.set(x, 0.017, 0.0);
    group.add(sb);
  });

  return group;
}

// ─── Build TV ─────────────────────────────────────────────────────────────
function buildTV(screenRenderTarget) {
  const group = new THREE.Group();

  // TV body
  const tvGeo = new THREE.BoxGeometry(1.1, 0.9, 0.6);
  const tvMat = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.8, metalness: 0.15 });
  const tvBody = new THREE.Mesh(tvGeo, tvMat);
  tvBody.castShadow = true;
  tvBody.receiveShadow = true;
  group.add(tvBody);

  // Bezel
  const bezelGeo = new THREE.BoxGeometry(0.88, 0.72, 0.05);
  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
  const bezel = new THREE.Mesh(bezelGeo, bezelMat);
  bezel.position.set(0, 0.04, 0.28);
  group.add(bezel);

  // Screen (shows render target)
  const screenGeo = new THREE.PlaneGeometry(0.78, 0.62);
  const screenMat = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: screenRenderTarget.texture },
      time: { value: 0 },
    },
    vertexShader: CRT_VERT,
    fragmentShader: CRT_FRAG,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.04, 0.31);
  group.add(screen);
  group.userData.screenMesh = screen;
  group.userData.screenMat = screenMat;

  // Speaker grille (dots)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      const dotGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.01, 8);
      const dotMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.rotation.x = Math.PI / 2;
      dot.position.set(-0.3 + c * 0.04, -0.28 + r * 0.04, 0.31);
      group.add(dot);
    }
  }

  // Power LED
  const ledGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.01, 8);
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x00ff44, emissive: 0x00ff44, emissiveIntensity: 1.5, roughness: 0.3
  });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.rotation.x = Math.PI / 2;
  led.position.set(0.38, -0.35, 0.31);
  group.add(led);

  // Legs
  [-0.38, 0.38].forEach((x) => {
    const legGeo = new THREE.BoxGeometry(0.12, 0.06, 0.35);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(x, -0.48, 0.05);
    group.add(leg);
  });

  return group;
}

// ─── Build shelf ──────────────────────────────────────────────────────────
function buildShelf() {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x8b6343, roughness: 0.8, metalness: 0.05 });

  // Main shelf plank
  const shelfGeo = new THREE.BoxGeometry(1.4, 0.04, 0.22);
  const shelf = new THREE.Mesh(shelfGeo, mat);
  shelf.receiveShadow = true;
  shelf.castShadow = true;
  group.add(shelf);

  // Back wall support
  const backGeo = new THREE.BoxGeometry(1.4, 0.3, 0.02);
  const back = new THREE.Mesh(backGeo, mat.clone());
  back.position.set(0, 0.17, -0.1);
  group.add(back);

  // Side brackets
  [-0.65, 0.65].forEach((x) => {
    const brktGeo = new THREE.BoxGeometry(0.02, 0.25, 0.2);
    const brkt = new THREE.Mesh(brktGeo, mat.clone());
    brkt.position.set(x, 0.1, 0);
    group.add(brkt);
  });

  return group;
}

// ─── Build room (floor, walls, ceiling) ───────────────────────────────────
function buildRoom() {
  const group = new THREE.Group();

  // Floor
  const floorCanvas = document.createElement('canvas');
  floorCanvas.width = 512; floorCanvas.height = 512;
  const fc = floorCanvas.getContext('2d');
  fc.fillStyle = '#8b7355';
  fc.fillRect(0, 0, 512, 512);
  // Planks
  fc.strokeStyle = '#6b5535';
  fc.lineWidth = 2;
  for (let y = 0; y < 512; y += 64) fc.strokeRect(0, y, 512, 64);
  for (let x = 0; x < 512; x += 128) fc.strokeRect(x, 0, 128, 512);
  const floorTex = new THREE.CanvasTexture(floorCanvas);
  floorTex.wrapS = THREE.RepeatWrapping;
  floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(4, 4);

  const floorGeo = new THREE.PlaneGeometry(10, 10);
  const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.9 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.5;
  floor.receiveShadow = true;
  group.add(floor);

  // Walls (wallpaper texture)
  const wallCanvas = document.createElement('canvas');
  wallCanvas.width = 512; wallCanvas.height = 512;
  const wc = wallCanvas.getContext('2d');
  wc.fillStyle = '#c4b090';
  wc.fillRect(0, 0, 512, 512);
  // Subtle stripe pattern
  wc.strokeStyle = '#b8a080';
  wc.lineWidth = 1;
  for (let y = 0; y < 512; y += 16) {
    wc.beginPath(); wc.moveTo(0, y); wc.lineTo(512, y); wc.stroke();
  }
  const wallTex = new THREE.CanvasTexture(wallCanvas);
  wallTex.wrapS = THREE.RepeatWrapping;
  wallTex.wrapT = THREE.RepeatWrapping;
  wallTex.repeat.set(3, 2);

  const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.95 });

  // Back wall
  const backWallGeo = new THREE.PlaneGeometry(10, 5);
  const backWall = new THREE.Mesh(backWallGeo, wallMat);
  backWall.position.set(0, 2, -3);
  backWall.receiveShadow = true;
  group.add(backWall);

  // Left wall
  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(8, 5), wallMat.clone());
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-3.5, 2, 0);
  group.add(leftWall);

  // Ceiling
  const ceilGeo = new THREE.PlaneGeometry(10, 10);
  const ceilMat = new THREE.MeshStandardMaterial({ color: 0xddd5c0, roughness: 1.0 });
  const ceil = new THREE.Mesh(ceilGeo, ceilMat);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.y = 4;
  group.add(ceil);

  // Baseboard
  const baseGeo = new THREE.BoxGeometry(10, 0.12, 0.05);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0xd4c4a0, roughness: 0.8 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, -0.44, -2.97);
  group.add(base);

  return group;
}

// ─── Build TV stand / entertainment unit ──────────────────────────────────
function buildTVStand() {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.8, metalness: 0.1 });

  // Main cabinet
  const cabGeo = new THREE.BoxGeometry(1.3, 0.55, 0.5);
  const cab = new THREE.Mesh(cabGeo, mat);
  cab.position.set(0, -0.275, 0);
  cab.castShadow = true;
  cab.receiveShadow = true;
  group.add(cab);

  // Door panel
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.85 });
  const doorGeo = new THREE.BoxGeometry(0.58, 0.4, 0.01);
  [-0.31, 0.31].forEach((x) => {
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(x, -0.27, 0.255);
    group.add(door);
  });

  // Door handles
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 });
  [-0.31, 0.31].forEach((x) => {
    const hGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.1, 8);
    const h = new THREE.Mesh(hGeo, handleMat);
    h.rotation.z = Math.PI / 2;
    h.position.set(x, -0.27, 0.265);
    group.add(h);
  });

  return group;
}

// ─── Animate camera along a curve ─────────────────────────────────────────
function animateCamera(camera, fromPos, fromTarget, toPos, toTarget, duration, onDone) {
  const start = performance.now();
  const fp = fromPos.clone();
  const ft = fromTarget.clone();

  function tick() {
    const t = Math.min((performance.now() - start) / duration, 1);
    // Smooth ease in-out cubic
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    camera.position.lerpVectors(fp, toPos, e);
    const ct = new THREE.Vector3().lerpVectors(ft, toTarget, e);
    camera.lookAt(ct);

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      camera.position.copy(toPos);
      camera.lookAt(toTarget);
      if (onDone) onDone();
    }
  }
  tick();
}

// ─── Main component ────────────────────────────────────────────────────────
export default function SegaRoomScene({ reducedMotion }) {
  const hostRef = useRef(null);
  const stateRef = useRef({});
  const [unsupported, setUnsupported] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState('tv');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [insertedGame, setInsertedGame] = useState(null);
  const [inspectingGame, setInspectingGame] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Inspect drag state
  const inspectDrag = useRef({ active: false, lastX: 0, lastY: 0 });

  // ── Setup scene ──
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    // WebGL check
    const probe = document.createElement('canvas');
    const glProbe = probe.getContext('webgl') || probe.getContext('experimental-webgl');
    if (!glProbe) { setUnsupported(true); return; }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1814);
    scene.fog = new THREE.Fog(0x1a1814, 8, 14);

    const camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.1, 100);
    camera.position.copy(HOTSPOTS.tv.pos);
    camera.lookAt(HOTSPOTS.tv.target);

    // Screen render target (for TV content)
    const screenRT = new THREE.WebGLRenderTarget(512, 384);
    const screenScene = new THREE.Scene();
    screenScene.background = new THREE.Color(0x000000);
    const screenCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    screenCam.position.z = 1;

    // Static noise plane (default)
    const staticMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: CRT_VERT,
      fragmentShader: STATIC_FRAG,
    });
    const staticPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), staticMat);
    screenScene.add(staticPlane);

    // Game logo plane (shown when game is inserted)
    const logoMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
    const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), logoMat);
    screenScene.add(logoPlane);

    // Lighting
    const ambient = new THREE.AmbientLight(0xfff5e0, 0.35);
    scene.add(ambient);

    // Main room light (ceiling)
    const ceilLight = new THREE.PointLight(0xfff5d0, 1.2, 12);
    ceilLight.position.set(0, 3.5, 0);
    ceilLight.castShadow = true;
    ceilLight.shadow.mapSize.set(1024, 1024);
    scene.add(ceilLight);

    // TV screen glow
    const tvGlow = new THREE.PointLight(0x44ff88, 0.6, 2.5);
    tvGlow.position.set(0, 0.5, 1.2);
    scene.add(tvGlow);

    // Warm lamp on shelf side
    const lampLight = new THREE.PointLight(0xff9944, 0.8, 4);
    lampLight.position.set(3, 1.8, -1);
    scene.add(lampLight);

    el.textContent = '';
    el.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    const s = stateRef.current;
    s.renderer = renderer;
    s.scene = scene;
    s.camera = camera;
    s.screenRT = screenRT;
    s.screenScene = screenScene;
    s.screenCam = screenCam;
    s.staticMat = staticMat;
    s.logoPlane = logoPlane;
    s.logoMat = logoMat;
    s.tvGlow = tvGlow;
    s.loader = loader;
    s.gameGroups = [];
    s.cartGroups = [];
    s.consoleGroup = null;
    s.tvGroup = null;
    s.inspectGroup = null;
    s.currentHotspot = 'tv';
    s.insertedGameId = null;
    s.clock = new THREE.Clock();

    // ── Build room ──
    const room = buildRoom();
    scene.add(room);

    // ── Build TV stand ──
    const tvStand = buildTVStand();
    tvStand.position.set(0, -0.22, -1.4);
    scene.add(tvStand);

    // ── Build TV ──
    const tvGroup = buildTV(screenRT);
    tvGroup.position.set(0, 0.75, -1.4);
    scene.add(tvGroup);
    s.tvGroup = tvGroup;

    // ── Build console ──
    const consoleGroup = buildConsole();
    consoleGroup.position.set(0, 0.02, -1.4);
    consoleGroup.rotation.y = 0.1;
    scene.add(consoleGroup);
    s.consoleGroup = consoleGroup;

    // ── Build controller ──
    const ctrl = buildController();
    ctrl.position.set(-0.5, 0.02, -1.0);
    ctrl.rotation.y = 0.3;
    scene.add(ctrl);

    // ── Build shelf ──
    const shelf = buildShelf();
    shelf.position.set(2.2, 0.6, -1.5);
    scene.add(shelf);
    s.shelf = shelf;

    // ── Build game cases ──
    const buildAllGames = async () => {
      setLoadingProgress(10);
      const casePromises = GAMES.map((g) => buildGameCase(g, loader));
      const cartPromises = GAMES.map((g) => buildCartridge(g, loader));

      const cases = await Promise.all(casePromises);
      setLoadingProgress(60);
      const carts = await Promise.all(cartPromises);
      setLoadingProgress(90);

      cases.forEach((caseGroup, i) => {
        caseGroup.position.set(
          2.2 + (i - 1) * 0.38,
          0.84,
          -1.5
        );
        caseGroup.rotation.y = 0.0;
        scene.add(caseGroup);
        s.gameGroups.push(caseGroup);
      });

      carts.forEach((cartGroup, i) => {
        cartGroup.visible = false;
        scene.add(cartGroup);
        s.cartGroups.push(cartGroup);
      });

      setLoadingProgress(100);
    };

    buildAllGames().catch(console.error);

    // ── Resize handler ──
    const resize = () => {
      const w = el.clientWidth || 640;
      const h = Math.max(300, Math.round((w * 9) / 16));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // ── Render loop ──
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = s.clock.getElapsedTime();

      if (s.staticMat) s.staticMat.uniforms.time.value = t;
      if (s.tvGroup?.userData.screenMat) s.tvGroup.userData.screenMat.uniforms.time.value = t;

      // TV glow pulse
      if (s.tvGlow) s.tvGlow.intensity = 0.5 + Math.sin(t * 2.3) * 0.08;

      // Gentle console hover
      if (s.consoleGroup) s.consoleGroup.position.y = 0.02 + Math.sin(t * 0.8) * 0.002;

      // Inspect rotation (when inspecting)
      if (s.inspectGroup && !inspectDrag.current.active && !reducedMotion) {
        s.inspectGroup.rotation.y += 0.005;
      }

      // Render screen content first
      renderer.setRenderTarget(screenRT);
      renderer.render(screenScene, screenCam);
      renderer.setRenderTarget(null);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      screenRT.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  // ── Navigate hotspot ──
  const goToHotspot = useCallback((hotspot) => {
    const s = stateRef.current;
    if (!s.camera || isTransitioning) return;
    setIsTransitioning(true);

    const from = s.camera.position.clone();
    const fromTarget = HOTSPOTS[s.currentHotspot].target.clone();

    animateCamera(
      s.camera,
      from,
      fromTarget,
      HOTSPOTS[hotspot].pos,
      HOTSPOTS[hotspot].target,
      1200,
      () => {
        s.currentHotspot = hotspot;
        setActiveHotspot(hotspot);
        setIsTransitioning(false);
      }
    );
  }, [isTransitioning]);

  // ── Insert game ──
  const insertGame = useCallback((idx) => {
    const s = stateRef.current;
    if (!s.loader) return;

    const game = GAMES[idx];
    setInsertedGame(game.id);
    s.insertedGameId = game.id;

    // Load game logo for TV screen
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(game.frontImg, (tex) => {
      if (s.logoMat) {
        s.logoMat.map = tex;
        s.logoMat.opacity = 1;
        s.logoMat.needsUpdate = true;
        // Update static plane to invisible
        if (s.staticMat) s.staticMat.uniforms.time.value = -999; // freeze static
      }
    });

    // Animate cartridge into slot
    const cartGroup = s.cartGroups[idx];
    if (cartGroup && s.consoleGroup) {
      cartGroup.visible = true;
      cartGroup.position.copy(s.gameGroups[idx].position);
      cartGroup.position.y += 0.5;

      const targetPos = s.consoleGroup.position.clone().add(
        s.consoleGroup.userData.cartridgeSlotPos || new THREE.Vector3(0.15, 0.2, -0.08)
      );

      const startPos = cartGroup.position.clone();
      const startTime = performance.now();
      const duration = 800;

      const animCart = () => {
        const t = Math.min((performance.now() - startTime) / duration, 1);
        const e = 1 - Math.pow(1 - t, 3);
        cartGroup.position.lerpVectors(startPos, targetPos, e);
        if (t < 1) requestAnimationFrame(animCart);
      };
      animCart();
    }
  }, []);

  // ── Inspect game ──
  const startInspect = useCallback((idx) => {
    const s = stateRef.current;
    if (!s.gameGroups[idx]) return;

    const game = GAMES[idx];
    setInspectingGame({ idx, game });

    // Clone the case group for inspect view
    if (s.inspectGroup) {
      s.scene.remove(s.inspectGroup);
    }

    // Create a floating inspect group in front of camera
    const inspectGroup = s.gameGroups[idx].clone();
    inspectGroup.position.set(
      HOTSPOTS.shelf.pos.x,
      HOTSPOTS.shelf.pos.y + 0.1,
      HOTSPOTS.shelf.pos.z - 1.2
    );
    inspectGroup.scale.setScalar(2.0);
    s.scene.add(inspectGroup);
    s.inspectGroup = inspectGroup;
  }, []);

  const stopInspect = useCallback(() => {
    const s = stateRef.current;
    if (s.inspectGroup) {
      s.scene.remove(s.inspectGroup);
      s.inspectGroup = null;
    }
    setInspectingGame(null);
  }, []);

  // ── Inspect drag handlers ──
  const handleInspectMouseDown = useCallback((e) => {
    inspectDrag.current = { active: true, lastX: e.clientX, lastY: e.clientY };
  }, []);

  const handleInspectMouseMove = useCallback((e) => {
    if (!inspectDrag.current.active) return;
    const s = stateRef.current;
    if (!s.inspectGroup) return;

    const dx = e.clientX - inspectDrag.current.lastX;
    const dy = e.clientY - inspectDrag.current.lastY;
    s.inspectGroup.rotation.y += dx * 0.01;
    s.inspectGroup.rotation.x += dy * 0.008;
    inspectDrag.current.lastX = e.clientX;
    inspectDrag.current.lastY = e.clientY;
  }, []);

  const handleInspectMouseUp = useCallback(() => {
    inspectDrag.current.active = false;
  }, []);

  // Touch handlers for inspect
  const handleInspectTouchStart = useCallback((e) => {
    const t = e.touches[0];
    inspectDrag.current = { active: true, lastX: t.clientX, lastY: t.clientY };
  }, []);

  const handleInspectTouchMove = useCallback((e) => {
    if (!inspectDrag.current.active) return;
    const s = stateRef.current;
    if (!s.inspectGroup) return;
    const t = e.touches[0];
    const dx = t.clientX - inspectDrag.current.lastX;
    const dy = t.clientY - inspectDrag.current.lastY;
    s.inspectGroup.rotation.y += dx * 0.01;
    s.inspectGroup.rotation.x += dy * 0.008;
    inspectDrag.current.lastX = t.clientX;
    inspectDrag.current.lastY = t.clientY;
  }, []);

  if (unsupported) {
    return (
      <div style={{ padding: '1.5rem', color: '#ccc', fontFamily: 'monospace', background: '#111', borderRadius: 8 }}>
        WebGL unavailable. Try a different browser or update your graphics drivers.
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
      {/* Viewport */}
      <div
        ref={hostRef}
        style={{ width: '100%', aspectRatio: '16/9', background: '#111', display: 'block', cursor: inspectingGame ? 'grab' : 'default' }}
        onMouseMove={handleInspectMouseMove}
        onMouseUp={handleInspectMouseUp}
        onMouseLeave={handleInspectMouseUp}
        onTouchMove={handleInspectTouchMove}
        onTouchEnd={() => { inspectDrag.current.active = false; }}
      />

      {/* Loading overlay */}
      {loadingProgress < 100 && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'monospace', gap: 12,
        }}>
          <div style={{ fontSize: 13, letterSpacing: '0.1em', color: '#aaa' }}>LOADING ASSETS</div>
          <div style={{ width: 200, height: 3, background: '#333', borderRadius: 2 }}>
            <div style={{ width: `${loadingProgress}%`, height: '100%', background: '#cc2211', borderRadius: 2, transition: 'width 0.3s' }} />
          </div>
          <div style={{ fontSize: 11, color: '#666' }}>{loadingProgress}%</div>
        </div>
      )}

      {/* Navigation arrows */}
      {loadingProgress >= 100 && !inspectingGame && (
        <div style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 16, alignItems: 'center',
        }}>
          <button
            onClick={() => goToHotspot('tv')}
            disabled={isTransitioning || activeHotspot === 'tv'}
            style={{
              background: activeHotspot === 'tv' ? 'rgba(204,34,17,0.9)' : 'rgba(0,0,0,0.75)',
              color: '#fff', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 6, padding: '8px 18px', cursor: 'pointer',
              fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.08em',
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: isTransitioning ? 0.5 : 1, transition: 'all 0.2s',
            }}
          >
            ◀ TV
          </button>

          {/* Hotspot indicator */}
          <div style={{ display: 'flex', gap: 6 }}>
            {['tv', 'shelf'].map((h) => (
              <div key={h} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: activeHotspot === h ? '#cc2211' : 'rgba(255,255,255,0.3)',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>

          <button
            onClick={() => goToHotspot('shelf')}
            disabled={isTransitioning || activeHotspot === 'shelf'}
            style={{
              background: activeHotspot === 'shelf' ? 'rgba(204,34,17,0.9)' : 'rgba(0,0,0,0.75)',
              color: '#fff', border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 6, padding: '8px 18px', cursor: 'pointer',
              fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.08em',
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: isTransitioning ? 0.5 : 1, transition: 'all 0.2s',
            }}
          >
            SHELF ▶
          </button>
        </div>
      )}

      {/* Shelf game selection UI */}
      {activeHotspot === 'shelf' && loadingProgress >= 100 && !inspectingGame && (
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 10, background: 'rgba(0,0,0,0.8)',
          padding: '10px 16px', borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          {GAMES.map((game, idx) => (
            <div key={game.id + idx} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
              <div style={{ fontSize: 11, color: '#aaa', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                {game.title}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => startInspect(idx)}
                  style={{
                    background: 'rgba(255,255,255,0.08)', color: '#ccc',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 4, padding: '4px 10px', cursor: 'pointer',
                    fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.05em',
                  }}
                >
                  INSPECT
                </button>
                <button
                  onClick={() => insertGame(idx)}
                  disabled={insertedGame === game.id}
                  style={{
                    background: insertedGame === game.id ? 'rgba(204,34,17,0.7)' : 'rgba(204,34,17,0.3)',
                    color: '#fff', border: '1px solid rgba(204,34,17,0.5)',
                    borderRadius: 4, padding: '4px 10px', cursor: insertedGame === game.id ? 'default' : 'pointer',
                    fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.05em',
                  }}
                >
                  {insertedGame === game.id ? '▶ PLAYING' : 'INSERT'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inspect overlay */}
      {inspectingGame && (
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 12, alignItems: 'center',
          background: 'rgba(0,0,0,0.8)', padding: '10px 18px', borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <span style={{ color: '#aaa', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.06em' }}>
            INSPECTING: <span style={{ color: '#fff' }}>{inspectingGame.game.title}</span>
            <span style={{ color: '#666', marginLeft: 10 }}>drag to rotate</span>
          </span>
          <button
            onClick={stopInspect}
            style={{
              background: 'rgba(204,34,17,0.6)', color: '#fff',
              border: '1px solid rgba(204,34,17,0.5)',
              borderRadius: 4, padding: '4px 12px', cursor: 'pointer',
              fontFamily: 'monospace', fontSize: 10,
            }}
          >
            ✕ CLOSE
          </button>
          <button
            onClick={() => { insertGame(inspectingGame.idx); stopInspect(); }}
            style={{
              background: 'rgba(0,180,80,0.5)', color: '#fff',
              border: '1px solid rgba(0,180,80,0.4)',
              borderRadius: 4, padding: '4px 12px', cursor: 'pointer',
              fontFamily: 'monospace', fontSize: 10,
            }}
          >
            ▶ INSERT
          </button>
        </div>
      )}

      {/* Inspect drag listener */}
      {inspectingGame && (
        <div
          style={{ position: 'absolute', inset: 0, cursor: 'grabbing' }}
          onMouseDown={handleInspectMouseDown}
          onTouchStart={handleInspectTouchStart}
        />
      )}

      {/* Status bar */}
      <div style={{
        position: 'absolute', bottom: 60, right: 14,
        color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', fontSize: 10,
        letterSpacing: '0.06em', textAlign: 'right',
      }}>
        {insertedGame
          ? `▶ ${GAMES.find(g => g.id === insertedGame)?.title ?? ''} playing`
          : '— no game inserted'}
      </div>
    </div>
  );
}
