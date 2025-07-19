// filepath: /home/santhosh/projects/internship/MechMega-print-studio/src/data/quotingData.ts
import { Lightbulb, Shield, Zap, Settings } from "lucide-react";

export interface MaterialProperties {
    name: string;
    pricePerGram: number;
    density: number; // g/cm³
    printSpeed: number; // mm/min
    complexityMultiplier: number;
    supportRequired: boolean;
    postProcessingTime: number; // minutes
}

export interface TechnologySettings {
    baseSetupCost: number;
    machineHourlyRate: number;
    laborHourlyRate: number;
    overheadMultiplier: number;
    qualityLevels: {
        low: { speedMultiplier: number; qualityMultiplier: number };
        medium: { speedMultiplier: number; qualityMultiplier: number };
        high: { speedMultiplier: number; qualityMultiplier: number };
    };
}

export interface STLStats {
    surfaceArea: number;
    volume: number;
    triangleCount: number;
    boundingBox: {
        min: { x: number; y: number; z: number };
        max: { x: number; y: number; z: number };
    };
}

export interface PriceBreakdown {
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

export const materialOptions: Record<string, string[]> = {
    FDM: [
        "PLA",
        "PETG",
        "TPU",
        "ABS",
        "ASA",
        "PC",
        "PLA-CF",
        "PETG-CF",
        "PA6",
        "PA12",
    ],
    SLA: ["Standard Resin", "Tough Resin", "Flexible Resin", "Castable Resin"],
    SLS: ["PA12", "PA11", "PA12-CF"],
    Metal: [
        "Stainless Steel",
        "Titanium",
        "Aluminum",
        "Inconel",
        "Cobalt Chrome",
    ],
};

export const colors = [
    { name: "Natural/White", value: "#F8F9FA" },
    { name: "Black", value: "#1A1A1A" },
    { name: "Gray", value: "#6C757D" },
    { name: "Blue", value: "#0D6EFD" },
    { name: "Red", value: "#DC3545" },
    { name: "Green", value: "#198754" },
];

export const finishColors = [
    { name: "Matte Black", value: "#2C2C2C" },
    { name: "Glossy White", value: "#FFFFFF" },
    { name: "Metallic Silver", value: "#C0C0C0" },
    { name: "Matte Gray", value: "#808080" },
    { name: "Glossy Red", value: "#DC143C" },
    { name: "Matte Blue", value: "#4169E1" },
];

export const materialProperties: Record<string, MaterialProperties> = {
    // FDM Materials
    PLA: {
        name: "PLA",
        pricePerGram: 0.025,
        density: 1.24,
        printSpeed: 50,
        complexityMultiplier: 1.0,
        supportRequired: true,
        postProcessingTime: 5,
    },
    PETG: {
        name: "PETG",
        pricePerGram: 0.035,
        density: 1.27,
        printSpeed: 45,
        complexityMultiplier: 1.1,
        supportRequired: true,
        postProcessingTime: 8,
    },
    TPU: {
        name: "TPU",
        pricePerGram: 0.055,
        density: 1.2,
        printSpeed: 25,
        complexityMultiplier: 1.5,
        supportRequired: false,
        postProcessingTime: 10,
    },
    ABS: {
        name: "ABS",
        pricePerGram: 0.03,
        density: 1.04,
        printSpeed: 48,
        complexityMultiplier: 1.2,
        supportRequired: true,
        postProcessingTime: 12,
    },
    ASA: {
        name: "ASA",
        pricePerGram: 0.04,
        density: 1.07,
        printSpeed: 45,
        complexityMultiplier: 1.2,
        supportRequired: true,
        postProcessingTime: 12,
    },
    PC: {
        name: "PC",
        pricePerGram: 0.07,
        density: 1.2,
        printSpeed: 35,
        complexityMultiplier: 1.4,
        supportRequired: true,
        postProcessingTime: 15,
    },
    "PLA-CF": {
        name: "PLA-CF",
        pricePerGram: 0.08,
        density: 1.35,
        printSpeed: 40,
        complexityMultiplier: 1.3,
        supportRequired: true,
        postProcessingTime: 20,
    },
    "PETG-CF": {
        name: "PETG-CF",
        pricePerGram: 0.085,
        density: 1.4,
        printSpeed: 38,
        complexityMultiplier: 1.3,
        supportRequired: true,
        postProcessingTime: 20,
    },
    PA6: {
        name: "PA6",
        pricePerGram: 0.09,
        density: 1.14,
        printSpeed: 35,
        complexityMultiplier: 1.4,
        supportRequired: true,
        postProcessingTime: 25,
    },
    PA12: {
        name: "PA12",
        pricePerGram: 0.12,
        density: 1.01,
        printSpeed: 30,
        complexityMultiplier: 1.5,
        supportRequired: true,
        postProcessingTime: 30,
    },

    // SLA Materials
    "Standard Resin": {
        name: "Standard Resin",
        pricePerGram: 0.15,
        density: 1.15,
        printSpeed: 20,
        complexityMultiplier: 1.0,
        supportRequired: true,
        postProcessingTime: 30,
    },
    "Tough Resin": {
        name: "Tough Resin",
        pricePerGram: 0.2,
        density: 1.2,
        printSpeed: 18,
        complexityMultiplier: 1.1,
        supportRequired: true,
        postProcessingTime: 35,
    },
    "Flexible Resin": {
        name: "Flexible Resin",
        pricePerGram: 0.25,
        density: 1.1,
        printSpeed: 15,
        complexityMultiplier: 1.3,
        supportRequired: true,
        postProcessingTime: 40,
    },
    "Castable Resin": {
        name: "Castable Resin",
        pricePerGram: 0.3,
        density: 1.18,
        printSpeed: 16,
        complexityMultiplier: 1.2,
        supportRequired: true,
        postProcessingTime: 45,
    },

    // SLS Materials
    PA11: {
        name: "PA11",
        pricePerGram: 0.18,
        density: 1.03,
        printSpeed: 25,
        complexityMultiplier: 1.0,
        supportRequired: false,
        postProcessingTime: 60,
    },
    "PA12-CF": {
        name: "PA12-CF",
        pricePerGram: 0.22,
        density: 1.15,
        printSpeed: 22,
        complexityMultiplier: 1.2,
        supportRequired: false,
        postProcessingTime: 75,
    },

    // Metal Materials
    "Stainless Steel": {
        name: "Stainless Steel",
        pricePerGram: 2.5,
        density: 7.9,
        printSpeed: 5,
        complexityMultiplier: 2.0,
        supportRequired: true,
        postProcessingTime: 180,
    },
    Titanium: {
        name: "Titanium",
        pricePerGram: 8.0,
        density: 4.43,
        printSpeed: 3,
        complexityMultiplier: 2.5,
        supportRequired: true,
        postProcessingTime: 240,
    },
    Aluminum: {
        name: "Aluminum",
        pricePerGram: 3.5,
        density: 2.7,
        printSpeed: 8,
        complexityMultiplier: 1.8,
        supportRequired: true,
        postProcessingTime: 150,
    },
    Inconel: {
        name: "Inconel",
        pricePerGram: 12.0,
        density: 8.19,
        printSpeed: 2,
        complexityMultiplier: 3.0,
        supportRequired: true,
        postProcessingTime: 300,
    },
    "Cobalt Chrome": {
        name: "Cobalt Chrome",
        pricePerGram: 10.0,
        density: 8.3,
        printSpeed: 3,
        complexityMultiplier: 2.8,
        supportRequired: true,
        postProcessingTime: 270,
    },
};

export const technologySettings: Record<string, TechnologySettings> = {
    FDM: {
        baseSetupCost: 500,
        machineHourlyRate: 300,
        laborHourlyRate: 800,
        overheadMultiplier: 1.2,
        qualityLevels: {
            low: { speedMultiplier: 1.5, qualityMultiplier: 0.8 },
            medium: { speedMultiplier: 1.0, qualityMultiplier: 1.0 },
            high: { speedMultiplier: 0.7, qualityMultiplier: 1.3 },
        },
    },
    SLA: {
        baseSetupCost: 800,
        machineHourlyRate: 600,
        laborHourlyRate: 1000,
        overheadMultiplier: 1.3,
        qualityLevels: {
            low: { speedMultiplier: 1.3, qualityMultiplier: 0.9 },
            medium: { speedMultiplier: 1.0, qualityMultiplier: 1.0 },
            high: { speedMultiplier: 0.8, qualityMultiplier: 1.2 },
        },
    },
    SLS: {
        baseSetupCost: 1500,
        machineHourlyRate: 1200,
        laborHourlyRate: 1200,
        overheadMultiplier: 1.4,
        qualityLevels: {
            low: { speedMultiplier: 1.2, qualityMultiplier: 0.9 },
            medium: { speedMultiplier: 1.0, qualityMultiplier: 1.0 },
            high: { speedMultiplier: 0.9, qualityMultiplier: 1.1 },
        },
    },
    Metal: {
        baseSetupCost: 5000,
        machineHourlyRate: 3000,
        laborHourlyRate: 1500,
        overheadMultiplier: 1.6,
        qualityLevels: {
            low: { speedMultiplier: 1.1, qualityMultiplier: 0.9 },
            medium: { speedMultiplier: 1.0, qualityMultiplier: 1.0 },
            high: { speedMultiplier: 0.9, qualityMultiplier: 1.2 },
        },
    },
};

export const simpleQuoteOptions = {
    applications: [
        {
            id: "prototype",
            name: "Prototype/Concept Model",
            description: "For testing designs, fit, and basic functionality",
            icon: Lightbulb,
            recommendedTech: "FDM",
            recommendedMaterial: "PLA",
            recommendedQuality: "medium",
            strengthLevel: "Basic",
            costLevel: "Low",
            speedLevel: "Fast",
        },
        {
            id: "functional",
            name: "Functional Part",
            description: "For parts that need to work under stress or load",
            icon: Shield,
            recommendedTech: "SLA",
            recommendedMaterial: "Tough Resin",
            recommendedQuality: "high",
            strengthLevel: "High",
            costLevel: "Medium",
            speedLevel: "Medium",
        },
        {
            id: "miniature",
            name: "Miniature/Detailed Model",
            description: "For small parts with fine details and smooth finish",
            icon: Zap,
            recommendedTech: "SLA",
            recommendedMaterial: "Standard Resin",
            recommendedQuality: "high",
            strengthLevel: "Medium",
            costLevel: "Medium",
            speedLevel: "Medium",
        },
        {
            id: "production",
            name: "Production Part",
            description: "For end-use parts with high durability requirements",
            icon: Settings,
            recommendedTech: "SLS",
            recommendedMaterial: "PA12",
            recommendedQuality: "high",
            strengthLevel: "Very High",
            costLevel: "High",
            speedLevel: "Slow",
        },
        {
            id: "metal",
            name: "Metal Part",
            description:
                "For aerospace, medical, or high-performance applications",
            icon: Shield,
            recommendedTech: "Metal",
            recommendedMaterial: "Stainless Steel",
            recommendedQuality: "high",
            strengthLevel: "Extreme",
            costLevel: "Very High",
            speedLevel: "Very Slow",
        },
    ],
    budgetRanges: [
        {
            id: "budget",
            name: "Budget-Friendly",
            range: "₹500 - ₹2,000",
            description: "Basic prototypes and concept models",
        },
        {
            id: "standard",
            name: "Standard",
            range: "₹2,000 - ₹10,000",
            description: "Functional parts and detailed models",
        },
        {
            id: "premium",
            name: "Premium",
            range: "₹10,000 - ₹50,000",
            description: "High-quality production parts",
        },
        {
            id: "professional",
            name: "Professional",
            range: "₹50,000+",
            description: "Metal parts and complex assemblies",
        },
    ],
    timeframes: [
        {
            id: "rush",
            name: "Rush (1-2 days)",
            multiplier: 1.5,
            description: "Priority processing",
        },
        {
            id: "standard",
            name: "Standard (3-5 days)",
            multiplier: 1.0,
            description: "Normal processing time",
        },
        {
            id: "economy",
            name: "Economy (1-2 weeks)",
            multiplier: 0.8,
            description: "Flexible timeline for better pricing",
        },
    ],
};
