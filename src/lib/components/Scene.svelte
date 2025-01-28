<script>
    import { T, useTask } from '@threlte/core'
    import { interactivity, OrbitControls } from '@threlte/extras'
    import { Spring } from 'svelte/motion'

    interactivity()

    const scale = new Spring(1)


    let rotation = 0;
    useTask((delta) => {
        rotation += delta
    })
</script>

<T.PerspectiveCamera
    makeDefault
    position={[10, 10, 10]}
    oncreate={(ref) => {
        ref.lookAt(0, 1, 0)
    }}
>
    <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight
    position={[0, 10, 10]}
    castShadow
/>

<T.Mesh
    rotation.y={rotation}
    position.y={1}
    scale={scale.current}
    onpointerenter={() => {
        scale.target = 1.5
    }}
    onpointerleave={() => {
        scale.target = 1
    }}
    castShadow
>
    <T.BoxGeometry args={[1, 2, 1]} />
    <T.MeshStandardMaterial color="hotpink" />
</T.Mesh>

<T.Mesh
    receiveShadow
>
    <T.CylinderGeometry args={[5, 5, 10, 64]} />
    <T.MeshPhysicalMaterial
        color="lightblue"
        transparent={true}
        opacity={0.5}
        transmission={0.5}
        roughness={0.1}
    />
</T.Mesh>
