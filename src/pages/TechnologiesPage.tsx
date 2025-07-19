import React from "react";
import Header from "@/components/Header";
import Technologies from "@/components/Technologies";
import Footer from "@/components/Footer";

const TechnologiesPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <Technologies />
            </main>
            <Footer />
        </div>
    );
};

export default TechnologiesPage;
