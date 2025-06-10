// src/services/s3Service.js
export const fetchModelsFromBackend = async () => {
  const response = await fetch("http://localhost:4000/api/models");
  if (!response.ok) throw new Error("Failed to fetch models");
  return response.json();
};
