<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
  import * as THREE from 'three';
  import { onDestroy, onMount } from 'svelte';
	import { ToonShaderDotted } from 'three/examples/jsm/Addons.js';
	import { lightPosition } from 'three/src/nodes/TSL.js';
  
  // Props
  export let materialType = 'shiny';
  export let speed = 0.25;
  export let numBlobs = 20;
  export let resolution = 28;
  export let isolation = 80;
  export let floor = true;
  export let wallx = true;
  export let wallz = true;
  
  // Component variables
  let materials: Record<string, THREE.Material>;
  let current_material: string;
  let effect: MarchingCubes;
  let time = 0;
  let loaded = false;

  // Lights
  let pointLight = new THREE.PointLight(0xff7c00, 5, 0, 0);
  pointLight.position.set(0, 0, 100);
  let ambientLight = new THREE.AmbientLight(0x323232, 3);
  
  // Generate materials
  function generateMaterials() {
    // Path for environment map (adjust based on your project)
    const path = '/textures/cube/SwedishRoyalCastle/';
    const format = '.jpg';
    const urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ];
  
    // Try to load environment maps if they exist, otherwise use basic materials
    let reflectionCube, refractionCube;
    
    try {
      const cubeTextureLoader = new THREE.CubeTextureLoader();
      reflectionCube = cubeTextureLoader.load(urls);
      refractionCube = cubeTextureLoader.load(urls);
      refractionCube.mapping = THREE.CubeRefractionMapping;
    } catch (e) {
      console.warn("Could not load environment maps, using basic materials instead");
    }

    const dottedMaterial = createShaderMaterial(ToonShaderDotted, pointLight, ambientLight );
  
    // Create and return material dictionary
    return {
      'shiny': new THREE.MeshStandardMaterial({ 
        color: 0x9c0000, 
        envMap: reflectionCube, 
        roughness: 0.1, 
        metalness: 1.0 
      }),
      'chrome': new THREE.MeshLambertMaterial({ 
        color: 0xffffff, 
        envMap: reflectionCube 
      }),
      'liquid': new THREE.MeshLambertMaterial({ 
        color: 0xffffff, 
        envMap: refractionCube, 
        refractionRatio: 0.85 
      }),
      'matte': new THREE.MeshPhongMaterial({ 
        specular: 0x494949, 
        shininess: 1 
      }),
      'flat': new THREE.MeshLambertMaterial({}),
      'plastic': new THREE.MeshPhongMaterial({ 
        specular: 0xc1c1c1, 
        shininess: 250 
      }),
      'multiColors': new THREE.MeshPhongMaterial( { shininess: 2, vertexColors: true } ),
      'dotted': dottedMaterial
    };
  }
  
  // Create shader material
  function createShaderMaterial( shader, light, ambientLight ) {

    const u = THREE.UniformsUtils.clone( shader.uniforms );

    const vs = shader.vertexShader;
    const fs = shader.fragmentShader;

    const material = new THREE.ShaderMaterial( { uniforms: u, vertexShader: vs, fragmentShader: fs } );

    material.uniforms[ 'uDirLightPos' ].value = light.position;
    material.uniforms[ 'uDirLightColor' ].value = light.color;

    material.uniforms[ 'uAmbientLightColor' ].value = ambientLight.color;

    return material;

  }
  
  // Modified updateCubes function to include circular plane
  function updateCubes(object, time, numblobs, floor, wallx, wallz) {
    object.reset();
  
    // Add metaballs
    const rainbow = [
      new THREE.Color(0xff0000),
      new THREE.Color(0xffbb00),
      new THREE.Color(0xffff00),
      new THREE.Color(0x00ff00),
      new THREE.Color(0x0000ff),
      new THREE.Color(0x9400bd),
      new THREE.Color(0xc800eb)
    ];
    
    const subtract = 12;
    const strength = 1.2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);
  
    for (let i = 0; i < numblobs; i++) {
      const ballx = Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 + 0.5;
      const bally = Math.abs(Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77;
      const ballz = Math.cos(i + 1.32 * time * 0.1 * Math.sin((0.92 + 0.53 * i))) * 0.27 + 0.5;
  
      if (current_material === 'multiColors') {
        object.addBall(ballx, bally, ballz, strength, subtract, rainbow[i % 7]);
      } else {
        object.addBall(ballx, bally, ballz, strength, subtract);
      }
    }
  
    // Add planes
    if (floor) object.addPlaneY(2, 12);
    if (wallz) object.addPlaneZ(2, 12);
    if (wallx) object.addPlaneX(2, 12);
  
    object.update();
  }
  
  // Initialize materials and effect
  onMount(() => {
    materials = generateMaterials();
    current_material = materialType;
    
    // Create marching cubes effect
    effect = new MarchingCubes(resolution, materials[current_material], true, true, 100000);
    effect.position.set(0, 0, 0);
    effect.scale.set(700, 700, 700);
    
    loaded = true;
  });
  
  // Cleanup on component destroy
  onDestroy(() => {
    if (effect) {
      effect.geometry.dispose();
      if (Array.isArray(effect.material)) {
        effect.material.forEach((material) => material.dispose && material.dispose());
      } else if (effect.material.dispose) {
        effect.material.dispose();
      }
    }
  });
  
  // Update when props change
  $: if (effect && resolution) {
    effect.init(Math.floor(resolution));
  }
  
  $: if (effect && isolation) {
    effect.isolation = isolation;
  }
  
  $: if (effect && materials && materialType) {
    current_material = materialType;
    effect.material = materials[current_material];
  }
  
  // Animation frame update
  useTask((delta) => {
    if (effect) {
      time += delta * speed * 0.5;
      updateCubes(effect, time, numBlobs, floor, wallx, wallz);
    }
  });
</script>

{#if loaded}
  <T is={effect} />
{/if}