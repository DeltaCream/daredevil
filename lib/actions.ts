"use server";

import type {
  LoginEmailSchema,
  LoginUsernameSchema,
  RegistrationSchema,
} from "@/lib/validators/registration";
import {
  loginEmailSchema,
  loginUsernameSchema,
  registrationSchema,
} from "@/lib/validators/registration";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function revalidate() {
  revalidatePath("/dashboard");
}

export async function registerAction(
  // formData: FormData
  formData: RegistrationSchema,
) {
  // const username = formData.get("username");
  // const password = formData.get("password");
  console.log("Form data: ", formData);
  const parsed = registrationSchema.safeParse(formData);

  console.log("Parsed data: ", parsed);
  console.log("Parsed username: ", parsed.data?.username);

  if (!parsed.success) {
    // throw or return structured error
    return { ok: false, errors: parsed.error };
  }

  const username = parsed.data?.username;
  const password = parsed.data?.password;
  const email = parsed.data?.email;
  const firstName = parsed.data["first-name"];
  const lastName = parsed.data["last-name"];
  const middleName = parsed.data["middle-name"];

  console.log("Username:", username);
  console.log("Password:", password);
  console.log("Email:", email);
  console.log("First Name:", firstName);
  console.log("Last Name:", lastName);
  console.log("Middle Name:", middleName);

  // Perform registration logic here
  try {
    const response = await fetch(`${BASE_URL}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": navigator.userAgent,
        "X-Forwarded-For": navigator.userAgent,
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        username: username,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        email: email,
        password: password,
        birthday: null,
        role_type: "user",
        image: null,
      }),
    });

    if (!response.ok) {
      console.log("Response: ", response);
      const errBody = await response.text().catch(() => response.statusText);
      return { ok: false, status: response.status, error: errBody };
    }

    console.log("Response: ", response);

    // success -> redirect (this throws a NEXT_REDIRECT that Next expects)
    // redirect("/dashboard");
    redirect("/login");
  } catch (error: any) {
    // If the thrown error is the NEXT_REDIRECT control flow, rethrow it
    if (
      error?.message === "NEXT_REDIRECT" ||
      String(error?.digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("Error during registration:", error);
    return { ok: false, error: String(error) };
  }
}

export async function loginUsernameAction(
  // formData: FormData
  formData: LoginUsernameSchema,
) {
  // const username = formData.get("username");
  // const password = formData.get("password");

  console.log("Form data: ", formData);
  const parsed = loginUsernameSchema.safeParse(formData);

  console.log("Parsed data: ", parsed);
  console.log("Parsed username: ", parsed.data?.username);

  if (!parsed.success) {
    // throw or return structured error
    return { ok: false, errors: parsed.error };
  }

  const username = parsed.data?.username;
  const password = parsed.data?.["password-username"];

  console.log("Username:", username);
  console.log("Password:", password);

  // Perform login logic here
  try {
    const response = await fetch(`${BASE_URL}/user/login/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": navigator.userAgent,
        "X-Forwarded-For": navigator.userAgent,
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
      body: JSON.stringify({ username, password }),
    });

    const resultText = await response.text();
    console.log("Response text:", resultText);

    if (!response.ok) {
      console.log("Response: ", response);
      const errBody = await response.text().catch(() => response.statusText);
      return { ok: false, status: response.status, error: errBody };
    }

    console.log("Response: ", response);

    try {
      const result = JSON.parse(resultText);

      if (response.ok) {
        console.log("Login success:", result);
        // localStorage.setItem("username", result.username);
        // localStorage.setItem("jwt_token", result.jwt_token);
        // localStorage.setItem("user_id", result.user_id);
        // alert("Login successful!");
      } else {
        // alert("Login failed.");
      }
    } catch (parseError) {
      // alert("Invalid response from server.");
      console.error("Error parsing response:", parseError);
    }

    // success -> redirect (this throws a NEXT_REDIRECT that Next expects)
    // revalidate();
    redirect("/dashboard");
  } catch (err: any) {
    // alert("Something went wrong.");
    // console.error("Error response:", err);

    // If the thrown error is the NEXT_REDIRECT control flow, rethrow it
    if (
      err?.message === "NEXT_REDIRECT" ||
      String(err?.digest).startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    console.error("Error during login:", err);
    return { ok: false, error: String(err) };
  }
}

export async function loginEmailAction(
  // formData: FormData
  formData: LoginEmailSchema,
) {
  // const email = formData.get("email");
  // const password = formData.get("password");

  console.log("Form data: ", formData);
  const parsed = loginEmailSchema.safeParse(formData);

  console.log("Parsed data: ", parsed);
  console.log("Parsed email: ", parsed.data?.email);

  if (!parsed.success) {
    // throw or return structured error
    return { ok: false, errors: parsed.error };
  }

  const email = parsed.data?.email;
  const password = parsed.data?.["password-email"];

  console.log("Email:", email);
  console.log("Password:", password);

  // Perform login logic here
  try {
    const response = await fetch(`${BASE_URL}/user/login/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": navigator.userAgent,
        "X-Forwarded-For": navigator.userAgent,
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const resultText = await response.text();
    console.log("Response text:", resultText);

    if (!response.ok) {
      console.log("Response: ", response);
      const errBody = await response.text().catch(() => response.statusText);
      return { ok: false, status: response.status, error: errBody };
    }

    console.log("Response: ", response);

    try {
      const result = JSON.parse(resultText);

      if (response.ok) {
        console.log("Login success:", result);
        // localStorage.setItem("email", result.email);
        // localStorage.setItem("jwt_token", result.jwt_token);
        // localStorage.setItem("user_id", result.user_id);
        // alert("Login successful!");
      } else {
        // alert("Login failed.");
      }
    } catch (parseError) {
      // alert("Invalid response from server.");
      console.error("Error parsing response:", parseError);
    }

    // success -> redirect (this throws a NEXT_REDIRECT that Next expects)
    // revalidate();
    redirect("/dashboard");
  } catch (err: any) {
    // alert("Something went wrong.");
    // console.error("Error response:", err);

    // If the thrown error is the NEXT_REDIRECT control flow, rethrow it
    if (
      err?.message === "NEXT_REDIRECT" ||
      String(err?.digest).startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    console.error("Error during login:", err);
    return { ok: false, error: String(err) };
  }
}
