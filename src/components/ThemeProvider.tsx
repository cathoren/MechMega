// import React, { createContext, useContext, useEffect, useState } from "react";

// type Theme = "light";

// type ThemeProviderContextType = {
//     theme: Theme;
//     setTheme: (theme: Theme) => void;
//     toggleTheme: () => void;
// };

// const ThemeProviderContext = createContext<
//     ThemeProviderContextType | undefined
// >(undefined);

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//     const [theme, setTheme] = useState<Theme>(() => {
//         // Get theme from localStorage on initial load, fallback to 'dark'
//         if (typeof window !== "undefined") {
//             const savedTheme = localStorage.getItem("theme") as Theme;
//             return savedTheme || "dark";
//         }
//         return "dark";
//     });

//     useEffect(() => {
//         const root = window.document.documentElement;
//         root.classList.remove("light", "dark");
//         root.classList.add(theme);

//         // Save theme to localStorage whenever it changes
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
//     };

//     return (
//         <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
//             {children}
//         </ThemeProviderContext.Provider>
//     );
// }

// export const useTheme = () => {
//     const context = useContext(ThemeProviderContext);
//     if (context === undefined) {
//         throw new Error("useTheme must be used within a ThemeProvider");
//     }
//     return context;
// };
