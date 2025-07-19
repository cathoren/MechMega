import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-blue-950 border-t py-8 md:py-12 text-primary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {/* Company Info */}
                    <div className="flex flex-col items-center relative">
                        <div>
                            <Link to={"/"}>
                                <img
                                    src="/logo/mechmega_logo.png"
                                    className="w-44 md:w-64 h-20 object-cover"
                                    alt="MechMega Logo"
                                />
                            </Link>
                        </div>
                        <div className="absolute bottom-[-10px] sm:bottom-[-15px] left-0 right-0 text-center">
                            <p className="text-bold text-sm lg:text-base text-primary">
                                Quality Redefined
                            </p>
                        </div>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h3 className="font-semibold mb-4 text-base md:text-lg">
                            Technologies
                        </h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>
                                <Link
                                    to="/technology/fdm"
                                    className="hover:text-primary transition-colors text-sm md:text-base">
                                    FDM Printing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/technology/sla"
                                    className="hover:text-primary transition-colors text-sm md:text-base">
                                    SLA Printing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/technology/sls"
                                    className="hover:text-primary transition-colors text-sm md:text-base">
                                    SLS Printing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/technology/mjf"
                                    className="hover:text-primary transition-colors text-sm md:text-base">
                                    MJF Technology
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/technology/polyjet"
                                    className="hover:text-primary transition-colors text-sm md:text-base">
                                    Polyjet Printing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/technology/metal"
                                    className="hover:text-primary transition-colors text-sm md:text-base">
                                    Metal 3D Printing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4 text-base md:text-lg">
                            Contact
                        </h3>
                        <div className="space-y-2 text-muted-foreground">
                            <p className="text-sm md:text-base">
                                connect@MechMega.com
                            </p>
                            <p className="text-sm md:text-base">
                                Professional 3D Printing Services
                            </p>
                            <p className="text-sm md:text-base">
                                Quote requests processed within 24 hours
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-muted-foreground">
                    <p className="text-sm md:text-base">
                        &copy; 2024 MechMega. All rights reserved. Professional
                        3D printing solutions.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
