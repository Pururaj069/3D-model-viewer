import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModelCard from "../../components/ModelCard/ModelCard";
import Spinner from "../../components/Spinner/Spinner";
// import ErrorDisplay from "../../components/ErrorDisplay/ErrorDisplay";
import { fetchModelsFromBackend } from "../../services/s3Service";
import "./Home.css";

const Home = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const loadModels = async () => {
    setLoading(true);
    setError(null);

    try {
      const modelList = await fetchModelsFromBackend();
      setModels(modelList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModelSelect = (model) => {
    navigate(`/viewer/${encodeURIComponent(model.fileName)}`, {
      state: { modelUrl: model.modelUrl },
    });
  };

  const handleRetry = () => {
    loadModels();
  };

  useEffect(() => {
    loadModels();
  }, []);

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Spinner message="Loading 3D models..." />;
  }

  // Uncomment to display error block
  // if (error) {
  //   return (
  //     <ErrorDisplay error={error} onRetry={handleRetry} />
  //   );
  // }

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="home-header-content">
          <h1 className="home-title">3D Model Gallery</h1>
          <p className="home-subtitle">Explore our collection of interactive 3D models</p>

          <div className="home-search">
            <div className="search-input-container">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="home-content">
        {filteredModels.length === 0 ? (
          <div className="no-models">
            {searchTerm ? (
              <>
                <h3>No models found</h3>
                <p>No models match your search "{searchTerm}"</p>
                <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <h3>No models available</h3>
                <p>No 3D models were found in the gallery</p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="models-stats">
              <span className="models-count">
                {filteredModels.length} model{filteredModels.length !== 1 ? "s" : ""}
                {searchTerm && ` found for "${searchTerm}"`}
              </span>
            </div>

            <div className="models-grid">
              {filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} onClick={handleModelSelect} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
