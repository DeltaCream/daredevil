"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { loginEmailAction, loginUsernameAction } from "@/lib/actions";
import { cn } from "@/lib/utils";
import type {
  LoginEmailSchema,
  LoginUsernameSchema,
} from "@/lib/validators/registration";
import {
  loginEmailSchema,
  loginUsernameSchema,
} from "@/lib/validators/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  EyeOffIcon,
  LockKeyholeIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import type React from "react";
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

export function ZodLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const loginMethod = className?.split("-tab")[0];
  // console.log(loginMethod);

  const loginUsernameForm = useForm<LoginUsernameSchema>({
    resolver: zodResolver(loginUsernameSchema),
    defaultValues: {
      username: "",
      "password-username": "",
    },
    mode: "onSubmit", //default, consult https://ui.shadcn.com/docs/forms/react-hook-form#validation-modes for more details
  });

  const loginEmailForm = useForm<LoginEmailSchema>({
    resolver: zodResolver(loginEmailSchema),
    defaultValues: {
      email: "",
      "password-email": "",
    },
    mode: "onSubmit", //default, consult https://ui.shadcn.com/docs/forms/react-hook-form#validation-modes for more details
  });

  function onUsernameSubmit(data: LoginUsernameSchema) {
    // Do something with the form values.
    console.log("On username submit called: ", data);
    startTransition(() => {
      loginUsernameSubmitFlow(data);
    });
  }

  async function loginUsernameSubmitFlow(values: LoginUsernameSchema) {
    try {
      // Perform the login action here
      const res = await loginUsernameAction(values); // Server Action
      console.log("Server response:", res);
      // if (!res?.ok) {
      //   // handle server validation errors returned from server
      //   console.error("server errors", res?.errors);
      // } else {
      //   // success — show toast / navigate / reset form
      //   // console.log("created", res.userId);
      // }
    } catch (err) {
      // Handle error
      console.error("server action failed", err);
    }
  }

  function onEmailSubmit(data: LoginEmailSchema) {
    // Do something with the form values.
    console.log("On email submit called: ", data);
    startTransition(() => {
      loginEmailSubmitFlow(data);
    });
  }

  async function loginEmailSubmitFlow(values: LoginEmailSchema) {
    try {
      // Perform the login action here
      const res = await loginEmailAction(values); // Server Action
      console.log("Server response:", res);
      // if (!res?.ok) {
      //   // handle server validation errors returned from server
      //   console.error("server errors", res?.errors);
      // } else {
      //   // success — show toast / navigate / reset form
      //   // console.log("created", res.userId);
      // }
    } catch (err) {
      // Handle error
      console.error("server action failed", err);
    }
  }

  const formAction =
    // loginMethod === "email" ? loginEmailAction : loginUsernameAction;
    loginMethod === "email"
      ? loginEmailForm.handleSubmit(onEmailSubmit)
      : loginUsernameForm.handleSubmit(onUsernameSubmit);

  const form = loginMethod === "email" ? loginEmailForm : loginUsernameForm;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form
            // action={formAction}
            onSubmit={formAction}
          >
            <FieldSet>
              <FieldLegend>Login to your account</FieldLegend>
              <FieldDescription>
                Enter your {loginMethod} below to login to your account
              </FieldDescription>
              <FieldGroup className="@container/field-group flex flex-col gap-6">
                {
                  //className === "username-tab"
                  loginMethod === "username" ? (
                    <>
                      <Controller
                        name="username"
                        control={loginUsernameForm.control}
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
                            {/*<FieldError errors={errorsUsername} />*/}
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="password-username"
                        control={loginUsernameForm.control}
                        render={({ field, fieldState }) => (
                          <Field
                            orientation="responsive"
                            data-invalid={fieldState.invalid}
                          >
                            <div className="flex items-center">
                              <FieldLabel htmlFor={`password-${loginMethod}`}>
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
                                {...field}
                                id={`password-${loginMethod}`}
                                name={`password-${loginMethod}`}
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                required
                                aria-invalid={fieldState.invalid}
                                autoComplete="current-password"
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
                    </>
                  ) : (
                    <>
                      <Controller
                        name="email"
                        control={loginEmailForm.control}
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
                                aria-invalid={fieldState.invalid}
                                autoComplete="email"
                              />
                              <InputGroupAddon>
                                <MailIcon />
                              </InputGroupAddon>
                            </InputGroup>
                            {/*<FieldError errors={errorsEmail} />*/}
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="password-email"
                        control={loginEmailForm.control}
                        render={({ field, fieldState }) => (
                          <Field
                            orientation="responsive"
                            data-invalid={fieldState.invalid}
                          >
                            <div className="flex items-center">
                              <FieldLabel htmlFor={`password-${loginMethod}`}>
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
                                {...field}
                                id={`password-${loginMethod}`}
                                name={`password-${loginMethod}`}
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                required
                                aria-invalid={fieldState.invalid}
                                autoComplete="current-password"
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
                    </>
                  )
                }

                <FieldSeparator />
                <Field orientation="responsive">
                  <Button type="submit">Login</Button>
                </Field>
              </FieldGroup>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            </FieldSet>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
