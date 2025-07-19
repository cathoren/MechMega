import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GallerySample {
    id: string;
    title: string;
    technology: string;
    material: string;
    description: string;
    image: string;
    specs: Record<string, string>;
}

interface Technology {
    name: string;
    fullName: string;
    description: string;
    color: string;
}

interface GalleryConfig {
    samples: GallerySample[];
    technologies: Technology[];
}

const Gallery = () => {
    const [galleryData, setGalleryData] = useState<GalleryConfig | null>(null);
    const [selectedTech, setSelectedTech] = useState<string>("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/gallery-config.json")
            .then((response) => response.json())
            .then((data: GalleryConfig) => {
                setGalleryData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading gallery config:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="animate-pulse">Loading gallery...</div>
                </div>
            </section>
        );
    }

    if (!galleryData) {
        return null;
    }

    const filteredSamples =
        selectedTech === "All"
            ? galleryData.samples
            : galleryData.samples.filter(
                  (sample) => sample.technology === selectedTech
              );

    const technologies = [
        "All",
        ...galleryData.technologies.map((tech) => tech.name),
    ];

    return (
        <section
            id="gallery"
            className="saas-section">
            <div className="saas-container">
                <div className="text-center mb-12 md:mb-16 animate-fade-in">
                    <h2 className="saas-heading mb-4">Sample Gallery</h2>
                    <p className="saas-text text-lg md:text-xl max-w-3xl mx-auto">
                        Explore our portfolio of high-quality 3D printed parts
                        across different technologies
                    </p>
                </div>

                {/* Technology Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
                    {technologies.map((tech) => (
                        <Button
                            key={tech}
                            variant={
                                selectedTech === tech ? "default" : "outline"
                            }
                            onClick={() => setSelectedTech(tech)}
                            className="transition-all duration-300 text-sm md:text-base px-3 py-2 md:px-4 md:py-2">
                            {tech}
                        </Button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredSamples.map((sample, index) => (
                        <Card
                            key={sample.id}
                            className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in"
                            style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={sample.image}
                                    alt={sample.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <CardContent className="p-4 md:p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-base md:text-lg font-semibold">
                                        {sample.title}
                                    </h3>
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                        {sample.technology}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    {sample.description}
                                </p>
                                <div className="text-sm">
                                    <p className="font-medium mb-2">
                                        Material: {sample.material}
                                    </p>
                                    <div className="space-y-1">
                                        {Object.entries(sample.specs).map(
                                            ([key, value]) => (
                                                <div
                                                    key={key}
                                                    className="flex justify-between">
                                                    <span className="text-muted-foreground">
                                                        {key}:
                                                    </span>
                                                    <span>{value}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
