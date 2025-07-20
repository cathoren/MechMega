import { useState, useEffect } from "react";

interface UseScrollDirectionOptions {
    threshold?: number;
    debounce?: number;
}

export const useScrollDirection = (options: UseScrollDirectionOptions = {}) => {
    const { threshold = 100, debounce = 10 } = options;
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrollingDown, setIsScrollingDown] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY);

            // Only update if scroll difference is significant enough
            if (scrollDifference < debounce) return;

            const scrollingDown = currentScrollY > lastScrollY;
            setIsScrollingDown(scrollingDown);

            // Always show header at top of page
            if (currentScrollY < 10) {
                setIsVisible(true);
            }
            // Show header when scrolling up
            else if (!scrollingDown) {
                setIsVisible(true);
            }
            // Hide header when scrolling down past threshold
            else if (scrollingDown && currentScrollY > threshold) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        // Throttle scroll events for better performance
        const throttledHandleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleScroll, 10);
        };

        window.addEventListener("scroll", throttledHandleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", throttledHandleScroll);
            clearTimeout(timeoutId);
        };
    }, [lastScrollY, threshold, debounce]);

    return {
        isVisible,
        isScrollingDown,
        scrollY: lastScrollY,
    };
};
