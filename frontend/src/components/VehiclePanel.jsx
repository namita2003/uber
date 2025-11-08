import React from 'react';

const VehiclePanel = (props) => {
    const { fare } = props; // <-- get fare from props
    const vehicleMap = {
        'UberGo': 'car',
        'Moto': 'bike',
        'UberAuto': 'auto'
    };
    const vehicles = [
        {
            name: 'UberGo',
            capacity: 4,
            eta: '2 mins away',
            desc: 'Affordable, compact rides',
            price: '₹193.20',
            img: 'https://open3dmodel.com/wp-content/uploads/2019/09/White-coupe-car-3D-Model.jpg',
        },
        {
            name: 'Moto',
            capacity: 1,
            eta: '3 mins away',
            desc: 'Affordable, motorcycle ride',
            price: '₹65',
            img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
        },
        {
            name: 'UberAuto',
            capacity: 3,
            eta: '2 mins away',
            desc: '',
            price: '₹118.21',
            img: 'https://tse4.mm.bing.net/th/id/OIP.gERohywpalGF3NjolmHt5wHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
        },
    ];

    return (
        <div className="relative">
            <h5
                className="p-1 text-center absolute top-0 w-[93%] cursor-pointer"
                onClick={() => {
                    props.calculateFare(v.name);
                    props.setConfirmedRidePanel(true);
                    props.setVehiclePanel(false); 
                }}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5 mt-8 text-center">Choose a vehicle</h3>

            <div className="space-y-3">
                {vehicles.map((v, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            props.calculateFare(v.name);
                            props.setConfirmedRidePanel(true);
                            props.setVehiclePanel(false); 
                        }}
                        className="flex items-center justify-between w-full p-3 border-2 rounded-xl hover:border-black cursor-pointer"
                    >
                        {/* Vehicle Image */}
                        <img className="h-12 w-12 object-contain" src={v.img} alt={v.name} />

                        {/* Vehicle Info */}
                        <div className="flex-1 ml-4">
                            <h4 className="font-medium text-base">
                                {v.name} <span className="ml-2"><i className="ri-user-3-fill"></i>{v.capacity}</span>
                            </h4>
                            <h5 className="font-medium text-sm text-gray-600">{v.eta}</h5>
                            {v.desc && <p className="font-normal text-xs text-gray-500">{v.desc}</p>}
                        </div>

                        {/* Price */}
                        <h2 className="text-lg font-semibold ml-2">
                            ₹{fare[vehicleMap[v.name]] ?? '...'} {/* show ... while loading */}
                        </h2>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehiclePanel;
