import React from "react";
import Header from "@/components/Header";
import QuotingTool from "@/components/QuotingTool";
import Footer from "@/components/Footer";

const QuotePage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <QuotingTool />
            </main>
            <Footer />
        </div>
    );
};

export default QuotePage;
