import { useState, useEffect } from "react";

export const useIsDesktop = (threshold = 769) => {
    const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= threshold)

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= threshold)

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [threshold])

    return isDesktop
}