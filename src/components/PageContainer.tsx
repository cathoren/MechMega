import React from "react";

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
    children,
    className = "",
}) => {
    return (
        <div className={`min-h-screen ${className}`}>
            {/* Header spacer - ensures content doesn't go under header when it's visible */}
            <div className="h-28" />
            {children}
        </div>
    );
};

export default PageContainer;
