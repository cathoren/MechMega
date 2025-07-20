import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
    message?: string;
    showLogo?: boolean;
    fullScreen?: boolean;
    className?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
    message = "Loading...",
    showLogo = true,
    fullScreen = true,
    className = "",
}) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        : "flex items-center justify-center p-8";

    return (
        <div className={`${containerClasses} ${className}`}>
            <div className="text-center space-y-6">
                {showLogo && (
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            {/* MechMega Logo */}
                            <div className="w-20 h-20 bg-blue-950 rounded-xl flex items-center justify-center shadow-lg">
                                <img
                                    src="/logo/mechmega_logo.png"
                                    alt="MechMega Logo"
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                            {/* Animated ring around logo */}
                            <div className="absolute inset-0 rounded-xl border-2 border-yellow-500/30 animate-pulse"></div>
                        </div>
                    </div>
                )}

                {/* Main loading spinner */}
                <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                </div>

                {/* Loading message */}
                <div className="space-y-2">
                    <p className="text-lg font-medium text-foreground">
                        {message}
                    </p>

                    {/* Loading dots animation */}
                    <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                        <div
                            className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}></div>
                        <div
                            className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}></div>
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-loading-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
