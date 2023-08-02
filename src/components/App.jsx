import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Button from "./Button";
import Spinner from "./Loader";

const ApiKey = "37228080-31d2118f700db371d754d6a1e";
const baseUrl = `https://pixabay.com/api/?key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`;

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  useEffect(() => {
    fetchImages(query, currentPage);
  }, [query, currentPage]);

  const searchImages = (searchQuery) => {
    setImages([]);
    setQuery(searchQuery);
    setCurrentPage(1);
    setLoading(true);
    setHasMoreImages(true);
  };

  const fetchImages = async (searchQuery, page) => {
    setLoading(true);

    try {
      const response = await axios.get(`${baseUrl}&q=${searchQuery}&page=${page}`);
      const data = response.data.hits;

      setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data]));
      setHasMoreImages(data.length > 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMoreImages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  const handleImageClick = (id) => {
    const selected = images.find((image) => image.id === id);
    setSelectedImage(selected);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  const render = () => {
    return (
      <div>
        <SearchBar onSubmit={searchImages} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={handleImageClick} />
        )}
        {selectedImage && <Modal image={selectedImage} onClose={handleModalClose} />}
        {images.length > 0 && hasMoreImages && !loading && (
          <Button onClick={handleLoadMore} />
        )}
        {loading && <Spinner />}
      </div>
    );
  };

  return render();
};

export default App;
