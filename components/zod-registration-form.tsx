"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { registerAction } from "@/lib/actions";
import { cn } from "@/lib/utils";
import type { RegistrationSchema } from "@/lib/validators/registration";
import { registrationSchema } from "@/lib/validators/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  EyeOffIcon,
  LockKeyholeIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { startTransition, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";

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

export function ZodRegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registrationForm = useForm<RegistrationSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      "first-name": "",
      "middle-name": "",
      "last-name": "",
      email: "",
      password: "",
      "confirm-password": "",
    },
    mode: "onSubmit", //default, consult https://ui.shadcn.com/docs/forms/react-hook-form#validation-modes for more details
  });

  function onSubmit(data: RegistrationSchema) {
    // client-side validated by RHF; now call server action inside startTransition
    startTransition(() => {
      registerUserFlow(data);
    });
  }

  async function registerUserFlow(values: RegistrationSchema) {
    try {
      const res = await registerAction(values); // Server Action
      console.log("Server response:", res);
      if (res.error?.includes("Password")) {
        //show something that displays that something is wrong with the password
      }
      // if (!res?.ok) {
      //   // handle server validation errors returned from server
      //   console.error("server errors", res?.errors);
      // } else {
      //   // success — show toast / navigate / reset form
      //   // console.log("created", res.userId);
      // }
    } catch (err) {
      console.error("server action failed", err);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form
            // action={registerAction}
            onSubmit={registrationForm.handleSubmit(onSubmit)}
          >
            <FieldSet>
              <FieldLegend>Register to the website</FieldLegend>
              <FieldDescription>
                Enter your email and other details below to register your
                account
              </FieldDescription>
              <FieldGroup className="@container/field-group flex flex-col gap-6">
                <Controller
                  name="username"
                  control={registrationForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="username">Username</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="username"
                          name="username"
                          type="text"
                          placeholder="DeltaCream"
                          required
                          aria-invalid={fieldState.invalid}
                          autoComplete="username"
                        />
                        <InputGroupAddon>
                          <UserIcon />
                        </InputGroupAddon>
                      </InputGroup>
                      {errorsUsername?.length !== 0 && (
                        <FieldError errors={errorsUsername} />
                      )}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="first-name"
                  control={registrationForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="first-name">First Name</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="first-name"
                          name="first-name"
                          type="text"
                          placeholder="Juan"
                          required
                          aria-invalid={fieldState.invalid}
                          autoComplete="given-name" //first name autocomplete
                        />
                        <InputGroupAddon>
                          <UserIcon />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="middle-name"
                  control={registrationForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="middle-name">Middle Name</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="middle-name"
                          name="middle-name"
                          type="text"
                          placeholder="Alfonso"
                          aria-invalid={fieldState.invalid}
                          autoComplete="additional-name" //middle name autocomplete
                        />
                        <InputGroupAddon>
                          <UserIcon />
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  )}
                />
                <Controller
                  name="last-name"
                  control={registrationForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="last-name"
                          name="last-name"
                          type="text"
                          placeholder="de la Cruz"
                          aria-invalid={fieldState.invalid}
                          autoComplete="family-name" //last name autocomplete
                        />
                        <InputGroupAddon>
                          <UserIcon />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={registrationForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
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
                      {errorsEmail?.length !== 0 && (
                        <FieldError errors={errorsEmail} />
                      )}
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={registrationForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          required
                          aria-invalid={fieldState.invalid}
                          autoComplete="new-password"
                        />
                        <InputGroupAddon>
                          <LockKeyholeIcon />
                        </InputGroupAddon>
                        <InputGroupButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </InputGroupButton>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="confirm-password"
                  control={registrationForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel htmlFor="confirm-password">
                        Confirm Password
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="confirm-password"
                          name="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          required
                          aria-invalid={fieldState.invalid}
                          autoComplete="new-password"
                        />
                        <InputGroupAddon>
                          <LockKeyholeIcon />
                        </InputGroupAddon>
                        <InputGroupButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </InputGroupButton>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <FieldSeparator />
                <Field orientation="responsive">
                  <Button type="submit">Register</Button>
                </Field>
              </FieldGroup>
              <Button
                type="button"
                variant="outline"
                onClick={() => registrationForm.reset()}
              >
                Reset
              </Button>
            </FieldSet>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
