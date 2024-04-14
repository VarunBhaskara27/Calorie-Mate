import React, { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Button,
  Form,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserConsumptionSearches } from "../Actions/userActions";
import { USER_CONSUMPTION_SEARCH_RESET } from "../Constants/userConstants";
import RecommendedFoodItem from "./RecommendedFoodItem";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

//Modal that pop's up that allows user to search for foods

function FoodModal({ show, handleFoodModalClose, date, createConsumption }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSelectChange = (event) => {
    console.log(event.target.value);
  };

  const handleQuantityChange = (event) => {
    console.log(event.target.value);
  };

  const dispatch = useDispatch();

  const userSearchRecommendations = useSelector(
    (state) => state.userConsumptionSearch
  );
  const { loading, error, recommendations } = userSearchRecommendations;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getUserConsumptionSearches(searchTerm));
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        handleFoodModalClose();
        setSearchTerm("");
      }}
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Search Foods</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='food-modal'>
          <Form onSubmit={handleSearchSubmit}>
            <Row>
              <Col md={9}>
                <Form.Control
                  type='text'
                  placeholder='Search for a food'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Button type='submit'>Search</Button>
              </Col>
            </Row>
          </Form>
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}
          {recommendations &&
            recommendations.map((result, i) => {
              return (
                <RecommendedFoodItem
                  result={result}
                  key={i}
                  date={date}
                  close={handleFoodModalClose}
                  createConsumption={createConsumption}
                />
              );
            })}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FoodModal;
