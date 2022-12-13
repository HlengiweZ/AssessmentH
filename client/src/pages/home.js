import "./home.scss";
import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios';
import {Button,Form,Modal,Container,Row,Col} from 'react-bootstrap';
import DevicesTable from '../components/DevicesTable'
import AddDeviceModal from "../components/addDevice";
import UpdateDeviceModal from "../components/updateDevice";


const fetchDevices = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    return response.data;
};

const Home = () => {

    const [devices, setDevices] = useState([]);
    const [addModalVisible, setAddVisible] = useState(false);
    const [updateModalVisible, setUpdateVisible] = useState(false);
    const [deleteModalVisible, setShowDeleteVisible] = useState(false);
    const [updateFormData, setUpdateData] = useState({});
    const [forecast, setForecast] = useState([]);
    const [forecastModalVisible, setShowForecastVisible] = useState(false);
    const [id, setId] = useState('');


    useEffect(() => {
        (async () => {
            const devices = await fetchDevices();
            console.log(devices);
            setDevices(devices);
        })();
    }, []);

    const hideAddModal = () => {
        setAddVisible(false)
    }

    const showAddModal = () => {
        setAddVisible(true)
    }

    const showUpdateModal = (device) => {
        setUpdateData(device)
        setUpdateVisible(true)
    }
  
    const hideUpdateModal = () => {
        setUpdateVisible(false)
    }

    const showDeleteModal = (id) => {
        setId(id)
        setShowDeleteVisible(true)
    }

    const hideDeleteModal = () => {
        setShowDeleteVisible(false)
    }

//created the modal called forecast which will be displayed when the view button is clicked
    const showForecastModal = (cityId) => {
        const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityId}?apikey=fSLx4bxM2WEhJMktEVxDQxnfWN2IsAfQ&details=true&metric=true"`;
        axios.get(forecastUrl)
        .then((res) => {// if is successful
            console.log(res.data)
            setForecast(res.data)
            setShowForecastVisible(true)
        }).catch((e) => { // if there was an error
            alert('Error fetching forecast')
        });

    }

    const hideForecastModal = () => {
        setShowForecastVisible(false)
    }

// moved on to create a method for my save device modal  to send the data genarated to the backend using axios) 
    const saveData = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        // TODO: use axios to send data to Backend
        // TODO: after you send data hide modal
        // TODO: add infor to table in FE
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }

        const { SerialNumber, Description, SmartWeatherEnabled, Latitude, Longitude } = event.target.elements;
        const data = {
            SerialNumber: SerialNumber.value,
            Description: Description.value,
            SmartWeatherEnabled: SmartWeatherEnabled.checked,
            Latitude: parseFloat(Latitude.value),
            Longitude: parseFloat(Longitude.value),
        }

        try {
            await axios.post("http://localhost:5000/api/create", data); // post data to server using my create staatement
            const devices = await fetchDevices(); // fetch devices after creating
            setDevices(devices); //update devices table
            setAddVisible(false); // hide add modal
        } catch (e) {
            alert('Error adding device')
        }

        // axios.post("http://localhost:5000/api/create", data)
        // .then(() => {// if is successful
        //     fetchDevices().then((data) => {
        //         setAddVisible(false);
        //         setDevices(data);
        //     })
        // }).catch((e) => { // if there was an error and the above to refresh page everytime a device is created
        //     alert('Error adding device')
        // });

    }

    const updateData = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        // TODO: use axios to send data to Backend
        // TODO: after you send data hide modal
        // TODO: add information to table in FE
        // used form validation on react bootstrap

        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }

        const { SerialNumber, Description, SmartWeatherEnabled, Latitude, Longitude } = event.target.elements;
        const data = {
            SerialNumber: SerialNumber.value,
            Description: Description.value,
            SmartWeatherEnabled: SmartWeatherEnabled.checked,
            Latitude: parseFloat(Latitude.value),
            Longitude: parseFloat(Longitude.value),
        }
        axios.put("http://localhost:5000/api/update", data)
        .then(() => {
            const oldDevice = devices.find(device => device.SerialNumber === data.SerialNumber)
            var index = devices.indexOf(oldDevice)
            data.CityID = oldDevice.CityID;
            devices.splice(index, 1)
            setDevices([...devices, data])
            setUpdateVisible(false)
         }).catch((e) => {
            alert("Error updating weather")
         });
    }
    // researched on getting data by each row in the table,first we find the device by using serial number
// deleted information by serial number
    const deleteData = (id) => {
        axios.delete(`http://localhost:5000/api/delete/${id}`)
        .then(() => {
            const oldDevice = devices.find(device => device.SerialNumber === id)
            var index = devices.indexOf(oldDevice)
            devices.splice(index, 1)
            setDevices([...devices])
            setShowDeleteVisible(false)
         }).catch((e) => {
            alert("Error deleting device")
         });
    }

//called my components on the side which are add,update and delete modals 
    return (
        <Container fluid="sm">
            <Row>
                <Col>
                    <div className="home-container pt-5">
                        <DevicesTable 
                            devices={devices} 
                            showAddModal={showAddModal} 
                            showUpdateModal={showUpdateModal} 
                            showDeleteModal={showDeleteModal} 
                            showForecast={showForecastModal}
                            />

                        <AddDeviceModal 
                            saveData={saveData} 
                            addModalVisible={addModalVisible} 
                            hideModal={hideAddModal}/>
 
                        <UpdateDeviceModal 
                            updateModalVisible={updateModalVisible}
                            hideUpdateModal={hideUpdateModal}
                            updateData={updateData}
                            updateFormData={updateFormData}
                            />
 
                        {/*create modal for deleting*/}
                        <Modal show={deleteModalVisible}>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    DELETE DEVICE 
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    Are you sure you want to delete {id}?
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={hideDeleteModal}>CLOSE</Button>
                                <Button onClick={() => deleteData(id)}>DELETE</Button>
                            </Modal.Footer>
                        </Modal>

                        {/*create modal*/}
                        <Modal show={forecastModalVisible} size="lg" >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Forecast
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <table> 
                                    <tbody>
                                        <tr>
                                            <td>Solar Irradiance </td>
                                            <td>Cloud Cover </td>
                                            <td>Wind speed </td>
                                            <td>Temperature</td>
                                            <td>Precipitation Probability</td>
                                        </tr>

                                        {forecast && forecast?.map((f, i) => (
                                            <tr key={i}>
                                                <td>{f.SolarIrradiance.Value} </td>
                                                <td>{f.CloudCover}</td>
                                                <td>{f.Wind.Speed.Value}</td>
                                                <td>{f.Temperature.Value} </td>
                                                <td>{f.PrecipitationProbability}</td>



                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={hideForecastModal}>CLOSE</Button>
                                <Button onClick={() => deleteData(id)}>DELETE</Button>
                            </Modal.Footer>
                        </Modal>
                    </div >
                </Col>
            </Row>
        </Container>
    )
}
export default Home;

{/* <td>{f.SolarIrradiance.Value} {f.SolarIrradiance.Unit}</td>
                                                <td>{f.CloudCover}</td>
                                                <td>{f.Wind.Speed.Value} {f.Wind.Speed.Unit}</td>
                                                <td>{f.Temperature.Value} {f.Temperature.Unit}</td>
                                                <td>{f.PrecipitationProbability}</td> */}