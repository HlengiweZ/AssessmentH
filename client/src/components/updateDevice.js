import {Button,Form,Modal,Container,Row,Col} from 'react-bootstrap';


const UpdateDeviceModal = ({ updateModalVisible, hideUpdateModal, updateData, updateFormData}) => {
    return (

        <Modal show={updateModalVisible}>
        <Form onSubmit={updateData}>
            <Modal.Header closeButton>
                <Modal.Title>Update Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="SerialNumber">
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control type="text" disabled placeholder="Serial Number" autoFocus defaultValue={updateFormData?.SerialNumber}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue={updateFormData?.Description} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="SmartWeatherEnabled">
                    <Form.Check type="checkbox" label="Smart Weather Enabled" defaultValue={updateFormData?.SmartWeatherEnabled} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Latitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type="number" placeholder="Latitude" defaultValue={updateFormData?.Latitude} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Longitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type="number" placeholder="Longitude" defaultValue={updateFormData?.Longitude} required />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hideUpdateModal}>Close</Button>
                <Button variant="primary" type="submit">Save Device</Button>
            </Modal.Footer>
        </Form>
    </Modal>
    );
}

export default UpdateDeviceModal;