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

  document.getElementById("WebGLCanvas").appendChild(renderer.domElement);
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
  camera.position.set(0, 0, 10);
  camera.lookAt(scene.position);
  scene.add(camera);
  return { scene, camera };
};

const createPyramide = () => {
  const pyramidGeometry = new THREE.CylinderGeometry(0.5, 1.5, 2.5, 70, false);

  for (i = 0; i < pyramidGeometry.faces.length; i++) {
    if (pyramidGeometry.faces[i] instanceof THREE.Face4) {
      pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xff0000);
      if (i % 2 == 0) {
        pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00ff11);
        pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x1100ff);
      } else {
        pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x2200ff);
        pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x00ff44);
      }
      pyramidGeometry.faces[i].vertexColors[3] = new THREE.Color(0xff0066);
    } else {
      pyramidGeometry.faces[i].vertexColors[0] = new THREE.Color(0xff0407);
      pyramidGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00ff98);
      pyramidGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0210ff);
    }
  }

  const pyramidMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });

  const pyramidMesh = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  return pyramidMesh;
};

const createCube = () => {
  const cubeGeometry = new THREE.CubeGeometry(1.5, 1.5, 1.5);

  for (i = 0; i < cubeGeometry.faces.length; i++) {
    if (cubeGeometry.faces[i] instanceof THREE.Face4) {
      cubeGeometry.faces[i].vertexColors[0] = new THREE.Color(0xff0000);
      if (i % 2 == 0) {
        cubeGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00ff11);
        cubeGeometry.faces[i].vertexColors[2] = new THREE.Color(0x1100ff);
      } else {
        cubeGeometry.faces[i].vertexColors[1] = new THREE.Color(0x2200ff);
        cubeGeometry.faces[i].vertexColors[2] = new THREE.Color(0x00ff44);
      }
      cubeGeometry.faces[i].vertexColors[3] = new THREE.Color(0xff0066);
    } else {
      cubeGeometry.faces[i].vertexColors[0] = new THREE.Color(0xff0407);
      cubeGeometry.faces[i].vertexColors[1] = new THREE.Color(0x00ff98);
      cubeGeometry.faces[i].vertexColors[2] = new THREE.Color(0x0210ff);
    }
  }

  const cubeMaterials = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });

  return new THREE.Mesh(cubeGeometry, cubeMaterials);
};

const createRoot = () => {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: 0x96765a,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometry, material);
};

const createSphere = () => {
  const geometry = new THREE.SphereGeometry(1, 8, 8);
  for (i = 0; i < geometry.faces.length; i++) {
    if (geometry.faces[i] instanceof THREE.Face4) {
      geometry.faces[i].vertexColors[0] = new THREE.Color(0xff0000);
      if (i % 2 == 0) {
        geometry.faces[i].vertexColors[1] = new THREE.Color(0x00ff11);
        geometry.faces[i].vertexColors[2] = new THREE.Color(0x1100ff);
      } else {
        geometry.faces[i].vertexColors[1] = new THREE.Color(0x2200ff);
        geometry.faces[i].vertexColors[2] = new THREE.Color(0x00ff44);
      }
      geometry.faces[i].vertexColors[3] = new THREE.Color(0xff0066);
    } else {
      geometry.faces[i].vertexColors[0] = new THREE.Color(0xff0407);
      geometry.faces[i].vertexColors[1] = new THREE.Color(0x00ff98);
      geometry.faces[i].vertexColors[2] = new THREE.Color(0x0210ff);
    }
  }

  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
  });
  return new THREE.Mesh(geometry, material);
};

const createObjectsOnScene = (scene) => {
  const pyramidMesh = createPyramide();
  pyramidMesh.position.set(-1.5, 0.0, 4.0);
  scene.add(pyramidMesh);

  const cubeMesh = createCube();
  cubeMesh.position.set(1.5, 0.0, 4.0);
  scene.add(cubeMesh);

  const sphere = createSphere();
  sphere.position.set(5, 0, 4);
  scene.add(sphere);

  const pyramide1 = createPyramide();
  const pyramide2 = createPyramide();
  const pyramide3 = createPyramide();
  pyramide1.position.set(-9.5, 0.0, 0.0);
  scene.add(pyramide1);
  pyramide2.position.set(0, 1.5, 0.0);
  pyramide3.position.set(0, 1.5, 0.0);
  pyramide1.add(pyramide2);
  pyramide2.add(pyramide3);
  const root = createRoot();
  root.position.set(0, -1.3, 0);
  pyramide1.add(root);
  return { pyramidMesh, cubeMesh, sphere, pyramide1 };
};

const animateScene = (pyramidMesh, cubeMesh, sphere, pyramide) => {
  pyramidMesh.rotation.y += 0.1;
  sphere.rotation.x += 0.1;
  sphere.rotation.z += 0.1;
  pyramide.rotation.y += 0.1;

  cubeMesh.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), 0.075);

  requestAnimationFrame(() =>
    animateScene(pyramidMesh, cubeMesh, sphere, pyramide)
  );

  renderScene();
};

const renderScene = () => {
  renderer.render(scene, camera);
};

const renderer = createRenderer();
const { scene, camera } = initializeSceneAndCamera();
const { pyramidMesh, cubeMesh, sphere, pyramide1 } = createObjectsOnScene(
  scene
);

animateScene(pyramidMesh, cubeMesh, sphere, pyramide1);
