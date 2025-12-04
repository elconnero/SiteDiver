import { Menu } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)
    return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
                <div className="flex items-center space-x-1 group cursor-pointer">
                    <div>
                        <img 
                        src="/logo.png" 
                        alt="aidiver" 
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        /> 
                    </div>
                    <span className="text-lg sm:text-xl md:text-2xl font-medium">
                        <span className="text-white">AI</span>
                        <span className="text-yellow-400">Diver</span>
                    </span>
                </div>
                {/*Nav Links*/}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <a href="#features" className="text-white hover:text-yellow-400 text-sm lg:text-base">Features</a>
                    <a href="#hero" className="text-white hover:text-yellow-400 text-sm lg:text-base">Hero</a>
                    <a href="#page_2" className="text-white hover:text-yellow-400 text-sm lg:text-base">Page_2</a>
                    <a href="#page_3" className="text-white hover:text-yellow-400 text-sm lg:text-base">Page_3</a>
                </div>
                <button className="md:hidden p-2 text-white hover:text-yellow-400" onClick={()=> setMobileMenuIsOpen((prev) =>!prev)}>
                    {mobileMenuIsOpen ? (
                        <X className="w-5 h-5 sm:h-6"/>
                    ) : (
                        <Menu className="w-5 h-5 sm:h-6"/>
                    )}
                </button>
            </div>
        </div>
        {mobileMenuIsOpen &&  (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
            <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
                <a href="#features" onClick={()=> setMobileMenuIsOpen(false)} className="block text-white hover:text-yellow-400 text-sm lg:text-base">Features</a>
                <a href="#hero"     onClick={()=> setMobileMenuIsOpen(false)} className="block text-white hover:text-yellow-400 text-sm lg:text-base">Hero</a>
                <a href="#page_2"   onClick={()=> setMobileMenuIsOpen(false)} className="block text-white hover:text-yellow-400 text-sm lg:text-base">Page_2</a>
                <a href="#page_3"   onClick={()=> setMobileMenuIsOpen(false)} className="block text-white hover:text-yellow-400 text-sm lg:text-base">Page_3</a>
            </div>
        </div>
        )}
    </nav>
    );
}
//14:24