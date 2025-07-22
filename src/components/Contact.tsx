import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
    const { toast } = useToast();

    const handleEmailClick = () => {
        window.open("mailto:connect@mechmega.com", "_blank");
    };

    const handlePhoneClick = async () => {
        try {
            await navigator.clipboard.writeText("+91 62813 00977");
            toast({
                title: "Phone number copied!",
                description:
                    "The phone number has been copied to your clipboard.",
            });
        } catch (err) {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement("textarea");
            textArea.value = "+91 62813 00977";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            toast({
                title: "Phone number copied!",
                description:
                    "The phone number has been copied to your clipboard.",
            });
        }
    };

    const handleMapClick = () => {
        window.open(
            "https://maps.google.com?q=TBI+Technology+Tower+VIT+Vellore+Tamil+Nadu+India",
            "_blank"
        );
    };

    return (
        <section
            id="contact"
            className="saas-section bg-secondary/10">
            <div className="saas-container">
                <div className="text-center mb-12 md:mb-16 animate-fade-in">
                    <h2 className="saas-heading mb-4">Contact MechMega</h2>
                    <p className="saas-text text-lg md:text-xl max-w-3xl mx-auto">
                        Ready to bring your ideas to life? Get in touch with our
                        3D printing experts today.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-6 md:space-y-8 animate-slide-up">
                        <Card className="hover:shadow-lg transition-shadow duration-300 tech-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-primary text-lg md:text-xl">
                                    <Mail className="h-5 w-5 md:h-6 md:w-6" />
                                    Email Us
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                                    Send us your project details and we'll get
                                    back to you within 24 hours.
                                </p>
                                <Button
                                    onClick={handleEmailClick}
                                    className="w-full text-sm md:text-base">
                                    connect@mechmega.com
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow duration-300 tech-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-primary text-lg md:text-xl">
                                    <Phone className="h-5 w-5 md:h-6 md:w-6" />
                                    Call Us
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                                    Speak directly with our 3D printing
                                    specialists for immediate assistance.
                                </p>
                                <Button
                                    onClick={handlePhoneClick}
                                    variant="outline"
                                    className="w-full text-sm md:text-base">
                                    +91 62813 00977
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow duration-300 tech-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-primary text-lg md:text-xl">
                                    <Clock className="h-5 w-5 md:h-6 md:w-6" />
                                    Business Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-muted-foreground text-sm md:text-base">
                                    <div className="flex justify-between">
                                        <span>Monday - Saturday:</span>
                                        <span>8:00 AM - 6:00 PM IST</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday:</span>
                                        <span>Closed</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Office Location */}
                    <div
                        className="animate-slide-up"
                        style={{ animationDelay: "200ms" }}>
                        <Card className="h-full tech-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-primary text-lg md:text-xl">
                                    <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                                    Visit Our Facility
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <p className="text-muted-foreground">
                                        TBI, Technology Tower
                                        <br />
                                        VIT Vellore
                                        <br />
                                        Tamil Nadu, India
                                    </p>
                                </div>

                                <div className="bg-muted/30 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">
                                        Tour Our Facility
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        See our state-of-the-art 3D printing
                                        equipment in action. Tours available by
                                        appointment.
                                    </p>
                                    <Button
                                        onClick={handleMapClick}
                                        variant="outline"
                                        className="w-full">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View on Google Maps
                                    </Button>
                                </div>

                                <div className="bg-primary/10 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2 text-primary">
                                        Why Choose MechMega?
                                    </h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        <li>
                                            • 15+ years of 3D printing expertise
                                        </li>
                                        <li>
                                            • ISO 9001:2015 certified quality
                                            standards
                                        </li>
                                        <li>
                                            • Same-day quotes on most projects
                                        </li>
                                        <li>
                                            • Express 24-48 hour turnaround
                                            available
                                        </li>
                                        <li>
                                            • Full post-processing and finishing
                                            services
                                        </li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="text-center mt-16 animate-fade-in">
                    <p className="text-muted-foreground">
                        Ready to get started? Upload your STL file and get an
                        instant quote above, or contact us directly for custom
                        solutions.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
