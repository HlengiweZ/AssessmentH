const DevicesTable = ({ devices, showAddModal,showUpdateModal, showDeleteModal, showForecast}) => {

    if (devices === undefined) return 'No devices'
    return (
        <div>
            <div className="header">
                <button className="btn btn-view" onClick={showAddModal}>Add Device</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Description</th>
                        <th>Smart Weather?</th>
                        <th>City ID </th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {devices.map((device, index) => {
                        return (
                            <tr key={index}>
                                <td>{device.SerialNumber}</td>
                                <td>{device.Description}</td>
                                <td>{device.SmartWeatherEnabled == 1 ? 'Yes' : 'No'}</td>
                                <td>{device.CityID}</td>
                                <td>{device.Latitude}</td>
                                <td>{device.Longitude}</td>
                                <td>
                                    <button 
                                        disabled={device.SmartWeatherEnabled ===0} 
                                        className="btn btn-primary 12 Hour"
                                        onClick={() => showForecast(device.CityID)}>
                                            Forecast
                                    </button>
                                    <button className="btn btn-primary" onClick={() => showUpdateModal(device)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => showDeleteModal(device.SerialNumber)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DevicesTable;

                                //  disabled  need to disable the condition under the statement that if it doesnt have a valid city id