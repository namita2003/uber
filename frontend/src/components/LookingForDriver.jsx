import React from 'react';

const LookingForDriver = ({ pickup, destination, fare, selectedVehicle, setVehicleFound }) => {
    console.log('LookingForDriver:', { pickup, destination, fare, selectedVehicle });
    const vehicleMap = {
        'UberGo': 'car',
        'Moto': 'bike',
        'UberAuto': 'auto',
    };

    const displayedFare = fare ? fare[vehicleMap[selectedVehicle]] : undefined;

    return (
        <div>
            {/* Close Button */}
            <h5
                className="p-1 text-center absolute top-0 w-[93%]"
                onClick={() => setVehicleFound(false)}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5">Looking for a driver</h3>

            <div className="flex gap-3 justify-between items-center flex-col">
                {/* Vehicle Image */}
                <img
                    className="h-20"
                    src="https://open3dmodel.com/wp-content/uploads/2019/09/White-coupe-car-3D-Model.jpg"
                    alt="Vehicle"
                />

                {/* Ride Details */}
                <div className="w-full mt-5">
                    {/* Pickup */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{pickup || 'Pickup not set'}</h3>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">{destination || 'Destination not set'}</h3>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">
                                {displayedFare ? `₹${displayedFare}` : 'Calculating fare...'}
                            </h3>

                            <p className="text-sm text-gray-600 -mt-1">{selectedVehicle || 'Vehicle type'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LookingForDriver;
