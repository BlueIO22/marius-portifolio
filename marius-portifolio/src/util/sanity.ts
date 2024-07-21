import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "nnru6l08",
  dataset: "production",
  apiVersion: "2024-07-17",
  useCdn: false,
});
