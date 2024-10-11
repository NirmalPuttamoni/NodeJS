import React, { useEffect, useState } from "react";
import { Col, Input, message, Row, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { imageLoader } from "../../redux/loaderSlice";
import moment from "moment";
import { getAllMovies } from "../../api/movies";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isImageLoading } = useSelector((state) => state.loaders);

  const getData = async () => {
    try {
      dispatch(imageLoader(true));

      const response = await getAllMovies();
      if (response?.success) {
        setMovies(response.data);
        message.success("Movies fetched");
      } else {
        message.error(response.message);
      }
      setTimeout(() => {
        dispatch(imageLoader(false));
      }, 1500);
    } catch (error) {
      console.log(error);
      message.error(error.message);
      // dispatch(imageLoading(false));
    }
  };
  // console.log(isImageLoading);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <>
      <Row className="justify-content-center mb-5">
        <Col xs={24} lg={12}>
          <Input
            placeholder="Type here to search for a movie"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
            style={{ position: "static" }}
          />
        </Col>
      </Row>
      <Row
        className="justify-content-center"
        // gutter={{ xs: 12, sm: 18, md: 24, lg: 32 }}
        style={{ gap: "0 24px" }}
      >
        {movies
          ?.filter((movie) =>
            movie.title.toLowerCase().includes(searchText.toLocaleLowerCase())
          )
          .map((movie) => {
            return (
              <Col key={movie._id} span={{ xs: 24, sm: 24, md: 12, lg: 10 }}>
                <div className="text-center">
                  {isImageLoading ? (
                    <Skeleton.Image
                      style={{ width: 200, height: 250 }}
                      active={true}
                    />
                  ) : (
                    <img
                      src={movie?.poster}
                      alt={movie?.title}
                      width={200}
                      height={250}
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/movie/${movie?._id}?date=${moment().format(
                            "YYYY-MM-DD"
                          )}`
                        );
                      }}
                    />
                  )}
                  <h3
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/movie/${movie?._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                  >
                    {movie?.title}
                  </h3>
                </div>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default Home;
