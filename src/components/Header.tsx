import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import AuthModal from "./AuthModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState<"login" | "signup">(
        "login"
    );

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const openLoginModal = () => {
        setAuthModalMode("login");
        setIsAuthModalOpen(true);
    };

    const handleLogout = () => {
        logout();
    };

    const navigationItems = [
        { href: "/", label: "Home" },
        { href: "/technologies", label: "Technologies" },
        { href: "/portfolio", label: "Sample Gallery" },
        { href: "/quote", label: "Get Quote" },
        { href: "/contact", label: "Contact" },
        { href: "/team", label: "Team" },
    ];

    return (
        <header className="fixed top-0 z-50 w-full h-28 bg-blue-950 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-600/50 transition-all duration-300">
            <div className="saas-container flex  items-center justify-between h-full">
                <div className="flex flex-col items-center relative">
                    <div>
                        <Link to={"/"}>
                            <img
                                src="/logo/mechmega_logo.png"
                                className="w-44 md:w-64 h-20 object-cover"
                                alt="MechMega Logo"
                            />
                        </Link>
                    </div>
                    <div className="absolute bottom-[-10px] sm:bottom-[-15px] left-0 right-0 text-center">
                        <p className="text-bold text-sm lg:text-base text-primary">
                            Quality Redefined
                        </p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex justify-between items-center space-x-2">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="relative px-4 py-2 text-sm xl:text-lg font-medium text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/50 group">
                            {item.label}
                            <div className="absolute inset-x-2 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Authentication buttons */}
                    {!isAuthenticated ? (
                        <div className="hidden sm:flex items-center space-x-2">
                            <Button
                                size="lg"
                                onClick={openLoginModal}
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700  text-secondary font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Login{" "}
                            </Button>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center space-x-3">
                            <span className="text-sm text-slate-200 hidden md:block">
                                Welcome, {user?.name}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-8 h-8 p-0 rounded-full hover:bg-slate-100/80 dark:hover:bg-slate-700/50 transition-all duration-300">
                                        <User className="w-4 h-4 text-slate-200" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/profile"
                                            className="flex items-center space-x-2 w-full">
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="flex items-center space-x-2 text-red-600 focus:text-red-600">
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden w-10 h-10 p-0 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/50 transition-all duration-30 text-slate-100"
                        onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </Button>
                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="w-10 h-10 p-0 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 text-slate-100">
                        <div className="relative w-5 h-5">
                            {theme === "dark" ? (
                                <svg
                                    className="w-5 h-5 transition-all duration-500 rotate-0 scale-100"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5 transition-all duration-500 rotate-90 scale-100"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </div>
                    </Button>

                    {/* CTA Button */}
                    {isAuthenticated ? (
                        <Link
                            to="/quote"
                            className="hidden sm:block">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-semibold px-4 md:px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
                                Get Quote
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            size="sm"
                            onClick={openLoginModal}
                            className="hidden sm:block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-semibold px-4 md:px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
                            Get Quote
                        </Button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-secondary/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-600/50 shadow-lg">
                    <nav className="container mx-auto px-4 py-4 space-y-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/50"
                                onClick={() => setIsMenuOpen(false)}>
                                {item.label}
                            </Link>
                        ))}

                        {/* Mobile auth buttons */}
                        {!isAuthenticated ? (
                            <div className="md:hidden pt-4 space-y-2 border-t border-slate-200 dark:border-slate-600">
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        openLoginModal();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-secondary ">
                                    Login
                                </Button>
                            </div>
                        ) : (
                            <div className="pt-4 space-y-2 border-t border-slate-200 dark:border-slate-600">
                                <div className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400">
                                    Welcome, {user?.name}
                                </div>
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/50">
                                    Profile Settings
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700">
                                    Sign Out
                                </Button>
                            </div>
                        )}

                        {/* Get Quote Button for Mobile */}
                        {isAuthenticated ? (
                            <Link
                                to="/quote"
                                className="block mt-4 "
                                onClick={() => setIsMenuOpen(false)}>
                                <Button
                                    size="sm"
                                    className="md:hidden w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                    Get a Quote
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => {
                                    openLoginModal();
                                    setIsMenuOpen(false);
                                }}
                                className="md:hidden w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                Get a Quote
                            </Button>
                        )}
                    </nav>
                </div>
            )}

            {/* Auth Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                defaultMode={authModalMode}
            />
        </header>
    );
};

export default Header;
