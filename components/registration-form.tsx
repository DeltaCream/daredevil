import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function RegistrationForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Register to the website</CardTitle>
                    <CardDescription>
                        Enter your email and other details below to register
                        your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={registerAction}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="DeltaCream"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    placeholder="Juan"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="middle-name">Middle Name</Label>
                                <Input
                                    id="middle-name"
                                    name="middle-name"
                                    type="text"
                                    placeholder="Alfonso"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    placeholder="de la Cruz"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="confirm-password">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="confirm-password"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="underline underline-offset-4"
                            >
                                Sign in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
