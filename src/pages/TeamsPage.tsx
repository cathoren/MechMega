import React from "react";
import Header from "@/components/Header";
import Teams from "@/components/Teams";
import Footer from "@/components/Footer";

const TeamsPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <Teams />
            </main>
            <Footer />
        </div>
    );
};

export default TeamsPage;
