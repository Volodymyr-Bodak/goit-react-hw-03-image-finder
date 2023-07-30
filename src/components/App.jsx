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
      loading: true, // Set loading to true during the initial search
      hasMoreImages: true,
      shouldFetchMore: false,
    });
  };

  handleSearch = (searchQuery) => {
    this.searchImages(searchQuery);
  };

  componentDidUpdate(prevProps, prevState) {
    const { loading, query, currentPage, shouldFetchMore } = this.state;

    if (loading && !prevState.loading) {
      if (shouldFetchMore) {
        this.fetchImages(query, currentPage);
      } else {
        this.fetchImages(query, 1);
      }
    }
  }

  fetchImages = async (searchQuery, page) => {
    this.setState({ loading: true, shouldFetchMore: false });

    try {
      const response = await axios.get(`${baseUrl}&q=${searchQuery}&page=${page}`);
      const data = response.data.hits;

      this.setState((prevState) => ({
        images: page === 1 ? data : [...prevState.images, ...data],
        hasMoreImages: data.length > 0,
        loading: false, // Set loading to false after images are fetched
      }));
    } catch (error) {
      console.error("Error fetching images:", error);
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
      loading: true, // Set loading to true when "Load more" button is clicked
      shouldFetchMore: true,
    }));
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
    const { images, selectedImage, loading, initialLoading, hasMoreImages } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {selectedImage && <Modal image={selectedImage} onClose={this.handleModalClose} />}
        {initialLoading && <Spinner />}
        {images.length > 0 && hasMoreImages && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {loading && <Spinner />}
      </div>
    );
  }
}

export default App;