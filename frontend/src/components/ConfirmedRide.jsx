import React from 'react';

const ConfirmedRide = (props) => {
    const { fare, selectedVehicle, pickup, destination } = props;

    // Map vehicle names to fare keys
    const vehicleMap = {
        'UberGo': 'car',
        'Moto': 'bike',
        'UberAuto': 'auto',
    };

    const displayedFare = fare[vehicleMap[selectedVehicle]] ?? '...';

    return (
        <div>
            <h5 className='p-1 text-center absolute top-0 w-[93%]' onClick={() => {
                props.setConfirmedRidePanel(false);
            }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>

            <div className='flex gap-3 justify-between items-center flex-col'>
                <img className='h-20' src="https://open3dmodel.com/wp-content/uploads/2019/09/White-coupe-car-3D-Model.jpg" alt="" />

                <div className='w-full mt-5'>
                    {/* Pickup */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{pickup}</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Pickup Location</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{destination}</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Destination</p>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{displayedFare}</h3>
                            <p className='text-sm text-gray-600 -mt-1'>Cash cash</p>
                        </div>
                    </div>
                </div>

                <button
                    className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                    onClick={() => {
                        // pick first vehicle from fare object if selectedVehicle is empty
                        const vehicle = selectedVehicle || Object.keys(fare)[0];
                        props.setSelectedVehicle(vehicle);       // set selected vehicle in Home
                        props.setVehicleFound(true);             // show LookingForDriver
                        props.setConfirmedRidePanel(false);      // hide ConfirmedRide
                        props.setVehiclePanel && props.setVehiclePanel(false);
                    }}
                >
                    Confirm
                </button>



            </div>
        </div>
    );
};

export default ConfirmedRide;
