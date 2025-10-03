"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function revalidate() {
  revalidatePath("/");
}

export async function registerAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  console.log("Username:", username);
  console.log("Password:", password);

  // Perform registration logic here
  try {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": navigator.userAgent,
        "X-Forwarded-For": navigator.userAgent,
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    console.log("Registration result:", result);
    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert("Registration failed!");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred during registration.");
  }
}

export async function loginUsernameAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  console.log("Username:", username);
  console.log("Password:", password);

  // Perform login logic here
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
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

    try {
      const result = JSON.parse(resultText);

      if (response.ok) {
        console.log("Login success:", result);
        localStorage.setItem("username", result.username);
        localStorage.setItem("password", result.password);
        localStorage.setItem("jwt_token", result.jwt_token);
        localStorage.setItem("user_id", result.user_id);
        // alert("Login successful!");
      } else {
        // alert("Login failed.");
      }
    } catch (parseError) {
      // alert("Invalid response from server.");
      console.error("Error parsing response:", parseError);
    }
  } catch (err) {
    // alert("Something went wrong.");
    console.error("Error response:", err);
  }

  revalidate();
}

export async function loginEmailAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

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

    try {
      const result = JSON.parse(resultText);

      if (response.ok) {
        console.log("Login success:", result);
        localStorage.setItem("email", result.email);
        localStorage.setItem("password", result.password);
        localStorage.setItem("jwt_token", result.jwt_token);
        localStorage.setItem("user_id", result.user_id);
        // alert("Login successful!");
      } else {
        // alert("Login failed.");
      }
    } catch (parseError) {
      // alert("Invalid response from server.");
      console.error("Error parsing response:", parseError);
    }
  } catch (err) {
    // alert("Something went wrong.");
    console.error("Error response:", err);
  }

  revalidate();
}
