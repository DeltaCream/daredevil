'use client';

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
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, MailIcon, UserIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "./ui/input-group";
import Link from "next/link";
import {
    FieldSet,
    FieldLegend,
    FieldDescription,
    FieldGroup,
    Field,
    FieldLabel,
    FieldError,
    FieldSeparator,
} from "./ui/field";
import { is } from "zod/v4/locales";
import React, { useState } from "react";

let errorsUsername: Array<{ message?: string }> | undefined =
[
    // { message: "Choose another username." },
];

if (errorsUsername.length === 0) {
    errorsUsername = undefined
}

let errorsEmail: Array<{ message?: string }> | undefined = [
    // { message: "Enter a valid email address." },
];

if (errorsEmail.length === 0) {
    errorsEmail = undefined
}

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    let [showPassword, setShowPassword] = useState(false);

    const loginMethod = className?.split("-tab")[0];
    console.log(loginMethod);
    const formAction =
        loginMethod === "email" ? loginEmailAction : loginUsernameAction;
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                {/* <CardHeader> //versions 1 and 2
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your {loginMethod} below to login to your account
                    </CardDescription>
                </CardHeader> */}
                <CardContent>
                    <form action={formAction}>
                        <FieldSet>
                            <FieldLegend>Login to your account</FieldLegend>
                            <FieldDescription>
                                Enter your {loginMethod} below to login to your
                                account
                            </FieldDescription>
                            <FieldGroup className="@container/field-group flex flex-col gap-6">
                                {className === "username-tab" ? (
                                    <Field
                                        orientation="responsive"
                                        data-invalid={false}
                                    >
                                        <FieldLabel htmlFor="username">
                                            Username
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                id="username"
                                                name="username"
                                                type="text"
                                                placeholder="DeltaCream"
                                                required
                                            />
                                            <InputGroupAddon>
                                                <UserIcon />
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <FieldError errors={errorsUsername} />
                                    </Field>
                                ) : (
                                    <Field
                                        orientation="responsive"
                                        data-invalid={false}
                                    >
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email, e.g. m@example.com"
                                                required
                                                aria-invalid={false}
                                            />
                                            <InputGroupAddon>
                                                <MailIcon />
                                            </InputGroupAddon>
                                        </InputGroup>
                                        <FieldError errors={errorsEmail} />
                                    </Field>
                                )}
                                <Field
                                    orientation="responsive"
                                    data-invalid={false}
                                >
                                    <div className="flex items-center">
                                        <FieldLabel
                                            htmlFor={`password-${loginMethod}`}
                                        >
                                            Password
                                        </FieldLabel>
                                        <Link
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <InputGroup>
                                        <InputGroupInput
                                            id={`password-${loginMethod}`}
                                            name={`password-${loginMethod}`}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="********"
                                            required
                                        />
                                        <InputGroupAddon>
                                            <LockKeyholeIcon />
                                        </InputGroupAddon>
                                        <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <EyeIcon /> : <EyeOffIcon/>
                                        }
                                        </InputGroupButton>
                                    </InputGroup>
                                </Field>
                                <FieldSeparator />
                                <Field orientation="responsive">
                                    <Button type="submit">Login</Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="underline underline-offset-4"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

/* //version 1
<Label htmlFor="username">
    Username
</Label>
<Input 
    id="username"
    name="username"
    type="text"
    placeholder="DeltaCream"
    required
/>
<Label htmlFor="email">Email</Label>
<Input
    id="email"
    type="email"
    placeholder="m@example.com"
    required
/>
<Label htmlFor={`password-${loginMethod}`}>Password</Label>
<Input
    id="password"
    name="password"
    type="password"
    placeholder="********"
    required
/>
*/

/* //version 2
<div className="flex flex-col gap-6">
    <div className="grid gap-3">
        {className === "username-tab" ? (
            <>
                <Label htmlFor="username">
                    Username
                </Label>
                <InputGroup>
                    <InputGroupInput id="username" name="username" type="text" placeholder="DeltaCream" required />
                    <InputGroupAddon>
                    <UserIcon />
                    </InputGroupAddon>
                </InputGroup>
            </>
        ) : (
            <>
                <Label htmlFor="email">Email</Label>
                
                <InputGroup>
                    <InputGroupInput id="email" name="email" type="email" placeholder="Enter your email, e.g. m@example.com" required />
                    <InputGroupAddon>
                    <MailIcon />
                    </InputGroupAddon>
                </InputGroup>
            </>
        )}
    </div>
    <div className="grid gap-3">
        <div className="flex items-center">
            <Label htmlFor={`password-${loginMethod}`}>Password</Label>
            <Link
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
                Forgot your password?
            </Link>
        </div>
        <InputGroup>
            <InputGroupInput id={`password-${loginMethod}`} name={`password-${loginMethod}`} type="password" placeholder="********" required />
            <InputGroupAddon>
            <LockKeyholeIcon />
            </InputGroupAddon>
        </InputGroup>
    </div>
    <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full">
            Login
        </Button>
    </div>
</div>
<div className="mt-4 text-center text-sm">
    Don&apos;t have an account?{" "}
    <Link
        href="/register"
        className="underline underline-offset-4"
    >
        Sign up
    </Link>
</div>
*/
