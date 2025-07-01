import { Client, Databases } from "react-native-appwrite";

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    tasks: process.env.EXPO_PUBLIC_APPWRITE_COL_TASKS_ID,
  },
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);

const database = new Databases(client);

export { client, config, database };
