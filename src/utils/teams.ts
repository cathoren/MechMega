interface TeamMember {
    id: string;
    name: string;
    position: string;
    image: string;

    education: string;

    email: string;
    phone?: string;
    linkedin?: string;
    specialization: string;
}

export const teamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Dr. Sarah Johnson",
        position: "Chief Technology Officer",
        image: "/team/sarah-johnson.jpg",

        education: "PhD in Materials Engineering, MIT",

        email: "sarah.johnson@MechMega.com",
        phone: "+1 (555) 123-4567",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        specialization: "Advanced Materials & Process Development",
    },
    {
        id: "2",
        name: "Michael Chen",
        position: "Senior Production Engineer",
        image: "/team/michael-chen.jpg",

        education: "MS in Mechanical Engineering, Stanford",

        email: "michael.chen@MechMega.com",
        phone: "+1 (555) 234-5678",
        linkedin: "https://linkedin.com/in/michaelchen",
        specialization: "Production Systems & Quality Management",
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        position: "Design Engineering Lead",
        image: "/team/emily-rodriguez.jpg",

        education: "BS in Industrial Design, RISD",

        email: "emily.rodriguez@MechMega.com",
        phone: "+1 (555) 345-6789",
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        specialization: "Design Optimization & Engineering Support",
    },
];
