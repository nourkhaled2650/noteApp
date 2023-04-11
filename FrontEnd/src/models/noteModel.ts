export default interface Note {
  _id: string;
  title: string;
  text?: string;
  createdAt: string;
  updatedAt: string;
}

export interface noteInput {
  title: string;
  text?: string;
}
export interface userInput {
  Username: string;
  Email?: string;
  Password: string;
}
