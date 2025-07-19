import { useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";

export const useAuthNavigation = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const navigateToQuote = (onLoginRequired?: () => void) => {
        if (isAuthenticated) {
            navigate("/quote");
        } else {
            if (onLoginRequired) {
                onLoginRequired();
            }
        }
    };

    const requireAuth = (
        callback: () => void,
        onLoginRequired?: () => void
    ) => {
        if (isAuthenticated) {
            callback();
        } else {
            if (onLoginRequired) {
                onLoginRequired();
            }
        }
    };

    return {
        navigateToQuote,
        requireAuth,
        isAuthenticated,
    };
};
