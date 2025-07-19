interface Technology {
    name: string;
    fullName: string;
    description: string;
    image: string;
    features: string[];
    link: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const technologies: Technology[] = [
    {
        name: "FDM",
        fullName: "Fused Deposition Modeling",
        description: "Layer-by-layer extrusion of thermoplastic materials",
        image: "/3dprinting/FDM.jpeg",
        features: [
            "Large build volumes up to 450×450×450mm",
            "Wide material selection",
            "Cost-effective production",
            "Functional prototypes",
        ],
        link: "/technology/fdm",
    },
    {
        name: "SLA",
        fullName: "Stereolithography",
        description: "High-precision resin printing with exceptional detail",
        image: "/3dprinting/SLA.jpg",
        features: [
            "Ultra-fine details",
            "Smooth surface finish",
            "High accuracy printing",
            "Complex geometries",
        ],
        link: "/technology/sla",
    },
    {
        name: "SLS",
        fullName: "Selective Laser Sintering",
        description: "Powder-based printing for strong functional parts",
        image: "/3dprinting/SLS.jpg",
        features: [
            "No support structures needed",
            "Strong durable parts",
            "Complex assemblies",
            "Production-ready quality",
        ],
        link: "/technology/sls",
    },
    {
        name: "MJF",
        fullName: "Multi Jet Fusion",
        description: "Fast, high-quality production printing",
        image: "/images/technologies/mjf.jpg",
        features: [
            "High productivity rates",
            "Excellent surface quality",
            "Consistent properties",
            "Fine detail resolution",
        ],
        link: "/technology/mjf",
    },
    {
        name: "Polyjet",
        fullName: "Polyjet Technology",
        description: "Multi-material printing with photopolymers",
        image: "/images/technologies/polyjet.jpg",
        features: [
            "Multi-material capability",
            "Full color printing",
            "Smooth finish quality",
            "Rubber-like materials",
        ],
        link: "/technology/polyjet",
    },
    {
        name: "Metal",
        fullName: "Metal 3D Printing",
        description: "Direct metal laser sintering for industrial use",
        image: "/3dprinting/Metal_3d.jpeg",
        features: [
            "Aerospace grade materials",
            "High strength parts",
            "Complex internal structures",
            "Production components",
        ],
        link: "/technology/metal",
    },
];
