import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline>
                    <source
                        src="/hero_video.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/50 md:bg-black/40"></div>
            </div>

            <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl animate-float z-10"></div>
            <div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/8 rounded-full blur-3xl animate-float z-10"
                style={{ animationDelay: "2s" }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-80 md:h-80 bg-primary/6 rounded-full blur-3xl animate-pulse-slow z-10"></div>

            <div className="saas-container relative z-20 px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-6xl mx-auto animate-fade-in">
                    <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-primary/10 border border-primary/20 text-xs md:text-sm font-semibold text-primary mb-6 md:mb-8 shadow-lg backdrop-blur-sm">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2 md:mr-3 animate-pulse"></span>
                        Industry-Leading 3D Printing Solutions
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 leading-tight">
                        <span className="text-white drop-shadow-lg block">
                            Transform Your Ideas Into
                        </span>
                        <span className="text-primary drop-shadow-lg block">
                            Precision Reality
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md px-4">
                        Professional 3D printing services across FDM, SLA, SLS
                        technologies. From rapid prototyping to production-grade
                        manufacturing—delivered with precision and speed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16 px-4">
                        <Link to="/quote">
                            <Button
                                size="lg"
                                className="saas-button-primary text-base md:text-lg px-8 py-3 md:px-10 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                                Get Instant Quote
                                <svg
                                    className="w-4 h-4 md:w-5 md:h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </Button>
                        </Link>
                        <Link to="/portfolio">
                            <Button
                                variant="outline"
                                size="lg"
                                className="saas-button-secondary text-base md:text-lg px-8 py-3 md:px-10 md:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                                View Portfolio
                                <svg
                                    className="w-4 h-4 md:w-5 md:h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 dark:text-white/80 text-gray-800 px-4">
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium px-3 py-2 md:px-4 md:py-2 glass-card rounded-lg backdrop-blur-md">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>ISO 9001 Certified</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium px-3 py-2 md:px-4 md:py-2 glass-card rounded-lg backdrop-blur-md">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span>24/7 Support</span>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm font-medium px-3 py-2 md:px-4 md:py-2 glass-card rounded-lg backdrop-blur-md">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <span>Global Shipping</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/60 rounded-full flex justify-center">
                    <div className="w-1 h-2 md:h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
