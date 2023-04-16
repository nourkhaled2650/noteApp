import { User } from "../models/userModel";
import { fetchData } from "./fetchh";

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData("http://localhost:5000/users", {
    credentials: "include",
    method: "GET",
  });
  return response.json();
};

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}
export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetchData("http://localhost:5000/users/signup", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  console.log(response);

  return response.json();
};

interface LogInCredentials {
  username: string;
  password: string;
}

export const logIn = async (credentials: LogInCredentials): Promise<User> => {
  const response = await fetch("http://localhost:5000/users/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const logOut = async () => {
  try {
    const response = await fetch("http://localhost:5000/users/logout", {
      method: "GET",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
