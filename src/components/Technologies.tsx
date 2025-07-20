import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { technologies } from "@/utils/technologyData";

const Technologies = () => {
    return (
        <section
            id="technologies"
            className="saas-section">
            <div className="saas-container">
                <div className="text-center mb-12 md:mb-16 animate-fade-in">
                    <h2 className="saas-heading mb-4">Our Technologies</h2>
                    <p className="saas-text text-lg md:text-xl max-w-3xl mx-auto">
                        Complete spectrum of 3D printing technologies for your
                        specific requirements
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 md:gap-8 items-center justify-center">
                    {technologies.map((tech, index) => {
                        return (
                            <Card
                                key={tech.name}
                                className="tech-card group animate-slide-up relative overflow-hidden h-full sm:w-5/6 mx-auto"
                                style={{ animationDelay: `${index * 100}ms` }}>
                                {/* Image Section */}
                                <div className="relative h-40 md:h-80 overflow-hidden">
                                    <img
                                        src={tech.image}
                                        alt={tech.fullName}
                                        className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                                        onError={(e) => {
                                            e.currentTarget.style.display =
                                                "none";
                                            const fallbackDiv = e.currentTarget
                                                .nextElementSibling as HTMLElement;
                                            if (fallbackDiv) {
                                                fallbackDiv.style.display =
                                                    "flex";
                                            }
                                        }}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    {/* Technology name overlay */}
                                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-base md:text-lg font-bold">
                                            {tech.name}
                                        </h3>
                                    </div>
                                </div>

                                <CardHeader className="pb-3 md:pb-4">
                                    <CardTitle className="text-lg md:text-xl text-foreground">
                                        {tech.fullName}
                                    </CardTitle>
                                    <p className="text-xs md:text-sm font-medium text-primary">
                                        {tech.name}
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-3 md:space-y-4 flex-1">
                                    <p className="saas-text text-sm md:text-base">
                                        {tech.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {tech.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start text-xs md:text-sm">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
                                                <span className="text-muted-foreground">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <Link to={tech.link}>
                                        <Button
                                            size="sm"
                                            className="bg-transparent border border-primary backdrop:blur-lg text-primary hover:bg-primary/10 transition-colors duration-300 shadow-sm hover:shadow-md text-xs md:text-sm">
                                            View
                                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Technologies;
