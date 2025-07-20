import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Settings, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const SLATechnology = () => {
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
                                    SLA Technology
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Stereolithography
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
                                                    Liquid photopolymer resin in
                                                    vat
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    UV laser selectively cures
                                                    resin layer by layer
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Build platform moves up
                                                    between layers
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Post-processing wash and UV
                                                    cure
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="tech-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Target className="w-5 h-5 mr-2 text-primary" />
                                            Key Advantages
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Exceptional surface finish
                                                    quality
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Ultra-fine detail resolution
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    High dimensional accuracy
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Complex geometries possible
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
                                                            277.85 × 156.26 ×
                                                            300 mm
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
                                                            Standard Resin
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            ABS-Like Resin
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Flexible Rubber
                                                            Resin
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            High Tough Resin
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Clear Transparent
                                                            Resin
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
                                            <Sparkles className="w-5 h-5 mr-2 text-primary" />
                                            Applications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    High-detail miniatures and
                                                    figurines
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Jewelry and decorative items
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Dental and medical models
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Precision prototypes
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Master patterns for casting
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
                                    Get Quote for SLA Printing
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

export default SLATechnology;
