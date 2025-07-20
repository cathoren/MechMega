import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Layers, Settings, Zap, Cog, Link } from "lucide-react";

const SLSTechnology = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="saas-section">
                    <div className="saas-container">
                        <div className="max-w-4xl mx-auto">
                            <Link
                                to="/technologies"
                                className="mb-4 inline-flex items-center text-sm text-primary hover:underline">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Technologies
                            </Link>

                            <div className="text-center mb-12">
                                <h1 className="saas-heading mb-4">
                                    SLS Technology
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Selective Laser Sintering
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                                <Card className="tech-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Settings className="w-5 h-5 mr-2 text-primary" />
                                            How It Works
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Fine powder spread in thin
                                                    layers
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Laser selectively fuses
                                                    powder particles
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Unfused powder acts as
                                                    support
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    No support structures
                                                    required
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="tech-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Zap className="w-5 h-5 mr-2 text-primary" />
                                            Key Advantages
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    No support structures needed
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Strong, durable parts
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Complex moving assemblies
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Production-ready quality
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                                <Card className="tech-card">
                                    <CardHeader>
                                        <CardTitle>
                                            Machine Specifications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">
                                                    Build Volume
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            150 × 150 × 150 mm
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">
                                                    Available Materials
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            PA11 (Nylon 11)
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            PA12 (Nylon 12)
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            TPU (Flexible)
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="tech-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Cog className="w-5 h-5 mr-2 text-primary" />
                                            Applications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Functional end-use parts
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Complex mechanical
                                                    assemblies
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Aerospace components
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>Automotive parts</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>Medical devices</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="text-center">
                                <Button
                                    size="lg"
                                    className="saas-button-primary">
                                    Get Quote for SLS Printing
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default SLSTechnology;
