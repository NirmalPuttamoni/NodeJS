import React, { useEffect, useState } from 'react'
import { Button, message, Table } from 'antd'
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { hideLoading, showLoading, homeLoader } from '../../redux/loaderSlice';
import { getAllMovies } from '../../api/movies';
import moment from "moment";
import MovieForm from './MovieForm';
import DeleteMovieModal from './DeleteMovieModal';

const MovieList = () => {
    const dispatch = useDispatch();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([]);
    const [formType, setFormType] = useState("add");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const fakeMovies = [
        {
            key: "1",
            poster: "Image1",
            title: "Devara",
            description: "Action film",
            duration: 120,
            genre: "Action Drama",
            language: "Telugu",
            releaseDate: "2024-09-27"
        },
        {
            key: "2",
            poster: "Image1",
            title: "Stree2",
            description: "Horro film",
            duration: 120,
            genre: "Horror Comedy",
            language: "Hindi",
            releaseDate: "2024-08-27"
        },
        {
            key: "3",
            poster: "Image1",
            title: "Tumbadd",
            description: "Horror film",
            duration: 120,
            genre: "Horror Drama",
            language: "Marathi",
            releaseDate: "2021-09-27"
        }
    ];

    const getData = async () => {
        try {
            dispatch(showLoading());
            const response = await getAllMovies();
            const allMovies = response?.data;
            message.success(response?.message);
            setMovies(allMovies);
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    }
    // console.log("selectedMovie in list", selectedMovie)
    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // console.log(movies)
    const columns = [
        {
            title: "Poster",
            dataIndex: "poster",
            key:"poster",
            render: (text, data) => {
                return (<img
                    src={data.poster}
                    alt={text}
                    width="75px"
                    height="115"
                    style={{ objectFit: "cover" }}
                />)
            }
        },
        {
            title: "Movie Name",
            dataIndex: "title",
            key:"title"
        },
        {
            title: "Description",
            dataIndex: "description",
            key:"description",
            width: "600px"
        },
        {
            title: "Duration",
            dataIndex: "duration",
            key:"duration",
            render: (text) => {
                return `${text} Mins`;
            }
        },
        {
            title: "Genre",
            dataIndex: "genre",
            key:"genre",
        },
        {
            title: "Language",
            dataIndex: "language",
            key:"language",
        },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            key:"releaseDate",
            render: (text, data) => {
                return moment(data.releaseDate).format("DD-MM-YYYY");
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            key:"action",
            render: (text, data) => {
                // console.log("data ",data)
                return (
                    <>
                        <Button onClick={() => {
                            setIsModalOpen(true);
                            setSelectedMovie(data);
                            setFormType("edit");
                        }}>
                            <EditOutlined />
                        </Button>
                        <Button onClick={() => {
                            setIsDeleteModalOpen(true);
                            setSelectedMovie(data);
                        }}>
                            <DeleteOutlined />
                        </Button>
                    </>
                )
            }
        },
    ]

    return (
        <div>
            <Button onClick={() => {
                setIsModalOpen(true);
                setFormType("add");
            }}>Add Movie</Button>
            <Table dataSource={movies} columns={columns} rowKey="_id"></Table>
            {isModalOpen && (
                <MovieForm
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    formType={formType}
                    getData={getData}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteMovieModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    getData={getData}
                />
            )}
        </div>
    )
}

export default MovieList