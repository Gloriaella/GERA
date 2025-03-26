import {Client, Account, Databases} from "appwrite"

export const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);
export const databaseId = "67d4f0f2003cbfbe2a79";
export const collectionId = "67d4f19d0036525e7044";


client.setProject("67d03f3c0009ba164044")
