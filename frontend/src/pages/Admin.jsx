import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import "./admin.css";

const Admin = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  // States for Edit Tour Modal
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editTour, setEditTour] = useState(null);

  // States for Add Tour Modal
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newTour, setNewTour] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    price: "",
    maxGroupSize: "",
    desc: "",
    photo: "",
    featured: false,
  });

  // Fetch tours on mount
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tours");
      if (response.data.success) {
        setTours(response.data.data);
        setError(null);
      } else {
        setError("Failed to fetch tours: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Try again later.");
    }
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/tours/${_id}`);
      if (response.data.success) {
        setTours(tours.filter((tour) => tour._id !== _id));
      } else {
        setError("Failed to delete tour: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting tour.");
    }
  };

  // Open Edit Modal
  const handleEditOpen = (tour) => {
    setEditTour({ ...tour });
    setEditModalOpen(true);
  };

  // Handle Edit Save
  const handleEditSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/tours/${editTour._id}`,
        editTour
      );
      if (response.data.success) {
        setTours(tours.map((tour) => (tour._id === editTour._id ? response.data.data : tour)));
        setEditModalOpen(false);
        setError(null);
      } else {
        setError("Failed to update tour: " + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Error updating tour.");
    }
  };

  // Handle Input Change for Edit/Add Modal
  const handleInputChange = (e, setState) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setState((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <Container fluid>
      <h1 className="my-4">Admin Dashboard</h1>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tours Table */}
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>City</th>
            <th>Address</th>
            <th>Distance</th>
            <th>Price</th>
            <th>Max Group Size</th>
            <th>Description</th>
            <th>Photo</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td>{tour.title}</td>
              <td>{tour.city}</td>
              <td>{tour.address}</td>
              <td>{tour.distance} km</td>
              <td>₹{tour.price}</td>
              <td>{tour.maxGroupSize}</td>
              <td>{tour.desc}</td>
              <td>{tour.photo}</td>
              <td>{tour.featured ? "Yes" : "No"}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditOpen(tour)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleDelete(tour._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Tour Button */}
      <div className="text-center my-4">
        <Button color="success" onClick={() => setAddModalOpen(true)}>
          + Add Tour
        </Button>
      </div>

      {/* Edit Tour Modal */}
      {editTour && (
        <Modal isOpen={isEditModalOpen} toggle={() => setEditModalOpen(false)}>
          <ModalHeader>Edit Tour</ModalHeader>
          <ModalBody>
            <Form>
              {Object.keys(editTour).map((key) => (
                <FormGroup key={key}>
                  <Label for={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    id={key}
                    name={key}
                    value={editTour[key]}
                    onChange={(e) => handleInputChange(e, setEditTour)}
                    type={typeof editTour[key] === "boolean" ? "checkbox" : "text"}
                  />
                </FormGroup>
              ))}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleEditSave}>
              Save
            </Button>
            <Button color="secondary" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Add Tour Modal */}
      <Modal isOpen={isAddModalOpen} toggle={() => setAddModalOpen(false)}>
        <ModalHeader>Add Tour</ModalHeader>
        <ModalBody>
          <Form>
            {Object.keys(newTour).map((key) => (
              <FormGroup key={key}>
                <Label for={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input
                  id={key}
                  name={key}
                  value={newTour[key]}
                  onChange={(e) => handleInputChange(e, setNewTour)}
                  type={typeof newTour[key] === "boolean" ? "checkbox" : "text"}
                />
              </FormGroup>
            ))}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => console.log("Add Functionality Here")}>
            Add
          </Button>
          <Button color="secondary" onClick={() => setAddModalOpen(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Admin;