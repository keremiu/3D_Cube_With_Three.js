/**
 * 3D Cube Configurator
 * Interactive Three.js application with modular cube system
 * 
 * 🚀 Live Demo: https://3d-cube-with-threejs.netlify.app
 * 🛠️ Developer: Kerem İhsan Ulaşan
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class CubeConfigurator {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.modules = [];
        this.currentDimensions = { width: 60, height: 60, depth: 60 };
        this.selectedModuleIndex = 0;
        this.isDraggingSun = false;
        this.dragPlane = new THREE.Plane();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLighting();
        this.createGround();
        this.createModule();
        this.setupEvents();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(200, 200, 200);
    }

    // gölgeler burada aktif oluyor
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('canvas'),
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    setupEvents() {
        window.addEventListener('resize', () => this.onWindowResize());
        this.setupSunDragging();
    }

    setupLighting() {
        this.createAmbientLight();
        this.createDirectionalLight();
        this.createPointLight();
        this.createSun();
    }

    createAmbientLight() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
    }

    // asıl gölge yapan ışık burası
    createDirectionalLight() {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        this.directionalLight.position.set(100, 100, 50);
        this.directionalLight.target.position.set(0, 0, 0); 
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = 2048;
        this.directionalLight.shadow.mapSize.height = 2048;
        this.directionalLight.shadow.camera.near = 0.5;
        this.directionalLight.shadow.camera.far = 500;
        this.directionalLight.shadow.camera.left = -200;
        this.directionalLight.shadow.camera.right = 200;
        this.directionalLight.shadow.camera.top = 200;
        this.directionalLight.shadow.camera.bottom = -200;
        this.scene.add(this.directionalLight);
        this.scene.add(this.directionalLight.target); 
    }

    createPointLight() {
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-100, 100, -100);
        this.scene.add(pointLight);
    }

    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(500, 500);

        const groundMaterial = new THREE.MeshLambertMaterial({
            color: 0xcccccc,
            transparent: true,
            opacity: 0.8
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2; 
        ground.position.y = 0;
        ground.receiveShadow = true;
        this.scene.add(ground);
        const gridHelper = new THREE.GridHelper(500, 50, 0x888888, 0xcccccc);
        gridHelper.position.y = 0.1; 
        this.scene.add(gridHelper);
    }

    createSun() {

        const sunGeometry = new THREE.BoxGeometry(20, 20, 20);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00, 
            transparent: true,
            opacity: 0.9
        });
        
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);

        sun.position.set(100, 100, 50);
        this.sun = sun;
        
        this.scene.add(sun);
        const glowGeometry = new THREE.SphereGeometry(25, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.3
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.copy(sun.position);
        
        this.sunGlow = glow;
        this.scene.add(glow);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 32;
        
        context.fillStyle = '#ffff00';
        context.font = 'bold 12px Arial';
        context.textAlign = 'center';
        context.fillText('SUN', 32, 20);
        
        const texture = new THREE.CanvasTexture(canvas);
        const labelGeometry = new THREE.PlaneGeometry(20, 10);
        const labelMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.8
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(100, 120, 50);
        
        this.sunLabel = label;
        this.scene.add(label);

        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(100, 100, 50), 
            new THREE.Vector3(0, 0, 0)       
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, opacity: 0.3, transparent: true });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        
        this.sunLine = line;
        this.scene.add(line);
    }

    // güneş sürükleme sistemi
    setupSunDragging() {
        const canvas = this.renderer.domElement;
        
        canvas.addEventListener('mousedown', (event) => {
            this.onMouseDown(event);
        });
        
        canvas.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        });
        
        canvas.addEventListener('mouseup', (event) => {
            this.onMouseUp(event);
        });
    }

    onMouseDown(event) {
        this.updateMousePosition(event);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // güneş objelerine tıklandı mı kontrol et
        const sunObjects = [this.sun, this.sunGlow, this.sunLabel];
        const intersects = this.raycaster.intersectObjects(sunObjects);
        
        if (intersects.length > 0) {
            this.isDraggingSun = true;
            event.preventDefault();
            
            // kamera kontrollerini kapat
            this.controls.enabled = false;
            this.renderer.domElement.style.cursor = 'grabbing';
            
            // yatay düzlemde sürükleme için plane oluştur
            this.dragPlane.setFromNormalAndCoplanarPoint(
                new THREE.Vector3(0, 1, 0), 
                this.sun.position
            );
        }
    }

    onMouseMove(event) {
        this.updateMousePosition(event);
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const sunObjects = [this.sun, this.sunGlow, this.sunLabel];
        const intersects = this.raycaster.intersectObjects(sunObjects);

        // cursor değiştir (sadece sürüklemiyorsak)
        if (!this.isDraggingSun) {
            if (intersects.length > 0) {
                this.renderer.domElement.style.cursor = 'grab';
            } else {
                this.renderer.domElement.style.cursor = 'auto';
            }
        }
        
        // sürükleme işlemi
        if (!this.isDraggingSun) return;
        
        const intersectionPoint = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(this.dragPlane, intersectionPoint);
        
        if (intersectionPoint) {
            // çok uzaklaşmasını engelle
            const maxDistance = 200;
            const distance = intersectionPoint.length();
            
            if (distance > maxDistance) {
                intersectionPoint.normalize().multiplyScalar(maxDistance);
            }

            // güneş ve glow pozisyonunu güncelle
            this.sun.position.copy(intersectionPoint);
            this.sunGlow.position.copy(intersectionPoint);
            this.sunLabel.position.set(intersectionPoint.x, intersectionPoint.y + 20, intersectionPoint.z);
            
            // ışık pozisyonunu güncelle
            this.directionalLight.position.copy(intersectionPoint);
            
            // ışık çizgisini güncelle
            this.updateSunLine();
        }
    }

    onMouseUp(event) {
        this.isDraggingSun = false;
        
        // kamera kontrollerini geri aç
        this.controls.enabled = true;
        this.renderer.domElement.style.cursor = 'auto';
    }

    updateSunLine() {
        if (this.sunLine) {
            this.scene.remove(this.sunLine);
        }
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            this.sun.position.clone(),
            new THREE.Vector3(0, 0, 0)
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00, opacity: 0.3, transparent: true });
        this.sunLine = new THREE.Line(lineGeometry, lineMaterial);
        this.scene.add(this.sunLine);
    }

    createModule(dimensions = null) {
        // boyutları kopyala ki bağımsız olsun
        const moduleDimensions = dimensions ? 
            { width: dimensions.width, height: dimensions.height, depth: dimensions.depth } : 
            { width: this.currentDimensions.width, height: this.currentDimensions.height, depth: this.currentDimensions.depth };

        // gerçek boyutlarla geometri oluştur (scaling değil)
        const geometry = new THREE.BoxGeometry(
            moduleDimensions.width,
            moduleDimensions.height,
            moduleDimensions.depth
        );

        // her modüle farklı renk ver
        const colors = [0x4a90e2, 0x50c878, 0xff6b6b, 0xffd700, 0x9370db, 0xff8c00];
        const material = new THREE.MeshPhongMaterial({
            color: colors[this.modules.length % colors.length],
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });

        // küpü oluştur ve gölge ayarları
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        
        // pozisyonu hesapla - sol taraf sabit kalacak şekilde
        const xOffset = this.calculateXOffset(this.modules.length);
        cube.position.set(xOffset + moduleDimensions.width / 2, moduleDimensions.height / 2, moduleDimensions.depth / 2);
        
        // modül verisini hazırla
        const module = {
            mesh: cube,
            dimensions: moduleDimensions,
            id: this.modules.length + 1
        };

        this.modules.push(module);
        this.scene.add(cube);
        this.updateModuleList();
        this.updateSliderValues();

        return module;
    }


    updateModuleGeometry(module, dimensions) {
        const newGeometry = new THREE.BoxGeometry(
            dimensions.width,
            dimensions.height,
            dimensions.depth
        );
        module.mesh.geometry.dispose();
        module.mesh.geometry = newGeometry;
    }

    setModulePosition(moduleIndex, dimensions) {
        const module = this.modules[moduleIndex];
        if (moduleIndex === 0) {
            // ilk modül - sol taraf sabit
            module.mesh.position.set(
                dimensions.width / 2,
                dimensions.height / 2,
                dimensions.depth / 2
            );
        } else {
            // diğer modüller - önceki modüllerin toplamından sonra
            const xOffset = this.calculateXOffset(moduleIndex);
            module.mesh.position.set(
                xOffset + dimensions.width / 2,
                dimensions.height / 2,
                dimensions.depth / 2
            );
        }
    }

    // önceki modüllerin toplam genişliğini hesapla
    calculateXOffset(moduleIndex) {
        let currentX = 0;
        for (let i = 0; i < moduleIndex; i++) {
            currentX += this.modules[i].dimensions.width;
        }
        return currentX;
    }

    updateMousePosition(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    // slider eventlerini halleder
    onDimensionChange(dimensionType, event, valueElement) {
        const value = parseInt(event.target.value);
        valueElement.textContent = value;

        if (this.modules.length > 0) {
            const selectedModule = this.modules[this.selectedModuleIndex];
            const newDimensions = { ...selectedModule.dimensions, [dimensionType]: value };
            this.updateModuleDimensions(this.selectedModuleIndex, newDimensions);
        }
        
        this.currentDimensions[dimensionType] = value;
        
        if (dimensionType === 'width') {
            this.checkAndAddModule();
        }
    }

    // modül boyutunu güncelle
    updateModuleDimensions(moduleIndex, newDimensions) {
        if (moduleIndex >= this.modules.length) return;

        const module = this.modules[moduleIndex];
        module.dimensions = { ...newDimensions };
        
        // geometriyi yenile
        this.updateModuleGeometry(module, newDimensions);
        // pozisyonu ayarla
        this.setModulePosition(moduleIndex, newDimensions);
        // sonraki modülleri kaydır
        this.updateSubsequentModulePositions(moduleIndex + 1);
        this.updateModuleList();
    }

    updateSubsequentModulePositions(startIndex) {
        for (let i = startIndex; i < this.modules.length; i++) {
            this.setModulePosition(i, this.modules[i].dimensions);
        }
    }

    updateModuleList() {
        const modulesList = document.getElementById('modules-list');
        modulesList.innerHTML = '';

        this.modules.forEach((module, index) => {
            const moduleItem = document.createElement('div');
            moduleItem.className = 'module-item';
            moduleItem.style.cursor = 'pointer';
            moduleItem.style.padding = '5px';
            moduleItem.style.borderRadius = '3px';
            moduleItem.style.backgroundColor = index === this.selectedModuleIndex ? 'rgba(74, 144, 226, 0.2)' : 'transparent';
            
            moduleItem.innerHTML = `
                <span>Module ${module.id}</span>
                <span class="dimensions">${module.dimensions.width}×${module.dimensions.height}×${module.dimensions.depth} cm</span>
            `;
            
            moduleItem.addEventListener('click', () => {
                this.selectModule(index);
            });
            
            modulesList.appendChild(moduleItem);
        });
    }

    selectModule(index) {
        this.selectedModuleIndex = index;
        this.updateModuleList();
        this.updateSliderValues();

        // seçili modülü kırmızı yap, diğerleri normal renk
        const colors = [0x4a90e2, 0x50c878, 0xff6b6b, 0xffd700, 0x9370db, 0xff8c00];
        this.modules.forEach((module, i) => {
            if (i === index) {
                module.mesh.material.color.setHex(0xff6b6b);
            } else {
                module.mesh.material.color.setHex(colors[i % colors.length]);
            }
        });
    }

    updateSliderValues() {
        if (this.modules.length === 0) return;
        
        const selectedModule = this.modules[this.selectedModuleIndex];
        const { width, height, depth } = selectedModule.dimensions;
        const widthSlider = document.getElementById('width-slider');
        const heightSlider = document.getElementById('height-slider');
        const depthSlider = document.getElementById('depth-slider');
        widthSlider.value = width;
        heightSlider.value = height;
        depthSlider.value = depth;

        document.getElementById('width-value').textContent = width;
        document.getElementById('height-value').textContent = height;
        document.getElementById('depth-value').textContent = depth;
    }

    setupEventListeners() {        
        const widthSlider = document.getElementById('width-slider');
        const heightSlider = document.getElementById('height-slider');
        const depthSlider = document.getElementById('depth-slider');

        const widthValue = document.getElementById('width-value');
        const heightValue = document.getElementById('height-value');
        const depthValue = document.getElementById('depth-value');

        widthSlider.addEventListener('input', (e) => this.onDimensionChange('width', e, widthValue));
        heightSlider.addEventListener('input', (e) => this.onDimensionChange('height', e, heightValue));
        depthSlider.addEventListener('input', (e) => this.onDimensionChange('depth', e, depthValue));

        const addModuleBtn = document.getElementById('add-module-btn');
        addModuleBtn.addEventListener('click', () => {
            this.createModule(this.currentDimensions);
            this.selectModule(this.modules.length - 1);
        });

        const deleteModuleBtn = document.getElementById('delete-module-btn');
        if (deleteModuleBtn) {
            deleteModuleBtn.addEventListener('click', () => {
                this.deleteSelectedModule();
            });
        }
    }

    deleteSelectedModule() {
        if (this.modules.length <= 1) return; 
        
        const moduleToDelete = this.modules[this.selectedModuleIndex];
        this.cleanupModule(moduleToDelete);
        this.modules.splice(this.selectedModuleIndex, 1);
        this.updateModuleIds();
        this.repositionModules();
        this.updateSelectedIndex();
        this.updateModuleList();
        this.updateSliderValues();
    }


    cleanupModule(module) {
        this.scene.remove(module.mesh);
        module.mesh.geometry.dispose();
        module.mesh.material.dispose();
    }


    updateModuleIds() {
        this.modules.forEach((module, index) => {
            module.id = index + 1;
        });
    }


    updateSelectedIndex() {
        if (this.selectedModuleIndex >= this.modules.length) {
            this.selectedModuleIndex = 0;
        }
    }

    repositionModules() {
        this.modules.forEach((module, index) => {
            this.setModulePosition(index, module.dimensions);
        });
    }
    // 60cm aştı mı ikinci modül ekle
    checkAndAddModule() {
        if (this.modules.length === 1) {
            const firstModule = this.modules[0];
            if (firstModule.dimensions.width > 60) {
                const secondModuleDimensions = {
                    width: firstModule.dimensions.width,
                    height: firstModule.dimensions.height,
                    depth: firstModule.dimensions.depth
                };
                this.createModule(secondModuleDimensions);
                console.log('Second module added automatically');
            }
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        if (this.sunLabel) {
            this.sunLabel.lookAt(this.camera.position);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new CubeConfigurator();
}); 