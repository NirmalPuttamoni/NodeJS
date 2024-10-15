import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { Button, Card, Col, message, Row } from "antd";
import { getShowById } from "../../api/shows";
import moment from "moment";
import Loader from "../Loader";
import StripeCheckout from "react-stripe-checkout";
import { bookShow, makePayment } from "../../api/bookings";
// import { StripeCheckout } from '@stripe/react-stripe-js';

const BookShow = () => {
  const {user} = useSelector((state) => state.users);
  // console.log("user " , user)
  const loading = useSelector((state) => state.loaders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const stripeAPIKey =
    "pk_test_51Q7ezmLF4gjWytmzhreCwQ1O2jCVQ0aFQNOSEXA8COADOH9VsvwKWv2nxIVSupj73eGiDOWcXixnfMzMvTwKpYDM00YvefVN13";
  const [totalPrice, setTotalPrice] = useState(0);

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getShowById({ showId: params?.id });
      // console.log("response ", response);
      if (response?.success) {
        setShow(response.data);
        // console.log(response.data);
      } else {
        message.error(response?.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err?.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const book = async (transactionId) => {
    try {
      dispatch(showLoading());
      const response = await bookShow({
        show: params.id,
        user: user._id,
        seats: selectedSeats,
        transactionId,
      });
      dispatch(hideLoading());
      if (response?.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    // console.log(token);
    try {
      dispatch(showLoading());
      const response = await makePayment(token, totalPrice);
      if (response?.success) {
        message.success(response.message);
        book(response.data);
        // console.log(response);
      } else {
        message.error(response.message);
        dispatch(hideLoading());
      }
    } catch (error) {}
  };

  useEffect(() => {
    setTotalPrice(selectedSeats?.length * show?.ticketPrice);
  }, [selectedSeats, show]);

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">All eyes this way please!</p>
          <div className="screen-div"></div>
        </div>
        <ul className="seat-ul justify-content-center">
          {Array.from(Array(rows).keys()).map((row) =>
            Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1;
              // console.log("seats", seatNumber);
              let seatClass = "seat-btn"; //default class for seat btn
              if (selectedSeats?.includes(seatNumber)) {
                seatClass += " selected"; // "seat-btn selected"
              }
              if (show?.bookedSeats?.includes(seatNumber)) {
                seatClass += " booked";
              }
              // console.log("totalSeats", totalSeats);
              if (seatNumber <= totalSeats) {
                // console.log("rendering seats", seatNumber);
                return (
                  <li key={seatNumber}>
                    <Button
                      className={seatClass}
                      onClick={() => {
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter((seat) => seat !== seatNumber)
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </Button>
                  </li>
                );
              } else {
                return null;
              }
            })
          )}
        </ul>
        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div>
            Selected Seats: <span>{selectedSeats?.join(", ")}</span>
          </div>
          <div>
            Total Price: <span>Rs. {totalPrice}</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {loading && <Loader />}
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show?.movie?.title}</h1>
                  <p>
                    Theatre: {show?.theatre?.name}, {show?.theatre?.address}{" "}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>Show Name: {show?.name}</h3>
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show?.date).format("MMM Do YYYY")}, {show?.time}
                  </h3>
                  <h3>
                    <span>Ticket Price: </span> Rs. {show?.ticketPrice}
                  </h3>
                  <h3>
                    <span>Total Seats: </span> {show?.totalSeats}
                  </h3>
                  <h3>
                    <span>Available Seats: </span>
                    {show?.totalSeats - show?.bookedSeats?.length}
                  </h3>
                </div>
              }
            >
              {getSeats()}
              {selectedSeats.length > 0 && (
                <StripeCheckout
                  token={onToken}
                  // billingAddress
                  amount={totalPrice * 100}
                  stripeKey={stripeAPIKey}
                >
                  <div className="max-width-600 mx-auto">
                    <Button type="primary" shape="round" size="large" block>
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BookShow;
