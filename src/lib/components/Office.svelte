<script lang="ts">
  import * as THREE from 'three';
  import { T } from '@threlte/core';
  import { useGltf, useTexture } from '@threlte/extras';
  import { interactivity } from '@threlte/extras';

  interactivity();

  export let scale = 3;
  export let position: [number, number, number] = [0, 0, -35];

  let currentSocial = 0;
  const iconScale = 2;
  const gltf = useGltf('/models/office_desk/scene.gltf');
  const socialMediaTextures = [
    "/textures/github-mark/github-mark-white.png",
    "/textures/linkedin-icon.png",
  ];
  const arrowTexture = "/textures/arrow.png";

  function addScreenOverlay(scene) {
    if (!scene) return;

    scene.traverse((node) => {
      if (node.isMesh && node.name === "monitor_screen") {
        // Get the dimensions and position of the monitor screen
        const box = new THREE.Box3().setFromObject(node);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        // Create a parent group to hold all planes
        const screenGroup = new THREE.Group();
        screenGroup.position.copy(center);
        
        // Get screen normal direction
        const normal = new THREE.Vector3();
        node.getWorldDirection(normal);
        
        // Add slight offset
        screenGroup.position.add(normal.multiplyScalar(0.001));
        screenGroup.rotateY(Math.PI / 2.5);
        screenGroup.translateZ(-0.035);
        screenGroup.translateY(0.01);
        
        // social media
        const socialGeometry = new THREE.PlaneGeometry(size.x * 0.4, size.y * 0.4);
        const socialTexture = new THREE.TextureLoader().load(socialMediaTextures[0]);
        socialTexture.colorSpace = 'srgb';
        
        const socialMaterial = new THREE.MeshBasicMaterial({
          map: socialTexture,
          side: THREE.DoubleSide,
          transparent: true
        });
        
        const socialPlane = new THREE.Mesh(socialGeometry, socialMaterial);
        socialPlane.name = "social_icon";
        socialPlane.rotateZ(.035);
        socialPlane.rotateY(Math.PI);
        screenGroup.add(socialPlane);
        
        // left arrow
        const arrowLeftGeometry = new THREE.PlaneGeometry(size.x * 0.2, size.y * 0.2);
        const arrowLeftTexture = new THREE.TextureLoader().load(arrowTexture);
        arrowLeftTexture.colorSpace = 'srgb';
        
        const arrowLeftMaterial = new THREE.MeshBasicMaterial({
          map: arrowLeftTexture,
          side: THREE.DoubleSide,
          transparent: true
        });
        
        const arrowLeftPlane = new THREE.Mesh(arrowLeftGeometry, arrowLeftMaterial);
        arrowLeftPlane.position.set(size.x * 0.65, 0, 0);
        arrowLeftPlane.name = "arrow_left";
        arrowLeftPlane.rotateZ(.1);
        arrowLeftPlane.rotateY(Math.PI);
        arrowLeftPlane.translateY(0.01);
        screenGroup.add(arrowLeftPlane);
        
        // right arrow
        const arrowRightGeometry = new THREE.PlaneGeometry(size.x * 0.2, size.y * 0.2);
        const arrowRightTexture = new THREE.TextureLoader().load(arrowTexture);
        arrowRightTexture.colorSpace = 'srgb';
        
        const arrowRightMaterial = new THREE.MeshBasicMaterial({
          map: arrowRightTexture,
          side: THREE.DoubleSide,
          transparent: true
        });
        
        const arrowRightPlane = new THREE.Mesh(arrowRightGeometry, arrowRightMaterial);
        arrowRightPlane.position.set(-size.x * 0.65, 0, 0);
        arrowRightPlane.name = "arrow_right";
        arrowRightPlane.rotateZ(.1);
        arrowRightPlane.translateY(-0.01);
        screenGroup.add(arrowRightPlane);

        // scale appropriately
        socialPlane.scale.set(iconScale, iconScale, iconScale);
        arrowLeftPlane.scale.set(iconScale, iconScale, iconScale);
        arrowRightPlane.scale.set(iconScale, iconScale, iconScale);
        
        scene.add(screenGroup);
      }
    });
  }

  const handleClick = (e) => {

    // Arrow click
    if (e.object.name === "arrow_right") {
      currentSocial = (currentSocial + 1) % socialMediaTextures.length;
    } else if (e.object.name === "arrow_left") {
      currentSocial = (currentSocial - 1 + socialMediaTextures.length) % socialMediaTextures.length;
    } else if (e.object.name === "social_icon") {
      switch (currentSocial) {
        case 0:
          window.open("https://github.com/hupeyy", "_blank");
          break;
        case 1:
          window.open("https://www.linkedin.com/in/alex-huper/", "_blank");
          break;
      }
    }

    const socialPlane = e.object.parent.getObjectByName("social_icon");
    socialPlane.material.map = new THREE.TextureLoader().load(socialMediaTextures[currentSocial]);
    socialPlane.material.map.colorSpace = 'srgb';
  }


  $: if ($gltf) {
    console.log("GLTF loaded");
    addScreenOverlay($gltf.scene);
  }
</script>

{#if $gltf}
  <T
    is={$gltf.scene}
    scale={scale}
    rotation={[0, -Math.PI / 2, 0]}
    position={position}
    interactive
    onclick={handleClick}
  />
{/if}