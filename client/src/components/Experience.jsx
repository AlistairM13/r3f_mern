import { Suspense, } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { Instances, Chip } from "./Chip"

function Experience({ count = 120, depth = 80 }) {

    return (
        <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 120, fov: 30 }}>
            <color attach="background" args={["#fce49f"]} />
            <Suspense fallback={null}>
                <Environment preset="sunset" />
                <Instances >
                    {Array.from({ length: count }, (_, i) =>
                        <Chip key={i} z={(-i / count) * depth - 10} />
                    )}
                </Instances>
            </Suspense>
        </Canvas>
    )
}

export default Experience