import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import ThreeDCanvas from "./ThreeDCanvas";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ThreeDCanvas />
        </main>
    );
}
