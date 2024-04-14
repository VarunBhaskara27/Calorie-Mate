import React from "react";
import { Container, Row, Col } from "react-bootstrap";

//Code from https://github.com/bradtraversy/proshop_mern/blob/master/frontend/src/components/FormContainer.js

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
