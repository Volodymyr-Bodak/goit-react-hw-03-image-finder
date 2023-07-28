// App.js
import React, { useState } from "react";
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

  const searchImages = async (searchQuery) => {
    try {
      setLoading(true); // Set loading to true before fetching images
      const response = await axios.get(`${baseUrl}&q=${searchQuery}&page=1`);
      setImages(response.data.hits);
      setCurrentPage(1);
      setQuery(searchQuery);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); 
    }
  };
  

  const handleSearch = (searchQuery) => {
    searchImages(searchQuery);
  };

  const handleImageClick = (id) => {
    const selected = images.find((image) => image.id === id);
    setSelectedImage(selected);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = async () => {
    try {
      const nextPage = currentPage + 1;
      const response = await axios.get(`${baseUrl}&q=${query}&page=${nextPage}`);
      setLoading(true);
      setImages((prevImages) => [...prevImages, ...response.data.hits]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error fetching more images:", error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {loading ? <Spinner /> : null} {}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {selectedImage && <Modal image={selectedImage} onClose={handleModalClose} />}
      <Button onClick={handleLoadMore} showButton={images.length > 0} />
    </div>
  );
};

export default App;
