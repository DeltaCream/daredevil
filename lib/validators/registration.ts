import { z } from "zod";

export const registrationSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(32, "Username must be at most 32 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores.",
      ), //sample regex schema
    "first-name": z.string(),
    "middle-name": z.string().optional(),
    "last-name": z.string().optional(),
    email: z
      .string()
      .min(8, "Email must be at least 8 characters.")
      .max(64, "Email must be at most 64 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password must be at most 64 characters."),
    "confirm-password": z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password must be at most 64 characters."),
  })
  .refine((data) => data.password === data["confirm-password"], {
    //refine checking to ensure passwords match
    message: "Passwords do not match.",
    path: ["confirm-password"], // Specifies the field where the error message should appear
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;

export const loginUsernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(32, "Username must be at most 32 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ), //sample regex schema
  "password-username": z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be at most 64 characters."),
});

export type LoginUsernameSchema = z.infer<typeof loginUsernameSchema>;

export const loginEmailSchema = z.object({
  email: z
    .string()
    .min(8, "Email must be at least 8 characters.")
    .max(64, "Email must be at most 64 characters."),
  "password-email": z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be at most 64 characters."),
});

export type LoginEmailSchema = z.infer<typeof loginEmailSchema>;
