import { useEffect, useState } from "react"; 

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({x:0,y:0});
    useEffect(() => {
        function handleMouseMove(e){
            setMousePosition({x: e.clientX, y: e.clientY})
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, []);
    return <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.15), transparent 60%)`,
        }}/>
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 round-full blur-3x animate-pulse"/>
    </section>;
}