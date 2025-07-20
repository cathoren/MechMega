import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Wifi, WifiOff } from "lucide-react";

const NetworkStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowAlert(true);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        if (!isOnline) {
            setShowAlert(true);
        }

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, [isOnline]);

    if (!showAlert) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
            <Alert
                className={`shadow-lg border-l-4 ${
                    isOnline
                        ? "border-l-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                        : "border-l-red-500 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                }`}>
                {isOnline ? (
                    <Wifi className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                    <WifiOff className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
                <AlertDescription
                    className={`${
                        isOnline
                            ? "text-green-800 dark:text-green-200"
                            : "text-red-800 dark:text-red-200"
                    }`}>
                    {isOnline ? (
                        <>
                            <strong>Connection restored!</strong> All features
                            are now available.
                        </>
                    ) : (
                        <>
                            <strong>You're offline.</strong> Some features may
                            be limited.
                        </>
                    )}
                </AlertDescription>
            </Alert>
        </div>
    );
};

export default NetworkStatus;
