import { User } from "../models/userModel";
import { fetchData } from "./fetch";

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData("/users", { method: "GET" });
  return response.json();
};

interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}
export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetchData("/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application.json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

interface LogInCredentials {
  username: string;
  password: string;
}

export const logIn = async (credentials: LogInCredentials): Promise<User> => {
  const response = await fetchData("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application.json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

export const logOut = async () => {
  const response = await fetchData("/users/logout", {
    method: "POST",
  });
  return response.json();
};
