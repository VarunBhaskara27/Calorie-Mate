import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Row, Col, ListGroup, Modal } from "react-bootstrap";
import axios from "axios";

//Component that display the food item's after a user is done searching

const RecommendedFoodItem = ({
  result,
  date,
  handleFoodModalClose,
  createConsumption,
}) => {
  const [servingSize, setServingSize] = useState(result.servingUnit[0]);
  const [quantity, setQuantity] = useState(1);
  const [macros, setMacros] = useState({});
  const [mealType, setMealType] = useState("Breakfast");

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getMacros = async (food, serving, quantity) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const encoded = encodeURI(food);

    const { data } = await axios.get(
      `http://localhost:8080/api/consumption/details?foodName=${encoded}&servingSize=${serving}&quantity=${quantity}`,
      config
    );

    setMacros(data);
  };

  console.log(servingSize);

  const handleAddFood = (date, mealType) => {
    getMacros(result.name, servingSize, quantity);
    console.log(macros);
  };

  return (
    <ListGroup key={result.tagId} style={{ maxHeight: "120px", paddingTop: 0 }}>
      <ListGroup.Item>
        <strong style={{ fontSize: 15 }}>{result.name}</strong>
        <Row>
          <Col md={10}>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId='servingSize'>
                    <Form.Label>Select serving size:</Form.Label>
                    <Form.Control
                      as='select'
                      value={servingSize}
                      onChange={(e) => setServingSize(e.target.value)}
                    >
                      {result.servingUnit.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='Quantity'>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type='number'
                      value={quantity}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (parseInt(inputValue) > 0) {
                          setQuantity(parseInt(e.target.value));
                        }
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId='Meal Category'>
                    <Form.Label>Meal category:</Form.Label>
                    <Form.Control
                      as='select'
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                    >
                      <option value='Breakfast'>Breakfast</option>
                      <option value='Lunch'>Lunch</option>
                      <option value='Dinner'>Dinner</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Button
              disabled={servingSize === ""}
              onClick={() => {
                handleButtonClick();
                getMacros(result.name, servingSize, quantity);
              }}
              style={{
                height: 60,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 10,
              }}
            >
              View details
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Food Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {macros && (
                  <div>
                    <p>Food Name: {macros.foodName}</p>
                    <p>Serving Quantity: {macros.servingQty}</p>
                    <p>Serving Unit: {macros.servingUnit}</p>
                    <p>Serving Weight In Grams: {macros.servingWeightGrams}</p>
                    <p>Calories: {macros.calories}</p>
                    <p>Protein: {macros.protein}</p>
                    <p>Carbs: {macros.carbs}</p>
                    <p>Fat: {macros.fat}</p>
                    <p>Sugars: {macros.sugars}</p>
                    <p>Sodium: {macros.sodium}</p>
                    <p>Fiber: {macros.fiber}</p>
                    <p>Potassium: {macros.potassium}</p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='primary'
                  type='submit'
                  className='btn btn-primary mx-auto d-block'
                  disabled={macros === {}}
                  onClick={() => {
                    setShowModal(false);
                    createConsumption(macros, date, mealType);
                  }}
                >
                  Add Food
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default RecommendedFoodItem;
