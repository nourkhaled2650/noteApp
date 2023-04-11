import { User } from "../models/userModel";
import { fetchData } from "./fetchh";

export const getLoggedInUser = async (): Promise<User> => {
  const response = await fetchData("http://localhost:5000/users", {
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  return response.json();
};

export const logOut = async () => {
  const response = await fetchData("http://localhost:5000/users/logout", {
    method: "POST",
  });
  return response.json();
};
