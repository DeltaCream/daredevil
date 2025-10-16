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
import { LockKeyholeIcon, MailIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { InputGroup, InputGroupInput, InputGroupAddon } from "./ui/input-group";
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

let errorsUsername: Array<{ message?: string }> | undefined = [
    // { message: "Choose another username." },
];

if (errorsUsername.length === 0) {
    errorsUsername = undefined;
}

let errorsEmail: Array<{ message?: string }> | undefined = [
    // { message: "Enter a valid email address." },
];

if (errorsEmail.length === 0) {
    errorsEmail = undefined;
}

export function RegistrationForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                {/* <CardHeader> //versions 1 and 2
                    <CardTitle>Register to the website</CardTitle>
                    <CardDescription>
                        Enter your email and other details below to register
                        your account
                    </CardDescription>
                </CardHeader> */}
                <CardContent>
                    <form action={registerAction}>
                        <FieldSet>
                            <FieldLegend>Register to the website</FieldLegend>
                            <FieldDescription>
                                Enter your email and other details below to
                                register your account
                            </FieldDescription>
                            <FieldGroup className="@container/field-group flex flex-col gap-6">
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
                                <Field
                                    orientation="responsive"
                                    data-invalid={false}
                                >
                                    <FieldLabel htmlFor="first-name">
                                        First Name
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="first-name"
                                            name="first-name"
                                            type="text"
                                            placeholder="Juan"
                                            required
                                        />
                                        <InputGroupAddon>
                                            <UserIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Field
                                    orientation="responsive"
                                    data-invalid={false}
                                >
                                    <FieldLabel htmlFor="middle-name">
                                        Middle Name
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="middle-name"
                                            name="middle-name"
                                            type="text"
                                            placeholder="Alfonso"
                                            required
                                        />
                                        <InputGroupAddon>
                                            <UserIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Field
                                    orientation="responsive"
                                    data-invalid={false}
                                >
                                    <FieldLabel htmlFor="last-name">
                                        Last Name
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="last-name"
                                            name="last-name"
                                            type="text"
                                            placeholder="de la Cruz"
                                            required
                                        />
                                        <InputGroupAddon>
                                            <UserIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
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
                                <Field
                                    orientation="responsive"
                                    data-invalid={false}
                                >
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            required
                                        />
                                        <InputGroupAddon>
                                            <LockKeyholeIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <Field
                                    orientation="responsive"
                                    data-invalid={false}
                                >
                                    <FieldLabel htmlFor="confirm-password">
                                        Confirm Password
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="confirm-password"
                                            name="confirm-password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                        />
                                        <InputGroupAddon>
                                            <LockKeyholeIcon />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                                <FieldSeparator />
                                <Field orientation="responsive">
                                    <Button type="submit">Register</Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="underline underline-offset-4"
                            >
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

/* version 1

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
            type="password"
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
    <Link
        href="/login"
        className="underline underline-offset-4"
    >
        Sign in
    </Link>
</div>

*/

/* version 2

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
            type="password"
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
    <Link
        href="/login"
        className="underline underline-offset-4"
    >
        Sign in
    </Link>
</div>

*/

/* version 2

<div className="flex flex-col gap-6">
    <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
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
        <InputGroup>
            <InputGroupInput
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
            />
            <InputGroupAddon>
                <MailIcon />
            </InputGroupAddon>
        </InputGroup>
    </div>
    <div className="grid gap-3">
        <Label htmlFor="password">Password</Label>
        <InputGroup>
            <InputGroupInput
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
            />
            <InputGroupAddon>
                <LockKeyholeIcon />
            </InputGroupAddon>
        </InputGroup>
    </div>
    <div className="grid gap-3">
        <Label htmlFor="confirm-password">
            Confirm Password
        </Label>
        <InputGroup>
            <InputGroupInput
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm Password"
                required
            />
            <InputGroupAddon>
                <LockKeyholeIcon />
            </InputGroupAddon>
        </InputGroup>
    </div>
    <div className="flex flex-col gap-3">
        <Button type="submit" className="w-full">
            Register
        </Button>
    </div>
</div>
<div className="mt-4 text-center text-sm">
    Already have an account?{" "}
    <Link
        href="/login"
        className="underline underline-offset-4"
    >
        Sign in
    </Link>
</div>

*/
