import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { enableNetwork, disableNetwork } from "firebase/firestore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wifi, WifiOff } from "lucide-react";

export const ConnectionStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isFirestoreConnected, setIsFirestoreConnected] = useState(true);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            enableNetwork(db)
                .then(() => {
                    setIsFirestoreConnected(true);
                    console.log("Firestore reconnected");
                })
                .catch(console.error);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setIsFirestoreConnected(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!isOnline || !isFirestoreConnected) {
        return (
            <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
                <WifiOff className="h-4 w-4" />
                <AlertDescription>
                    {!isOnline
                        ? "You're offline. Some features may not work properly."
                        : "Firestore connection lost. Retrying..."}
                </AlertDescription>
            </Alert>
        );
    }

    return null;
};

export default ConnectionStatus;
