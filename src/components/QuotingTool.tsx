import React, { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ThreeSTLProcessor } from "@/utils/threeStlProcessor";
import STLPreview from "@/components/STLPreview";
import PriceBreakdownDialog from "@/components/PriceBreakdownDialog";
import {
    materialOptions,
    colors,
    finishColors,
    materialProperties,
    technologySettings,
    simpleQuoteOptions,
} from "@/utils/quotingData";
import {
    HelpCircle,
    Lightbulb,
    Shield,
    Zap,
    DollarSign,
    Clock,
    Info,
    ChevronRight,
    FileText,
    Settings,
    Wand2,
} from "lucide-react";
import * as THREE from "three";

interface STLStats {
    surfaceArea: number;
    volume: number;
    triangleCount: number;
    boundingBox: {
        min: { x: number; y: number; z: number };
        max: { x: number; y: number; z: number };
    };
}

interface PriceBreakdown {
    materialCost: number;
    printingCost: number;
    finishingCost: number;
    setupCost: number;
    postProcessingCost: number;
    total: number;
    breakdown: {
        baseMaterial: number;
        supportMaterial: number;
        printTime: number;
        machineCost: number;
        laborCost: number;
        overhead: number;
    };
}

// interface MaterialProperties {
//     name: string;
//     pricePerGram: number;
//     density: number; // g/cm³
//     printSpeed: number; // mm/min
//     complexityMultiplier: number;
//     supportRequired: boolean;
//     postProcessingTime: number; // minutes
// }

// interface TechnologySettings {
//     baseSetupCost: number;
//     machineHourlyRate: number;
//     laborHourlyRate: number;
//     overheadMultiplier: number;
//     qualityLevels: {
//         low: { speedMultiplier: number; qualityMultiplier: number };
//         medium: { speedMultiplier: number; qualityMultiplier: number };
//         high: { speedMultiplier: number; qualityMultiplier: number };
//     };
// }

const QuotingTool = () => {
    const [technology, setTechnology] = useState("FDM");
    const [stlFile, setStlFile] = useState<File | null>(null);
    const [stlStats, setStlStats] = useState<STLStats | null>(null);
    const [stlGeometry, setStlGeometry] = useState<THREE.BufferGeometry | null>(
        null
    );
    const [processing, setProcessing] = useState(false);
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [infill, setInfill] = useState([50]);
    const [layerHeight, setLayerHeight] = useState("0.2");
    const [quality, setQuality] = useState("medium");
    const [finish, setFinish] = useState(false);
    const [primer, setPrimer] = useState(false);
    const [finishColor, setFinishColor] = useState(false);
    const [notes, setNotes] = useState("");
    const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(
        null
    );
    const [showPriceDialog, setShowPriceDialog] = useState(false);
    const [quoteMode, setQuoteMode] = useState<"simple" | "advanced">(
        "advanced"
    );
    const [selectedApplication, setSelectedApplication] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("");
    const [selectedTimeframe, setSelectedTimeframe] = useState("standard");
    const [simpleDescription, setSimpleDescription] = useState("");

    const { toast } = useToast();

    const calculatePrice = useCallback((): PriceBreakdown => {
        if (!stlStats || !material) {
            return {
                materialCost: 0,
                printingCost: 0,
                finishingCost: 0,
                setupCost: 0,
                postProcessingCost: 0,
                total: 0,
                breakdown: {
                    baseMaterial: 0,
                    supportMaterial: 0,
                    printTime: 0,
                    machineCost: 0,
                    laborCost: 0,
                    overhead: 0,
                },
            };
        }

        const materialProps =
            materialProperties[material as keyof typeof materialProperties];
        if (!materialProps) {
            return {
                materialCost: 0,
                printingCost: 0,
                finishingCost: 0,
                setupCost: 0,
                postProcessingCost: 0,
                total: 0,
                breakdown: {
                    baseMaterial: 0,
                    supportMaterial: 0,
                    printTime: 0,
                    machineCost: 0,
                    laborCost: 0,
                    overhead: 0,
                },
            };
        }

        const techSettings = technologySettings[technology];
        const qualitySettings =
            techSettings.qualityLevels[
                quality as keyof typeof techSettings.qualityLevels
            ];

        // Calculate effective volume based on technology
        let effectiveVolume = stlStats.volume; // in cm³

        if (technology === "FDM") {
            // For FDM, consider infill percentage
            effectiveVolume = stlStats.volume * (infill[0] / 100);
        }

        // Calculate weight
        const weightGrams = effectiveVolume * materialProps.density;

        // Base material cost
        const baseMaterial = weightGrams * materialProps.pricePerGram;

        // Support material cost (if required)
        let supportMaterial = 0;
        if (materialProps.supportRequired) {
            const supportVolume = effectiveVolume * 0.15; // Estimate 15% support material
            supportMaterial =
                supportVolume *
                materialProps.density *
                materialProps.pricePerGram *
                0.8;
        }

        // Calculate print time based on technology and complexity
        const { min, max } = stlStats.boundingBox;
        const height = max.z - min.z;
        const layerHeightNum =
            technology === "FDM" ? parseFloat(layerHeight) : 0.05;
        const layers = height / layerHeightNum;

        // Estimate print time in hours
        let printTime: number;
        if (technology === "FDM") {
            const volumePerLayer = effectiveVolume / layers;
            printTime =
                (layers * volumePerLayer * materialProps.complexityMultiplier) /
                (materialProps.printSpeed *
                    qualitySettings.speedMultiplier *
                    60);
        } else if (technology === "SLA") {
            printTime = (layers * 0.5) / 60; // 30 seconds per layer average
        } else if (technology === "SLS") {
            printTime = Math.max(6, effectiveVolume / 20); // Minimum 6 hours, or volume-based
        } else {
            // Metal
            printTime = Math.max(8, effectiveVolume / 5); // Minimum 8 hours for metal
        }

        printTime *= qualitySettings.speedMultiplier;

        // Machine and labor costs
        const machineCost = printTime * techSettings.machineHourlyRate;
        const laborCost =
            (printTime * 0.3 + materialProps.postProcessingTime / 60) *
            techSettings.laborHourlyRate;

        // Setup cost
        const setupCost = techSettings.baseSetupCost;

        // Post-processing cost
        const postProcessingCost =
            (materialProps.postProcessingTime / 60) *
            techSettings.laborHourlyRate;

        // Calculate costs
        const materialCost = baseMaterial + supportMaterial;
        const printingCost = machineCost + setupCost;

        // Overhead
        const subtotal = materialCost + printingCost + postProcessingCost;
        const overhead = subtotal * (techSettings.overheadMultiplier - 1);

        // Finishing costs
        let finishingCost = 0;
        if (finish) {
            finishingCost += primer ? 1660 : 0;
            finishingCost += finishColor ? 2905 : 0;
        }

        const total = subtotal + overhead + finishingCost;

        return {
            materialCost,
            printingCost,
            finishingCost,
            setupCost,
            postProcessingCost,
            total,
            breakdown: {
                baseMaterial,
                supportMaterial,
                printTime,
                machineCost,
                laborCost,
                overhead,
            },
        };
    }, [
        stlStats,
        material,
        technology,
        infill,
        layerHeight,
        quality,
        finish,
        primer,
        finishColor,
    ]);

    useEffect(() => {
        if (stlStats && material) {
            setPriceBreakdown(calculatePrice());
        }
    }, [
        stlStats,
        material,
        technology,
        infill,
        layerHeight,
        quality,
        finish,
        primer,
        finishColor,
        calculatePrice,
    ]);

    const handleFileUpload = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            if (!file.name.toLowerCase().endsWith(".stl")) {
                toast({
                    title: "Invalid file type",
                    description: "Please upload an STL file only.",
                    variant: "destructive",
                });
                return;
            }

            setStlFile(file);
            setProcessing(true);

            try {
                const { stats, geometry } = await ThreeSTLProcessor.processFile(
                    file
                );
                setStlStats(stats);
                setStlGeometry(geometry);
                toast({
                    title: "STL file processed",
                    description: `Triangles: ${
                        stats.triangleCount
                    }, Volume: ${stats.volume.toFixed(2)} cm³`,
                });
            } catch (error) {
                toast({
                    title: "Processing Error",
                    description: "Invalid STL format",
                    variant: "destructive",
                });
            } finally {
                setProcessing(false);
            }
        },
        [toast]
    );

    const handleSubmitQuote = async () => {
        if (!stlFile || !stlStats || !material || !color) {
            toast({
                title: "Missing data",
                description: "Upload STL and fill all fields",
                variant: "destructive",
            });
            return;
        }

        const breakdown = calculatePrice();
        const materialProps = materialProperties[material];
        const effectiveVolume =
            technology === "FDM"
                ? stlStats.volume * (infill[0] / 100)
                : stlStats.volume;
        const weightGrams = effectiveVolume * materialProps.density;

        const quoteData = {
            fileName: stlFile.name,
            technology,
            material,
            materialProperties: {
                density: `${materialProps.density} g/cm³`,
                pricePerGram: `₹${materialProps.pricePerGram.toFixed(3)}`,
                estimatedWeight: `${weightGrams.toFixed(2)} g`,
            },
            color,
            qualityLevel: quality,
            ...(technology === "FDM" && {
                infill: `${infill[0]}%`,
                layerHeight: `${layerHeight}mm`,
            }),
            finish,
            primer: finish ? primer : false,
            finishColor: finish ? finishColor : false,
            stlStats: {
                surfaceArea: `${stlStats.surfaceArea.toFixed(2)} mm²`,
                volume: `${stlStats.volume.toFixed(2)} cm³`,
                effectiveVolume: `${effectiveVolume.toFixed(2)} cm³`,
                boundingBox: {
                    dimensions: `${(
                        stlStats.boundingBox.max.x - stlStats.boundingBox.min.x
                    ).toFixed(1)} × ${(
                        stlStats.boundingBox.max.y - stlStats.boundingBox.min.y
                    ).toFixed(1)} × ${(
                        stlStats.boundingBox.max.z - stlStats.boundingBox.min.z
                    ).toFixed(1)} mm`,
                },
            },
            priceBreakdown: {
                materialCost: `₹${breakdown.materialCost.toFixed(2)}`,
                baseMaterial: `₹${breakdown.breakdown.baseMaterial.toFixed(2)}`,
                supportMaterial: `₹${breakdown.breakdown.supportMaterial.toFixed(
                    2
                )}`,
                printingCost: `₹${breakdown.printingCost.toFixed(2)}`,
                setupCost: `₹${breakdown.setupCost.toFixed(2)}`,
                postProcessingCost: `₹${breakdown.postProcessingCost.toFixed(
                    2
                )}`,
                finishingCost: `₹${breakdown.finishingCost.toFixed(2)}`,
                overhead: `₹${breakdown.breakdown.overhead.toFixed(2)}`,
                estimatedPrintTime: `${breakdown.breakdown.printTime.toFixed(
                    1
                )} hours`,
                total: `₹${breakdown.total.toFixed(2)}`,
            },
            notes,
            timestamp: new Date().toISOString(),
        };

        const newWindow = window.open("", "_blank");
        if (newWindow) {
            newWindow.document.write(`
        <html><head><title>Detailed 3D Printing Quote</title><style>
        body { font-family: 'Courier New', monospace; white-space: pre-wrap; background: #111; color: #eee; padding: 20px; line-height: 1.6; }
        .header { color: #4CAF50; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
        .section { margin-bottom: 15px; padding: 10px; border-left: 3px solid #4CAF50; }
        .price { color: #FFC107; font-weight: bold; }
        </style></head><body>
        <div class="header">MechMega PRINT STUDIO - 3D PRINTING QUOTE</div>
        ${JSON.stringify(quoteData, null, 2)}</body></html>
      `);
            newWindow.document.close();
        }

        toast({
            title: "Detailed Quote Generated",
            description: "Comprehensive pricing breakdown opened in new window",
        });
    };

    const handleSimpleQuote = useCallback(() => {
        const application = simpleQuoteOptions.applications.find(
            (app) => app.id === selectedApplication
        );
        if (!application) return;

        // Auto-set technical parameters based on application
        setTechnology(application.recommendedTech);
        setMaterial(application.recommendedMaterial);
        setQuality(application.recommendedQuality);

        // Switch to advanced mode with pre-filled settings
        setQuoteMode("advanced");

        toast({
            title: "Settings Applied",
            description: `Configured for ${application.name} with recommended settings`,
        });
    }, [selectedApplication, toast]);

    const generateSimpleEstimate = useCallback(() => {
        const application = simpleQuoteOptions.applications.find(
            (app) => app.id === selectedApplication
        );
        const timeframe = simpleQuoteOptions.timeframes.find(
            (tf) => tf.id === selectedTimeframe
        );

        if (!application || !timeframe) return null;

        // Simple estimation based on application type
        let basePrice = 0;
        switch (application.id) {
            case "prototype":
                basePrice = 1500;
                break;
            case "functional":
                basePrice = 5000;
                break;
            case "miniature":
                basePrice = 3000;
                break;
            case "production":
                basePrice = 15000;
                break;
            case "metal":
                basePrice = 50000;
                break;
        }

        const estimatedPrice = basePrice * timeframe.multiplier;
        return {
            application,
            timeframe,
            estimatedPrice,
            priceRange: `₹${Math.round(estimatedPrice * 0.7)} - ₹${Math.round(
                estimatedPrice * 1.3
            )}`,
        };
    }, [selectedApplication, selectedTimeframe]);

    const simpleEstimate = generateSimpleEstimate();

    return (
        <section
            id="quote"
            className="saas-section">
            <div className="saas-container">
                <div className="text-center mb-12 md:mb-16 animate-fade-in">
                    <h2 className="saas-heading mb-4">
                        Get Your 3D Printing Quote
                    </h2>
                    <p className="saas-text text-lg md:text-xl max-w-3xl mx-auto">
                        Choose your preferred quoting method - simple guidance
                        for beginners or advanced options for technical users
                    </p>
                </div>

                {quoteMode === "simple" ? (
                    /* Simple Quote Mode */
                    <div className="space-y-8">
                        {/* Application Selection */}
                        <Card className="tech-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5" />
                                    What do you want to 3D print?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {simpleQuoteOptions.applications.map(
                                        (app) => (
                                            <div
                                                key={app.id}
                                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                                    selectedApplication ===
                                                    app.id
                                                        ? "border-primary bg-primary/5"
                                                        : "border-border hover:border-primary/50"
                                                }`}
                                                onClick={() =>
                                                    setSelectedApplication(
                                                        app.id
                                                    )
                                                }>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <app.icon className="w-6 h-6 text-primary" />
                                                    <h3 className="font-semibold">
                                                        {app.name}
                                                    </h3>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {app.description}
                                                </p>
                                                <div className="flex gap-2 flex-wrap">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs">
                                                        {app.strengthLevel}{" "}
                                                        Strength
                                                    </Badge>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs">
                                                        {app.costLevel} Cost
                                                    </Badge>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs">
                                                        {app.speedLevel} Speed
                                                    </Badge>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Budget & Timeframe */}
                        {selectedApplication && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="tech-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <DollarSign className="w-5 h-5" />
                                            Budget Range
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {simpleQuoteOptions.budgetRanges.map(
                                                (budget) => (
                                                    <div
                                                        key={budget.id}
                                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                                            selectedBudget ===
                                                            budget.id
                                                                ? "border-primary bg-primary/5"
                                                                : "border-border hover:border-primary/50"
                                                        }`}
                                                        onClick={() =>
                                                            setSelectedBudget(
                                                                budget.id
                                                            )
                                                        }>
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <h4 className="font-medium">
                                                                    {
                                                                        budget.name
                                                                    }
                                                                </h4>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        budget.description
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-semibold text-primary">
                                                                    {
                                                                        budget.range
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="tech-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Clock className="w-5 h-5" />
                                            When do you need it?
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {simpleQuoteOptions.timeframes.map(
                                                (timeframe) => (
                                                    <div
                                                        key={timeframe.id}
                                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                                            selectedTimeframe ===
                                                            timeframe.id
                                                                ? "border-primary bg-primary/5"
                                                                : "border-border hover:border-primary/50"
                                                        }`}
                                                        onClick={() =>
                                                            setSelectedTimeframe(
                                                                timeframe.id
                                                            )
                                                        }>
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <h4 className="font-medium">
                                                                    {
                                                                        timeframe.name
                                                                    }
                                                                </h4>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {
                                                                        timeframe.description
                                                                    }
                                                                </p>
                                                            </div>
                                                            {timeframe.multiplier !==
                                                                1.0 && (
                                                                <Badge
                                                                    variant={
                                                                        timeframe.multiplier >
                                                                        1
                                                                            ? "destructive"
                                                                            : "secondary"
                                                                    }>
                                                                    {timeframe.multiplier >
                                                                    1
                                                                        ? "+"
                                                                        : ""}
                                                                    {Math.round(
                                                                        (timeframe.multiplier -
                                                                            1) *
                                                                            100
                                                                    )}
                                                                    %
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Project Description */}
                        {selectedApplication && (
                            <Card className="tech-card">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Tell us about your project
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={simpleDescription}
                                        onChange={(e) =>
                                            setSimpleDescription(e.target.value)
                                        }
                                        placeholder="Describe your project: What is it for? Any specific requirements? Size constraints? Special features needed?"
                                        rows={4}
                                        className="mb-4"
                                    />
                                    <div className="text-sm text-muted-foreground">
                                        <p className="mb-2">
                                            <strong>
                                                Helpful details to include:
                                            </strong>
                                        </p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>
                                                Approximate size (small, medium,
                                                large)
                                            </li>
                                            <li>How will it be used?</li>
                                            <li>
                                                Any moving parts or assembly
                                                requirements?
                                            </li>
                                            <li>
                                                Preferred material (if you have
                                                a preference)
                                            </li>
                                            <li>Color preferences</li>
                                            <li>Quantity needed</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Simple Estimate */}
                        {simpleEstimate && (
                            <Card className="tech-card border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-primary">
                                        <Info className="w-5 h-5" />
                                        Estimated Quote
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold mb-2">
                                                Recommended Configuration
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Technology:</span>
                                                    <span className="font-medium">
                                                        {
                                                            simpleEstimate
                                                                .application
                                                                .recommendedTech
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Material:</span>
                                                    <span className="font-medium">
                                                        {
                                                            simpleEstimate
                                                                .application
                                                                .recommendedMaterial
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Quality:</span>
                                                    <span className="font-medium capitalize">
                                                        {
                                                            simpleEstimate
                                                                .application
                                                                .recommendedQuality
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Delivery:</span>
                                                    <span className="font-medium">
                                                        {
                                                            simpleEstimate
                                                                .timeframe.name
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">
                                                Estimated Price Range
                                            </h4>
                                            <div className="text-2xl font-bold text-primary mb-2">
                                                {simpleEstimate.priceRange}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Final price depends on actual
                                                file size, complexity, and
                                                quantity
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={handleSimpleQuote}
                                disabled={!selectedApplication}
                                className="saas-button-primary"
                                size="lg">
                                Configure with These Settings
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setQuoteMode("advanced")}
                                size="lg">
                                Switch to Advanced Mode
                            </Button>
                        </div>

                        {/* Help Section */}
                        <Card className="tech-card bg-secondary/5">
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-primary mt-1" />
                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            Need Help Choosing?
                                        </h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Not sure which option is best for
                                            your project? Our team can help you
                                            choose the right technology,
                                            material, and settings.
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm">
                                            Contact Our Experts
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    /* Advanced Quote Mode - Existing Implementation */
                    <div className="space-y-8">
                        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                            <Card className="tech-card">
                                <CardHeader>
                                    <CardTitle className="text-lg md:text-xl">
                                        Upload STL File
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Label className="text-sm md:text-base">
                                        Upload File (.stl format)
                                    </Label>
                                    <Input
                                        type="file"
                                        accept=".stl"
                                        onChange={handleFileUpload}
                                        className="mb-4"
                                    />
                                    {processing && (
                                        <div className="text-sm md:text-base text-primary">
                                            Processing file and calculating
                                            dimensions...
                                        </div>
                                    )}
                                    {stlStats && (
                                        <div className="text-sm text-muted-foreground space-y-1">
                                            <p>
                                                <strong>Surface Area:</strong>{" "}
                                                {stlStats.surfaceArea.toFixed(
                                                    2
                                                )}{" "}
                                                mm²
                                            </p>
                                            <p>
                                                <strong>Volume:</strong>{" "}
                                                {stlStats.volume.toFixed(2)} cm³
                                            </p>
                                            <p>
                                                <strong>Dimensions:</strong>{" "}
                                                {(
                                                    stlStats.boundingBox.max.x -
                                                    stlStats.boundingBox.min.x
                                                ).toFixed(1)}{" "}
                                                ×{" "}
                                                {(
                                                    stlStats.boundingBox.max.y -
                                                    stlStats.boundingBox.min.y
                                                ).toFixed(1)}{" "}
                                                ×{" "}
                                                {(
                                                    stlStats.boundingBox.max.z -
                                                    stlStats.boundingBox.min.z
                                                ).toFixed(1)}{" "}
                                                mm
                                            </p>
                                            <p>
                                                <strong>Triangles:</strong>{" "}
                                                {stlStats.triangleCount.toLocaleString()}
                                            </p>
                                        </div>
                                    )}
                                    {stlGeometry && (
                                        <STLPreview geometry={stlGeometry} />
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="tech-card">
                                <CardHeader>
                                    <CardTitle>Configuration</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>3D Printing Technology</Label>
                                        <Select
                                            value={technology}
                                            onValueChange={(val) => {
                                                setTechnology(val);
                                                setMaterial("");
                                            }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select technology" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="FDM">
                                                    FDM - Fused Deposition
                                                    Modeling
                                                </SelectItem>
                                                <SelectItem value="SLA">
                                                    SLA - Stereolithography
                                                </SelectItem>
                                                <SelectItem value="SLS">
                                                    SLS - Selective Laser
                                                    Sintering
                                                </SelectItem>
                                                <SelectItem value="Metal">
                                                    Metal 3D Printing
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Material</Label>
                                        <Select
                                            value={material}
                                            onValueChange={setMaterial}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select material" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(
                                                    materialOptions[
                                                        technology
                                                    ] || []
                                                ).map((mat) => {
                                                    const matProps =
                                                        materialProperties[mat];
                                                    return (
                                                        <SelectItem
                                                            key={mat}
                                                            value={mat}>
                                                            {mat}{" "}
                                                            {matProps &&
                                                                `(₹${matProps.pricePerGram.toFixed(
                                                                    3
                                                                )}/g)`}
                                                        </SelectItem>
                                                    );
                                                })}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Quality Level</Label>
                                        <Select
                                            value={quality}
                                            onValueChange={setQuality}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select quality" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">
                                                    Draft Quality (Faster, Lower
                                                    Cost)
                                                </SelectItem>
                                                <SelectItem value="medium">
                                                    Standard Quality (Balanced)
                                                </SelectItem>
                                                <SelectItem value="high">
                                                    High Quality (Slower, Higher
                                                    Cost)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Color</Label>
                                        <Select
                                            value={color}
                                            onValueChange={setColor}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {colors.map((col) => (
                                                    <SelectItem
                                                        key={col.value}
                                                        value={col.value}>
                                                        <div className="flex items-center gap-2">
                                                            <div
                                                                className="w-4 h-4 rounded-full border"
                                                                style={{
                                                                    backgroundColor:
                                                                        col.value,
                                                                }}></div>
                                                            {col.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {technology === "FDM" && (
                                        <>
                                            <div>
                                                <Label>
                                                    Infill Density: {infill[0]}%
                                                </Label>
                                                <Slider
                                                    value={infill}
                                                    onValueChange={setInfill}
                                                    max={100}
                                                    min={10}
                                                    step={5}
                                                    className="mt-2"
                                                />
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    Higher infill = stronger
                                                    parts but more material cost
                                                </div>
                                            </div>
                                            <div>
                                                <Label>Layer Height</Label>
                                                <Select
                                                    value={layerHeight}
                                                    onValueChange={
                                                        setLayerHeight
                                                    }>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0.1">
                                                            0.1mm (High Detail)
                                                        </SelectItem>
                                                        <SelectItem value="0.2">
                                                            0.2mm (Standard)
                                                        </SelectItem>
                                                        <SelectItem value="0.3">
                                                            0.3mm (Fast Print)
                                                        </SelectItem>
                                                        <SelectItem value="0.4">
                                                            0.4mm (Very Fast)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </>
                                    )}

                                    {technology !== "FDM" && (
                                        <div className="text-sm text-muted-foreground p-3 bg-secondary/20 rounded">
                                            <strong>
                                                {technology} Technology:
                                            </strong>{" "}
                                            Infill and layer height are
                                            pre-optimized for this technology.
                                        </div>
                                    )}

                                    {priceBreakdown && (
                                        <div className="border rounded-lg p-4 space-y-2">
                                            <h4 className="font-semibold text-lg">
                                                Price Estimate
                                            </h4>
                                            <div className="text-sm space-y-1">
                                                <div className="flex justify-between">
                                                    <span>Material Cost:</span>
                                                    <span>
                                                        ₹
                                                        {priceBreakdown.materialCost?.toFixed(
                                                            2
                                                        ) || "0.00"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Printing Cost:</span>
                                                    <span>
                                                        ₹
                                                        {priceBreakdown.printingCost?.toFixed(
                                                            2
                                                        ) || "0.00"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Setup Cost:</span>
                                                    <span>
                                                        ₹
                                                        {priceBreakdown.setupCost?.toFixed(
                                                            2
                                                        ) || "0.00"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>
                                                        Post-Processing:
                                                    </span>
                                                    <span>
                                                        ₹
                                                        {priceBreakdown.postProcessingCost?.toFixed(
                                                            2
                                                        ) || "0.00"}
                                                    </span>
                                                </div>
                                                {priceBreakdown.finishingCost >
                                                    0 && (
                                                    <div className="flex justify-between">
                                                        <span>Finishing:</span>
                                                        <span>
                                                            ₹
                                                            {priceBreakdown.finishingCost?.toFixed(
                                                                2
                                                            ) || "0.00"}
                                                        </span>
                                                    </div>
                                                )}
                                                <hr className="my-2" />
                                                <div className="flex justify-between font-bold text-lg">
                                                    <span>Total:</span>
                                                    <span className="text-primary">
                                                        ₹
                                                        {priceBreakdown.total?.toFixed(
                                                            2
                                                        ) || "0.00"}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Est. Print Time:{" "}
                                                    {priceBreakdown.breakdown?.printTime?.toFixed(
                                                        1
                                                    ) || "0.0"}{" "}
                                                    hours
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setShowPriceDialog(true)
                                                }
                                                className="w-full mt-2">
                                                View Detailed Breakdown
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Finishing Options */}
                        <Card className="mt-8 tech-card">
                            <CardHeader>
                                <CardTitle>
                                    Professional Finishing Options
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="finish"
                                        checked={finish}
                                        onCheckedChange={(v) =>
                                            setFinish(v === true)
                                        }
                                    />
                                    <Label htmlFor="finish">
                                        Apply professional finishing services
                                    </Label>
                                </div>

                                {finish && (
                                    <div className="ml-6 space-y-4 border-l-2 border-primary/20 pl-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="primer"
                                                    checked={primer}
                                                    onCheckedChange={(v) =>
                                                        setPrimer(v === true)
                                                    }
                                                />
                                                <Label htmlFor="primer">
                                                    Primer coating (+₹1,660)
                                                </Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="finishColor"
                                                    checked={finishColor}
                                                    onCheckedChange={(v) =>
                                                        setFinishColor(
                                                            v === true
                                                        )
                                                    }
                                                />
                                                <Label htmlFor="finishColor">
                                                    Color finish (+₹2,905)
                                                </Label>
                                            </div>
                                        </div>

                                        {finishColor && (
                                            <div>
                                                <Label>
                                                    Finish Color Selection
                                                </Label>
                                                <Select
                                                    value={color}
                                                    onValueChange={setColor}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select finish color" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {finishColors.map(
                                                            (col) => (
                                                                <SelectItem
                                                                    key={
                                                                        col.value
                                                                    }
                                                                    value={
                                                                        col.value
                                                                    }>
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className="w-4 h-4 rounded-full border"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    col.value,
                                                                            }}></div>
                                                                        {
                                                                            col.name
                                                                        }
                                                                    </div>
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Notes and Submit */}
                        <Card className="mt-8 tech-card">
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="notes">
                                            Additional Requirements & Notes
                                        </Label>
                                        <Textarea
                                            id="notes"
                                            value={notes}
                                            onChange={(e) =>
                                                setNotes(e.target.value)
                                            }
                                            placeholder="Any specific requirements, deadlines, or special instructions..."
                                            className="mt-2"
                                            rows={3}
                                        />
                                    </div>
                                    <Button
                                        onClick={handleSubmitQuote}
                                        disabled={
                                            !stlFile ||
                                            !stlStats ||
                                            processing ||
                                            !material ||
                                            !color
                                        }
                                        className="w-full saas-button-primary"
                                        size="lg">
                                        Generate Detailed Quote
                                    </Button>
                                    {(!stlFile || !material || !color) && (
                                        <p className="text-sm text-muted-foreground text-center">
                                            Please upload STL file and select
                                            material & color to generate quote
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <PriceBreakdownDialog
                            open={showPriceDialog}
                            onOpenChange={setShowPriceDialog}
                            priceBreakdown={priceBreakdown}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default QuotingTool;
