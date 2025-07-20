import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Zap, Settings, Target, Timer } from "lucide-react";
import { Link } from "react-router-dom";

const MJFTechnology = () => {
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
                                    MJF Technology
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Multi Jet Fusion
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
                                                    Powder bed spreads uniformly
                                                    across build platform
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Fusing agent applied to
                                                    areas to be printed
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Infrared energy fuses powder
                                                    particles together
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Process repeats layer by
                                                    layer
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
                                                    High productivity rates
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Excellent surface quality
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Consistent mechanical
                                                    properties
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Fine detail resolution
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
                                                    HP Jet Fusion 5200
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Build volume:
                                                            380×284×380mm
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Layer thickness:
                                                            0.08mm
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Materials: PA12,
                                                            PA12 Glass Filled
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">
                                                    Print Speed
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Up to 5,000 cm³/hr
                                                            build rate
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Fast turnaround
                                                            times
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
                                            <Target className="w-5 h-5 mr-2 text-primary" />
                                            Applications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    High-volume production runs
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Functional end-use parts
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Automotive components
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>Industrial tooling</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Medical device components
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="text-center">
                                <Button
                                    size="lg"
                                    className="saas-button-primary">
                                    Get Quote for MJF Printing
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

export default MJFTechnology;
