import React from "react";
import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

const PortfolioPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <Gallery />
            </main>
            <Footer />
        </div>
    );
};

export default PortfolioPage;
