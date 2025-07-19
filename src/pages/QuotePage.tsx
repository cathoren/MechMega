import React from "react";
import Header from "@/components/Header";
import QuotingTool from "@/components/QuotingTool";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";

const QuotePage = () => {
    return (
        <ProtectedRoute redirectMessage="Please sign in to access our quoting tools and get personalized pricing">
            <div className="min-h-screen">
                <Header />
                <main className="pt-20">
                    <QuotingTool />
                </main>
                <Footer />
            </div>
        </ProtectedRoute>
    );
};

export default QuotePage;
