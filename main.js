// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x87ceeb, 10, 200);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 12);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb);
document.body.appendChild(renderer.domElement);

// Light
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 20, 10);
scene.add(sun);

// Ground
const groundGeo = new THREE.PlaneGeometry(800, 800);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x2e8b57 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Player
const player = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
player.position.y = 1;
scene.add(player);

// Controls
const keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// Game Loop
function animate() {
  requestAnimationFrame(animate);

  const speed = 0.25;
  if (keys.w) player.position.z -= speed;
  if (keys.s) player.position.z += speed;
  if (keys.a) player.position.x -= speed;
  if (keys.d) player.position.x += speed;

  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 12;
  camera.lookAt(player.position);

  renderer.render(scene, camera);
}

document.getElementById("loading").style.display = "none";
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
