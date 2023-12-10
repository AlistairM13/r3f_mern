import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import { EffectComposer, DepthOfField } from "@react-three/postprocessing"

function Chip({ z, color = "orange" }) {
    const ref = useRef()
    const colorRef = useRef()
    const { nodes, materials } = useGLTF('/chip-transformed.glb')
    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

    const [data] = useState({
        x: THREE.MathUtils.randFloatSpread(2),
        y: THREE.MathUtils.randFloatSpread(height),
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    })

    // useEffect(() => {
    //   colorRef.current.material.color = new THREE.Color(color)
    // }, [])

    useFrame((state) => {
        ref.current.rotation.set((data.rX += 0.002), (data.rY += 0.004), (data.rZ += 0.005))
        ref.current.position.set(width * data.x, (data.y -= 0.025), z)

        if (data.y < -height) data.y = height / 1.5

    }, [])

    return (
        <group ref={ref} dispose={null}>
            <group >
                <mesh ref={colorRef} geometry={nodes.chip_1.geometry} material={materials.chip_color} />
                <mesh geometry={nodes.chip_2.geometry} material={materials.chip_white} />
            </group>
        </group>
    )
}

function Experience({ count = 120, depth = 80 }) {
    return (
        <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 130, fov: 30 }}>
            <color attach="background" args={["#fce49f"]} />
            <Suspense fallback={null}>
                <spotLight position={[10, 10, 10]} intensity={1} />
                <Environment preset="sunset" />
                {Array.from({ length: count }, (_, i) =>
                    <Chip key={i} z={(-i / count) * depth - 5} />
                )}
                <EffectComposer>
                    <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={11} height={700} />
                </EffectComposer>
            </Suspense>
        </Canvas>
    )
}

export default Experience