export default interface Note {
  _id: string;
  title: string;
  text?: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface noteInput {
  username: string;
  title: string;
  text?: string;
}
export interface userInput {
  Username: string;
  Email?: string;
  Password: string;
}
