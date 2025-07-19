import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Palette, Settings, Target, Sparkles } from "lucide-react";

const PolyjetTechnology = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="saas-section">
                    <div className="saas-container">
                        <div className="max-w-4xl mx-auto">
                            <Button
                                variant="ghost"
                                className="mb-8 text-muted-foreground hover:text-foreground"
                                onClick={() => window.history.back()}>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Technologies
                            </Button>

                            <div className="text-center mb-12">
                                <h1 className="saas-heading mb-4">
                                    Polyjet Technology
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Multi-material printing with photopolymers
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
                                                    Photopolymer resin jetted
                                                    through print heads
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    UV light instantly cures
                                                    deposited material
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Multiple materials printed
                                                    simultaneously
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Support material
                                                    automatically removed
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="tech-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Sparkles className="w-5 h-5 mr-2 text-primary" />
                                            Key Advantages
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Multi-material capability
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>Full color printing</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Smooth surface finish
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Rubber-like materials
                                                    available
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
                                                    Stratasys J55
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Build volume:
                                                            255×252×200mm
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Layer thickness:
                                                            0.014mm
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Up to 5 materials
                                                            simultaneously
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">
                                                    Material Options
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Rigid photopolymers
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Flexible rubber-like
                                                            materials
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Transparent
                                                            materials
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
                                                    Realistic prototypes with
                                                    overmolding
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Multi-color architectural
                                                    models
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Medical training models
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Consumer product prototypes
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Jigs and fixtures with soft
                                                    grips
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
                                    Get Quote for Polyjet Printing
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

export default PolyjetTechnology;
