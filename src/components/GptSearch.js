import React, { useRef } from "react";

const GptSearch = () => {
    const userQuery = useRef("");
    return (
        <div className='flex justify-center items-center bg-black p-4 rounded-md w-[50%] mx-auto h-20x '>
            <input ref={userQuery} type="text" className="p-2 rounded-md w-[90%] text-black bg-white" placeholder="Ask me anything about movies or TV shows..." />
            <button className="ml-4 p-2 bg-red-600 text-white w-25 rounded-md hover:cursor-pointer">Search</button>
        </div>
    );
};

export default GptSearch;