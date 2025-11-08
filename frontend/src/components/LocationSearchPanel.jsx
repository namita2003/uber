import React from "react";

const LocationSearchPanel = ({
  suggestions,
  onSuggestionClick
}) => {
  //console.log('Rendering suggestions:', suggestions);

  return (
    <div className='p-3 overflow-y-auto max-h-[300px]'>
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSuggestionClick(suggestion)} // ✅ only call this
            className='flex items-center justify-start border-2 border-gray-50 rounded-xl my-2 gap-4 p-3 cursor-pointer hover:bg-gray-100'
          >
            <h2 className='bg-[#eee] rounded-full h-8 w-10 flex items-center justify-center'>
              <i className="ri-map-pin-line"></i>
            </h2>
            <h4 className='text-base font-medium'>{suggestion}</h4>
          </div>
        ))
      ) : (
        <div className='text-gray-500 p-3 text-center'>
          Start typing to see suggestions...
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
