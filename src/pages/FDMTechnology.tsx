import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Settings, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const FDMTechnology = () => {
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

                            <div
                                id="fdm-technology"
                                className="text-center mb-12">
                                <h1 className="saas-heading mb-4">
                                    FDM Technology
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Fused Deposition Modeling
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
                                                    Thermoplastic filament
                                                    heated to melting point
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Extruded through heated
                                                    nozzle layer by layer
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Material cools and
                                                    solidifies upon deposition
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Build platform moves down
                                                    for each new layer
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
                                                    Large build volumes
                                                    available
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Wide range of materials
                                                    supported
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Cost-effective for
                                                    prototyping
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Suitable for functional
                                                    parts
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
                                                    Open FDM Printer
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Build volume:
                                                            450×450×450mm
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Materials: PLA,
                                                            PETG, TPU, TPE
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-2">
                                                    Enclosed High-Temp Printer
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Build volume:
                                                            256×256×256mm
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3"></span>
                                                        <span>
                                                            Materials: ABS, ASA,
                                                            PC, Composites
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
                                            <Shield className="w-5 h-5 mr-2 text-primary" />
                                            Applications
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Rapid prototyping and
                                                    concept models
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
                                                    Jigs, fixtures, and tooling
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Architectural models
                                                </span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                                                <span>
                                                    Educational and hobby
                                                    projects
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
                                    Get Quote for FDM Printing
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

export default FDMTechnology;
