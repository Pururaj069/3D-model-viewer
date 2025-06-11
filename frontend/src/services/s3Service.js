// src/services/s3Service.js
export const fetchModelsFromBackend = async () => {
  const response = await fetch("/api/models");               // const response = await fetch("http://localhost:4000/api/models"); --> use this if not using reverse proxy 
  if (!response.ok) throw new Error("Failed to fetch models");
  return response.json();
};
