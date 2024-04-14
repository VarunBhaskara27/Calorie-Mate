import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

//Component that let's you create or edit exerices

const ExerciseView = ({
  showModal,
  onSubmit,
  onUpdate,
  handleClose,
  exercise,
}) => {
  const [exerciseType, setExerciseType] = useState("Yoga");
  const [minutes, setExerciseMinutes] = useState();

  useEffect(() => {
    if (exercise) {
      setExerciseType(exercise.type);
      setExerciseMinutes(exercise.minutes);
    }
  }, [exercise]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(exerciseType, minutes);
    setExerciseType("");
    setExerciseMinutes(0);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(exercise.exerciseId, exerciseType, minutes);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {exercise ? "Edit Exercise" : "Create Exercise"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={exercise ? handleUpdate : handleSubmit}>
          <Form.Group controlId='Exercise category'>
            <Form.Label>Select your exercise category</Form.Label>
            <Form.Control
              as='select'
              value={exerciseType}
              onChange={(e) => {
                setExerciseType(e.target.value);
              }}
            >
              <option value='Yoga'>Yoga</option>
              <option value='Running'>Running</option>
              <option value='Skiing'>Skiing</option>
              <option value='Hiking'>Hiking</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='formExerciseMinutes'>
            <Form.Label>Exercise Minutes</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter exercise minutes'
              value={minutes}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (parseInt(inputValue) > 0) {
                  setExerciseMinutes(parseInt(inputValue));
                }
              }}
            />
          </Form.Group>

          <Button
            variant='primary'
            type='submit'
            className='btn btn-primary mx-auto d-block'
            onClick={handleClose}
          >
            {exercise ? "Update" : "Save"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExerciseView;
