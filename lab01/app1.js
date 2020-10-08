const createSquare = () => {
  const squareGeometry = new THREE.Geometry();
  squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));

  squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
  squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

  const squareMaterial = new THREE.MeshBasicMaterial({
    color: 0x4287f5,
    side: THREE.DoubleSide,
  });

  const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
  squareMesh.position.set(1.5, 0.0, 4.0);
  return squareMesh;
};

const createTriangle = () => {
  const triangleGeometry = new THREE.Geometry();
  triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
  triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
  triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
  triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

  const triangleMaterial = new THREE.MeshBasicMaterial({
    color: 0x4287f5,
    side: THREE.DoubleSide,
  });

  const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
  triangleMesh.position.set(-1.5, 0.0, 4.0);
  return triangleMesh;
};

const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setClearColor(0x000000, 1);

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  renderer.setSize(canvasWidth, canvasHeight);
  return renderer;
};

const initializeScene = (renderer) => {
  document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    canvasWidth / canvasHeight,
    1,
    100
  );
  camera.position.set(0, 0, 10);
  camera.lookAt(scene.position);
  scene.add(camera);

  return { scene: scene, camera: camera };
};

const attachTriangleAndSquareToScene = (scene) => {
  const triangleMesh = createTriangle();
  scene.add(triangleMesh);

  const squareMesh = createSquare();
  scene.add(squareMesh);
};

const renderScene = () => {
  const renderer = createRenderer();
  const { scene, camera } = initializeScene(renderer);
  attachTriangleAndSquareToScene(scene);
  renderer.render(scene, camera);
};

renderScene();
