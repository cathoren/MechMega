import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
    User,
    Mail,
    Phone,
    Building,
    MapPin,
    Bell,
    Settings,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProfilePage: React.FC = () => {
    const { user, updateUserProfile, isLoading } = useAuth();
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        company: user?.company || "",
        address: {
            street: user?.address?.street || "",
            city: user?.address?.city || "",
            state: user?.address?.state || "",
            zipCode: user?.address?.zipCode || "",
            country: user?.address?.country || "",
        },
        preferences: {
            notifications: user?.preferences?.notifications || true,
            newsletter: user?.preferences?.newsletter || false,
        },
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (field: string, value: any) => {
        if (field.includes(".")) {
            const [parent, child] = field.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof typeof prev] as any),
                    [child]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const success = await updateUserProfile(formData);

        if (success) {
            toast({
                title: "Success",
                description: "Profile updated successfully!",
            });
        } else {
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        }

        setIsSaving(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen">
                <Header />
                <div className="pt-28 flex items-center justify-center min-h-screen">
                    <p className="text-muted-foreground">
                        Please sign in to view your profile.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Profile Settings
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your account settings and preferences
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Personal Information
                                </CardTitle>
                                <CardDescription>
                                    Update your personal details and contact
                                    information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company</Label>
                                        <Input
                                            id="company"
                                            value={formData.company}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "company",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your company name"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSaving}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                        {isSaving
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Address Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Address Information
                                </CardTitle>
                                <CardDescription>
                                    Update your address for shipping and billing
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="street">
                                        Street Address
                                    </Label>
                                    <Input
                                        id="street"
                                        value={formData.address.street}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "address.street",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your street address"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={formData.address.city}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "address.city",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter city"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            value={formData.address.state}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "address.state",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter state"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">
                                            ZIP Code
                                        </Label>
                                        <Input
                                            id="zipCode"
                                            value={formData.address.zipCode}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "address.zipCode",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter ZIP code"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            value={formData.address.country}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "address.country",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter country"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Preferences */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    Preferences
                                </CardTitle>
                                <CardDescription>
                                    Manage your notification and communication
                                    preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">
                                            Email Notifications
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive notifications about your
                                            orders and account activity
                                        </p>
                                    </div>
                                    <Switch
                                        checked={
                                            formData.preferences.notifications
                                        }
                                        onCheckedChange={(checked) =>
                                            handleInputChange(
                                                "preferences.notifications",
                                                checked
                                            )
                                        }
                                    />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-medium">
                                            Newsletter
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive updates about new products
                                            and special offers
                                        </p>
                                    </div>
                                    <Switch
                                        checked={
                                            formData.preferences.newsletter
                                        }
                                        onCheckedChange={(checked) =>
                                            handleInputChange(
                                                "preferences.newsletter",
                                                checked
                                            )
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Information */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Account Information
                                </CardTitle>
                                <CardDescription>
                                    View your account details and statistics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 border border-border rounded-lg">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            Member Since
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {user.createdAt
                                                ? new Date(
                                                      user.createdAt
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                        </p>
                                    </div>

                                    <div className="text-center p-4 border border-border rounded-lg">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            Account Type
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Standard User
                                        </p>
                                    </div>

                                    <div className="text-center p-4 border border-border rounded-lg">
                                        <h3 className="text-lg font-semibold text-foreground">
                                            Last Updated
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {user.updatedAt
                                                ? new Date(
                                                      user.updatedAt
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;
8080;
