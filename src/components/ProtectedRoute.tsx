import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Lock, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectMessage?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectMessage = "Please sign in to access this page",
}) => {
    const { isAuthenticated } = useAuth();
    const { toast } = useToast();
    const [showAuthModal, setShowAuthModal] = React.useState(false);

    React.useEffect(() => {
        if (!isAuthenticated) {
            toast({
                title: "Authentication Required",
                description: "Please sign in to access this feature",
                variant: "default",
            });
        }
    }, [isAuthenticated, toast]);

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-md mx-auto border border-border/50 shadow-xl bg-card/80 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700  text-secondary font-semibold px-4 py-2 hover:shadow-xl rounded-full flex items-center justify-center shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700   px-4 py-2 rounded-lg shadow-lg hover:shadow-xl bg-clip-text text-transparent">
                            Authentication Required
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-base">
                            {redirectMessage}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col space-y-3">
                            <Button
                                onClick={() => setShowAuthModal(true)}
                                className="w-full h-11 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700  text-secondary font-semibold px-4 py-2 transition-all duration-300 transform hover:scale-105">
                                <User className="w-4 h-4 mr-2" />
                                Sign In / Sign Up
                            </Button>

                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Lock className="w-4 h-4" />
                                <span>Secure authentication required</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground text-center">
                                Access to our quoting tools and premium features
                                requires an account for security and
                                personalization.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                defaultMode="login"
            />
        </div>
    );
};

export default ProtectedRoute;
