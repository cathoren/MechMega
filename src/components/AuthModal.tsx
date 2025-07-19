import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultMode?: "login" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({
    isOpen,
    onClose,
    defaultMode = "login",
}) => {
    const [mode, setMode] = useState<"login" | "signup">(defaultMode);

    const handleClose = () => {
        onClose();
        setTimeout(() => setMode(defaultMode), 300);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md w-full mx-4 p-0 border-0 bg-white/95 dark:bg-card/95 backdrop-blur-xl shadow-2xl modal-content">
                <VisuallyHidden asChild>
                    <DialogTitle>
                        {mode === "login" ? "Sign In" : "Create Account"}
                    </DialogTitle>
                </VisuallyHidden>
                <VisuallyHidden asChild>
                    <DialogDescription>
                        {mode === "login"
                            ? "Enter your credentials to sign in to your account"
                            : "Fill out the form to create a new account"}
                    </DialogDescription>
                </VisuallyHidden>

                {/* Form content */}
                <div className="p-6 pt-8">
                    {mode === "login" ? (
                        <LoginForm
                            onSwitchToSignup={() => setMode("signup")}
                            onClose={handleClose}
                        />
                    ) : (
                        <SignupForm
                            onSwitchToLogin={() => setMode("login")}
                            onClose={handleClose}
                        />
                    )}
                </div>

                {/* Decorative background elements */}
                <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
