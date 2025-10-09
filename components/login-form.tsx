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
import { loginEmailAction, loginUsernameAction } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { MailIcon, UserIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const loginMethod = className?.split("-tab")[0];
    console.log(loginMethod);
    const formAction = loginMethod === "email" ? loginEmailAction : loginUsernameAction;
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your {loginMethod} below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                {className === "username-tab" ? (
                                    <>
                                        <Label htmlFor="username">
                                            Username
                                        </Label>
                                        {/* <Input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="DeltaCream"
                                            required
                                        /> */}
                                        <InputGroup>
                                            <InputGroupInput id="email" type="email" placeholder="Enter your email, e.g. m@example.com" required />
                                            <InputGroupAddon>
                                            <UserIcon />
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </>
                                ) : (
                                    <>
                                        <Label htmlFor="email">Email</Label>
                                        {/* <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        /> */}
                                        <InputGroup>
                                            <InputGroupInput id="email" type="email" placeholder="Enter your email, e.g. m@example.com" required />
                                            <InputGroupAddon>
                                            <MailIcon />
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="********"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a
                                href="/register"
                                className="underline underline-offset-4"
                            >
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
