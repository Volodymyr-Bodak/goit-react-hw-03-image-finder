import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Button from "./Button";
import Spinner from "./Loader";

const ApiKey = "37228080-31d2118f700db371d754d6a1e";
const baseUrl = `https://pixabay.com/api/?key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`;

class App extends Component {
  state = {
    images: [],
    query: "",
    currentPage: 1,
    selectedImage: null,
    loading: false,
    hasMoreImages: true,
  };

  searchImages = (searchQuery) => {
    this.setState({
      images: [],
      query: searchQuery,
      currentPage: 1,
      loading: true,
      hasMoreImages: true,
    }, () => {
      this.fetchImages(searchQuery, 1);
    });
  };

  fetchImages = async (searchQuery, page) => {
    this.setState({ loading: true });

    try {
      const response = await axios.get(`${baseUrl}&q=${searchQuery}&page=${page}`);
      const data = response.data.hits;

      this.setState((prevState) => ({
        images: page === 1 ? data : [...prevState.images, ...data],
        hasMoreImages: data.length > 0,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching images:", error);
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    const { query, currentPage, hasMoreImages } = this.state;

    if (hasMoreImages) {
      const nextPage = currentPage + 1;
      this.setState({
        currentPage: nextPage,
        loading: true,
      }, () => {
        this.fetchImages(query, nextPage);
      });
    }
  };

  handleImageClick = (id) => {
    const { images } = this.state;
    const selected = images.find((image) => image.id === id);
    this.setState({ selectedImage: selected });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, selectedImage, loading, hasMoreImages } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.searchImages} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {selectedImage && <Modal image={selectedImage} onClose={this.handleModalClose} />}
        {images.length > 0 && hasMoreImages && !loading ? (
          <Button onClick={this.handleLoadMore} />
        ) : null}
        {loading && <Spinner />}
      </div>
    );
  }
}

export default App;
