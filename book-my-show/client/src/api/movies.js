import axiosInstance from "./index";

// get all users

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-all-movies");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/movies/update-movie",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.delete("/api/movies/delete-movie", {
      data: payload,
    });
    // const response = await axiosInstace.delete(`api/movies/delete-movie/${payload.movieId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/movies/get-movie/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
