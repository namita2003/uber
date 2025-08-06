import React from 'react'

const LocationSearchPanel = (props) => {
  //console.log(props);
  
  const locations = [
    "186, ghuramau bangla near ncc office",
    "124, loharbagh near ncc office",
    "156, arya nagar near sumitra school",
    "200, shivaji nagar near city mall",
  ];
  return (
    <div>
      {
        locations.map((location, index) => (
          <div onClick={()=>{
            
            props.setVehiclePanel(true);
            props.setPanelOpen(false);
          }} key={index} className='flex items-center justify-start border-2 border-gray-50 active:border-black rounded-xl my-2 gap-4 p-3'>
            <h2 className='bg-[#eee] rounded-full h-8 w-10 flex items-center justify-center my-4'><i className="ri-map-pin-line"></i></h2>
            <h4 className='text-base font-medium'>{location}</h4>
          </div>
        ))
      }
      {/* <div className='flex items-center justify-start border-2 border-gray-50 active:border-black rounded-xl my-2 gap-4 p-3'>
        <h2 className='bg-[#eee] rounded-full h-8 w-10 flex items-center justify-center my-4'><i className="ri-map-pin-line"></i></h2>
        <h4 className='text-base font-medium'>186, ghuramau bangla near ncc office</h4>
      </div>
      <div className='flex items-center justify-start border-2 border-gray-50 active:border-black rounded-xl my-2 gap-4 p-3'>
        <h2 className='bg-[#eee] rounded-full h-8 w-10 flex items-center justify-center my-4'><i className="ri-map-pin-line"></i></h2>
        <h4 className='text-base font-medium'>186, ghuramau bangla near ncc office</h4>
      </div>
      <div className='flex items-center justify-start border-2 border-gray-50 active:border-black rounded-xl my-2 gap-4 p-3'>
        <h2 className='bg-[#eee] rounded-full h-8 w-10 flex items-center justify-center my-4'><i className="ri-map-pin-line"></i></h2>
        <h4 className='text-base font-medium'>186, ghuramau bangla near ncc office</h4>
      </div>
      <div className='flex items-center justify-start border-2 border-gray-50 active:border-black rounded-xl my-2 gap-4 p-3'>
        <h2 className='bg-[#eee] rounded-full h-8 w-10 flex items-center justify-center my-4'><i className="ri-map-pin-line"></i></h2>
        <h4 className='text-base font-medium'>186, ghuramau bangla near ncc office</h4>
      </div>
      <div className='flex items-center justify-start border-2 border-gray-50 active:border-black rounded-xl my-2 gap-4 p-3'>
        <h2 className='bg-[#eee] rounded-full h-8 w-10 flex items-center justify-center my-4'><i className="ri-map-pin-line"></i></h2>
        <h4 className='text-base font-medium'>186, ghuramau bangla near ncc office</h4>
      </div> */}
    </div>
  )
}

export default LocationSearchPanel