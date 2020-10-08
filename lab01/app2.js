const createRenderer = () => {
  let renderer;
  if (Detector.webgl) {
    renderer = new THREE.WebGLRenderer({ antialias: true });
  } else {
    renderer = new THREE.CanvasRenderer();
  }

  renderer.setClearColor(0x000000, 1);

  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  renderer.setSize(canvasWidth, canvasHeight);
  return renderer;
};

const createTriangle = () => {
  const triangleGeometry = new THREE.Geometry();
  triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
  triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
  triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
  triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

  triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xff0000);
  triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00ff00);
  triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000ff);

  const triangleMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });

  const triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);
  triangleMesh.position.set(-1.5, 0.0, 4.0);
  return triangleMesh;
};

const createSquare = () => {
  const squareGeometry = new THREE.Geometry();
  squareGeometry.vertices.push(new THREE.Vector3(-1.0, 1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(1.0, 1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
  squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
  squareGeometry.faces.push(new THREE.Face3(0, 1, 2));
  squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

  const squareMaterial = new THREE.MeshBasicMaterial({
    color: 0x8080ff,
    side: THREE.DoubleSide,
  });

  const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
  squareMesh.position.set(1.5, 0.0, 2.0);
  return squareMesh;
};

const initializeSceneAndCamera = (renderer) => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    canvasWidth / canvasHeight,
    1,
    100
  );
  camera.position.set(0, 6, 10);
  camera.lookAt(scene.position);
  scene.add(camera);

  return { scene: scene, camera: camera };
};

const attachTriangleAndSquareToScene = (scene) => {
  scene.add(createTriangle());
  scene.add(createSquare());
};

const renderScene = () => {
  const renderer = createRenderer();
  document.getElementById("WebGLCanvas").appendChild(renderer.domElement);
  const { scene, camera } = initializeSceneAndCamera(renderer);
  attachTriangleAndSquareToScene(scene);
  renderer.render(scene, camera);
};

renderScene();
