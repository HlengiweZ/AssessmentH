import {Button,Form,Modal,Container,Row,Col} from 'react-bootstrap';


const AddDeviceModal = ({ addModalVisible, hideModal, saveData }) => {
    return (
        <Modal show={addModalVisible}>
        <Form onSubmit={saveData}>
            <Modal.Header closeButton>
                <Modal.Title>Add Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="SerialNumber" required>
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control type="text" placeholder="00:00:00:00:AB:CD" autoFocus required pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"  />
                    {/* required pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$"  */} 
                    {/* used regex expressions tried to find one for the float latitude and longitude but could not */}
                <Form.Control.Feedback>Please provide a valid Serial Number.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Description" required>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    {/* required minLength={15} maxLength={30} */}
                    <Form.Control.Feedback>Please provide a valid Description.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="SmartWeatherEnabled">
                    <Form.Check type="checkbox" label="Smart Weather Enabled" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Latitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control  placeholder="Latitude" required/>
                    <Form.Control.Feedback>Please provide a valid Latitude.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Longitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control  placeholder="Longitude"/>
                    <Form.Control.Feedback>Please provide a valid Longitude.</Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideModal}>Close</Button>
                <Button variant="primary" type="submit">Save Device</Button>
            </Modal.Footer>
        </Form>
    </Modal>
    );
}

export default AddDeviceModal;