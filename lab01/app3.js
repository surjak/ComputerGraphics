const initializeRenderer = () => {
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

const initializeSceneAndCamera = () => {
  const scene = new THREE.Scene();
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasWidth / canvasHeight,
    1,
    100
  );
  camera.position.set(0, 0, 15);
  camera.lookAt(scene.position);
  scene.add(camera);
  return { scene, camera };
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

  return squareMesh;
};

const crateCircle = () => {
  const geo = new THREE.CircleGeometry(0.4, 32);
  const circleMaterial = new THREE.MeshBasicMaterial({
    color: 0x3022f1,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geo, circleMaterial);
};

const createObjectsOnScene = (scene) => {
  const triangleMesh = createTriangle();
  const triangleMesh2 = createTriangle();
  const triangleMesh3 = createTriangle();

  triangleMesh.position.set(-1.5, 0, 4.0);

  triangleMesh2.position.set(-1.5, -1.0, 4.0);
  triangleMesh2.rotation.y += 0.5;

  triangleMesh3.position.set(-1.5, -2.0, 4.0);
  triangleMesh3.rotation.y += 0.7;

  scene.add(triangleMesh);
  scene.add(triangleMesh2);
  scene.add(triangleMesh3);

  const squareMesh = createSquare();
  squareMesh.position.set(1.5, 0.0, 4.0);

  const triangleMesh4 = createTriangle();
  triangleMesh4.position.set(0, 2.0, 0);

  squareMesh.add(triangleMesh4);

  scene.add(squareMesh);

  const carBody = createSquare();
  carBody.position.set(8, -4, 4.0);
  scene.add(carBody);
  const circle = crateCircle();
  circle.position.set(-0.7, -1.0, 0);
  carBody.add(circle);
  const circle2 = crateCircle();
  circle2.position.set(0.7, -1.0, 0);
  carBody.add(circle2);

  return {
    triangleMesh: triangleMesh,
    triangleMesh2: triangleMesh2,
    triangleMesh3: triangleMesh3,
    triangleMesh4: triangleMesh4,
    squareMesh: squareMesh,
    carBody: carBody,
  };
};

const renderScene = () => {
  renderer.render(scene, camera);
};

const animateScene = (
  triangleMesh,
  triangleMesh2,
  triangleMesh3,
  triangleMesh4,
  squareMesh,
  carBody
) => {
  triangleMesh.rotation.y += 0.1;
  triangleMesh2.rotation.y += 0.1;
  triangleMesh3.rotation.y += 0.1;
  squareMesh.rotation.x -= 0.075;
  carBody.position.x -= 0.005;

  console.log(carBody.position.x);
  requestAnimationFrame(() =>
    animateScene(
      triangleMesh,
      triangleMesh2,
      triangleMesh3,
      triangleMesh4,
      squareMesh,
      carBody
    )
  );

  renderScene();
};

const { scene, camera } = initializeSceneAndCamera();

const renderer = initializeRenderer();
document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

const {
  triangleMesh,
  triangleMesh2,
  triangleMesh3,
  triangleMesh4,
  squareMesh,
  carBody,
} = createObjectsOnScene(scene);

animateScene(
  triangleMesh,
  triangleMesh2,
  triangleMesh3,
  triangleMesh4,
  squareMesh,
  carBody
);
