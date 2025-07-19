import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    LinkedinIcon,
    MailIcon,
    PhoneIcon,
    GraduationCapIcon,
    AwardIcon,
    UserIcon,
} from "lucide-react";

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

const teamMembers: TeamMember[] = [
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

const Teams = () => {
    return (
        <section
            id="teams"
            className="saas-section bg-secondary/10">
            <div className="saas-container">
                <div className="text-center mb-12 md:mb-16 animate-fade-in">
                    <h2 className="saas-heading mb-4">Meet Our Expert Team</h2>
                    <p className="saas-text text-lg md:text-xl max-w-3xl mx-auto">
                        Our skilled professionals bring decades of combined
                        experience in 3D printing, engineering, and
                        manufacturing to deliver exceptional results for your
                        projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {teamMembers.map((member) => (
                        <Card
                            key={member.id}
                            className="group tech-card hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="relative">
                                {/* Profile Image */}
                                <div className="aspect-square w-full bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center overflow-hidden">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                const target =
                                                    e.target as HTMLImageElement;
                                                target.style.display = "none";
                                                target.nextElementSibling?.classList.remove(
                                                    "hidden"
                                                );
                                            }}
                                        />
                                    ) : null}
                                    {/* Fallback Icon */}
                                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary/20 to-secondary/30">
                                        <UserIcon className="w-24 h-24 text-primary/60" />
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                {/* Name and Position */}
                                <div className="mb-4">
                                    <h3 className="font-bold text-lg md:text-xl mb-2 text-foreground">
                                        {member.name}
                                    </h3>
                                    <p className="text-primary font-semibold mb-1">
                                        {member.position}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {member.specialization}
                                    </p>
                                </div>

                                {/* Experience and Education */}
                                <div className="mb-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <GraduationCapIcon className="w-4 h-4 text-primary" />
                                        <span className="font-medium">
                                            Education:
                                        </span>
                                        <span className="text-muted-foreground text-xs">
                                            {member.education}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                                    <div className="flex items-center gap-2 text-sm">
                                        <MailIcon className="w-4 h-4 text-primary" />
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="text-primary hover:text-primary/80 transition-colors truncate">
                                            {member.email}
                                        </a>
                                    </div>

                                    <div className="flex gap-2">
                                        {member.phone && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                asChild>
                                                <a href={`tel:${member.phone}`}>
                                                    <PhoneIcon className="w-4 h-4 mr-1" />
                                                    Call
                                                </a>
                                            </Button>
                                        )}
                                        {member.linkedin && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                asChild>
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer">
                                                    <LinkedinIcon className="w-4 h-4 mr-1" />
                                                    LinkedIn
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Team Statistics */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="text-center p-6 glass-card rounded-lg backdrop-blur-sm">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            50+
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Years Combined Experience
                        </div>
                    </div>
                    <div className="text-center p-6 glass-card rounded-lg backdrop-blur-sm">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            1000+
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Projects Completed
                        </div>
                    </div>
                    <div className="text-center p-6 glass-card rounded-lg backdrop-blur-sm">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            98%
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Client Satisfaction
                        </div>
                    </div>
                    <div className="text-center p-6 glass-card rounded-lg backdrop-blur-sm">
                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                            15+
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Technologies Mastered
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12 animate-fade-in">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">
                        Ready to Work with Our Team?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Connect with our experts to discuss your project
                        requirements and discover how our team can bring your
                        ideas to life with precision and innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="saas-button-primary">
                            <MailIcon className="w-5 h-5 mr-2" />
                            Contact Our Team
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="saas-button-secondary">
                            <PhoneIcon className="w-5 h-5 mr-2" />
                            Schedule Consultation
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Teams;
