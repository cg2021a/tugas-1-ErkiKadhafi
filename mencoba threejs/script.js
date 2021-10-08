function main() {
    const canvas = document.querySelector("#myCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 50;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00000);

    let lights = [];
    const directLight1 = new THREE.DirectionalLight(0xffffff, 1);
    const directLight2 = new THREE.DirectionalLight(0xffffff, 1);
    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    const ambientLight1 = new THREE.AmbientLight(0xffffff, 1);
    const ambientLight2 = new THREE.AmbientLight(0xffffff, 1);
    directLight1.position.set(-1, 2, 4);
    directLight2.position.set(1, -2, -4);
    pointLight1.position.set(-1, 2, 4);
    pointLight2.position.set(1, -2, -4);
    ambientLight1.position.set(-1, 2, 4);
    ambientLight2.position.set(1, -2, -4);
    lights.push(directLight1);
    lights.push(directLight2);
    lights.push(pointLight1);
    lights.push(pointLight2);
    lights.push(ambientLight1);
    lights.push(ambientLight2);

    lights.forEach((light) => {
        scene.add(light);
        light.visible = false;
    });
    // scene.add(lights[0]);
    // scene.add(lights[1]);
    lights[0].visible = true;
    lights[1].visible = true;

    const buttons = document.querySelectorAll("button");
    buttons.forEach((button, index1) => {
        button.addEventListener("click", () => {
            buttons.forEach((button, index2) => {
                let indexLight = (index2 + 1) * 2;
                if (button.classList.contains("active")) {
                    button.classList.remove("active");
                }
                if (index2 !== index1) {
                    lights[indexLight - 2].visible = false;
                    lights[indexLight - 1].visible = false;
                    console.log(indexLight - 2);
                    console.log(indexLight - 1);
                    // console.log(index2);
                }
            });
            button.classList.toggle("active");
            let indexLight = (index1 + 1) * 2;
            lights[indexLight - 2].visible = true;
            lights[indexLight - 1].visible = true;
        });
    });

    const objects = [];
    const spread = 15;

    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
    }

    function createMaterial(material) {
        const hue = Math.random();
        const saturation = 1;
        const luminance = 0.5;
        material.color.setHSL(hue, saturation, luminance);

        return material;
    }

    function addGeometry(x, y, geometry, material) {
        const mesh = new THREE.Mesh(geometry, material);
        addObject(x, y, mesh);
    }

    //make cube 1
    {
        const width = 8;
        const height = 8;
        const depth = 8;
        addGeometry(
            -2,
            2,
            new THREE.BoxGeometry(width, height, depth),
            createMaterial(
                new THREE.MeshStandardMaterial({
                    side: THREE.DoubleSide,
                })
            )
        );
    }
    //make cube 2
    {
        const width = 8;
        const height = 8;
        const depth = 8;
        addGeometry(
            2,
            -2,
            new THREE.BoxGeometry(width, height, depth),
            createMaterial(
                new THREE.MeshStandardMaterial({
                    side: THREE.DoubleSide,
                })
            )
        );
    }
    //make torus
    {
        const radius = 5;
        const tubeRadius = 2;
        const radialSegments = 6;
        const tubularSegments = 24;
        addGeometry(
            0,
            0,
            new THREE.TorusGeometry(
                radius,
                tubeRadius,
                radialSegments,
                tubularSegments
            ),
            createMaterial(
                new THREE.MeshPhongMaterial({
                    side: THREE.DoubleSide,
                    wireframe: true,
                })
            )
        );
    }
    //make dodecahedron 1
    {
        const radius = 5;
        const detail = 1;
        addGeometry(
            0,
            0,
            new THREE.DodecahedronGeometry(radius, detail),
            createMaterial(
                new THREE.MeshLambertMaterial({
                    side: THREE.DoubleSide,
                })
            )
        );
    }
    //make dodecahedron 2
    {
        const radius = 5;
        const detail = 1;
        addGeometry(
            0,
            0,
            new THREE.DodecahedronGeometry(radius, detail),
            createMaterial(
                new THREE.MeshLambertMaterial({
                    side: THREE.DoubleSide,
                })
            )
        );
    }
    //make lathegeometry 1
    {
        const radius = 3.5;
        const tubeRadius = 1.5;
        const radialSegments = 8;
        const tubularSegments = 64;
        const p = 2;
        const q = 3;
        addGeometry(
            -3,
            0,
            new THREE.TorusKnotGeometry(
                radius,
                tubeRadius,
                tubularSegments,
                radialSegments,
                p,
                q
            ),
            createMaterial(
                new THREE.MeshStandardMaterial({
                    side: THREE.DoubleSide,
                    roughness: 1,
                })
            )
        );
    }
    //make lathegeometry 2
    {
        const radius = 3.5;
        const tubeRadius = 1.5;
        const radialSegments = 8;
        const tubularSegments = 64;
        const p = 2;
        const q = 3;
        addGeometry(
            -3,
            0,
            new THREE.TorusKnotGeometry(
                radius,
                tubeRadius,
                tubularSegments,
                radialSegments,
                p,
                q
            ),
            createMaterial(
                new THREE.MeshStandardMaterial({
                    side: THREE.DoubleSide,
                    roughness: 1,
                })
            )
        );
    }

    //make lathe 1
    {
        const width = 100;
        const height = 5;
        const depth = 100;
        addGeometry(
            0,
            -3,
            new THREE.BoxGeometry(width, height, depth),
            createMaterial(
                new THREE.MeshPhongMaterial({
                    side: THREE.DoubleSide,
                    shininess: 150,
                })
            )
        );
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function animateRotate(obj, time) {
        const speed = 1;
        const rot = time * speed;
        obj.rotation.x = rot;
        obj.rotation.y = rot;
    }
    function animateTranslate(obj) {
        const speed = 1;

        if (obj.position.x <= 30 && obj.position.y >= 29) {
            obj.position.x += speed;
        } else if (obj.position.x >= 29 && obj.position.y >= -30) {
            obj.position.y -= speed;
        } else if (obj.position.x >= -30) {
            obj.position.x -= speed;
        } else if (obj.position.y <= 30) {
            obj.position.y += speed;
        }
    }
    function animateCircularY(obj, time, reverse) {
        const speed = time;

        obj.position.y = 10 * Math.sin(speed) * 3.8 * -1;
        obj.position.z = 10 * Math.cos(speed) * 3.8 * -1;
        if (reverse) {
            obj.position.y = -obj.position.y;
            obj.position.z = -obj.position.z;
        }
    }
    function animateCircularX(obj, time, reverse) {
        const speed = time;

        obj.position.x = 10 * Math.sin(speed) * 7;
        obj.position.z = 10 * Math.cos(speed) * 7;
        if (reverse) {
            obj.position.x = -obj.position.x;
            obj.position.z = -obj.position.z;
        }
    }

    let yPosSpeed = 8 / 1000;
    let xRotSpeed = 0.75 / 1000;
    let speed = 0;
    function moveCamera() {
        speed += yPosSpeed;
        camera.position.x = 200 * Math.sin(speed);
        camera.position.z = 200 * Math.cos(speed);
        camera.rotation.y += yPosSpeed;

        requestAnimationFrame(moveCamera);
    }
    moveCamera();

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // objects.forEach((obj, ndx) => {
        //     const speed = 1;
        //     const rot = time * speed;
        //     obj.rotation.x = rot;
        //     obj.rotation.y = rot;
        // });
        animateTranslate(objects[0]);
        animateTranslate(objects[1]);

        animateRotate(objects[0], time);
        animateRotate(objects[1], time);
        animateRotate(objects[2], time);

        animateCircularY(objects[3], time, false);
        animateCircularY(objects[4], time, true);

        animateCircularX(objects[5], time, false);
        animateCircularX(objects[6], time, true);

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
