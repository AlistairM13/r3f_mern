import * as THREE from 'three'
import { Suspense, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"

function Chip({ z }) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/chip-transformed.glb')

    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

    const data = {
        x: THREE.MathUtils.randFloatSpread(2),
        y: THREE.MathUtils.randFloatSpread(height),
        rX: Math.random() * Math.PI,
        rY: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
    }


    useFrame((state) => {
        ref.current.rotation.set((data.rX += 0.002), (data.rY += 0.004), (data.rZ += 0.005))
        ref.current.position.set(width * data.x, (data.y -= 0.02), z)

        if (data.y < -height) data.y = height / 1.5

    }, [])

    return (
        <group ref={ref} dispose={null}>
            <mesh geometry={nodes.chip_1.geometry} material={materials.chip_color} />
            <mesh geometry={nodes.chip_2.geometry} material={materials.chip_white} />
        </group>
    )
}

function Experience({ count = 120, depth = 80 }) {
    return (
        <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 120, fov: 30 }}>
            <color attach="background" args={["#fce49f"]} />
            <Suspense fallback={null}>
                <Environment preset="sunset" />
                {Array.from({ length: count }, (_, i) =>
                    <Chip key={i} z={(-i / count) * depth - 10} />
                )}
            </Suspense>
        </Canvas>
    )
}

export default Experience