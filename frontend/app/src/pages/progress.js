import React, { useRef , useState } from 'react';
import { Link } from "react-router-dom";

const Progress = () => {

    // const [fileContent, setFileContent] = useState(""); // how do i set this 


    return (
        <div className="flex h-screen bg-gradient-to-br from-[#FFA500] to-[#FFF5E1]">
            <div className="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat">

                {/* Header Section */}
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Progress Report - Student <br></br>
                        <p className="text-3xl">Study helper</p>
                    </h1> 
                </div>
                
                <div className="pl-24 pt-12 flex flex-col items-center">
                    {/* show notes Section */}
                    <div className="w-11/12 h-56 relative rounded-lg shadow-md overflow-hidden">
                    <textarea 
                        id="notes-content" 
                        className="absolute inset-0 w-full h-full p-6 text-gray-900 border-0 text-xl font-semibold resize-none"
                        placeholder=" Progress report:"
                        readOnly
                    />
                    </div>
                    <br></br>
                    
                </div>

                {/* Return Button */}
            <div className="mt-20 flex  justify-center">
                <Link to="/landing">
                    <button  className="bg-[#59361E] py-2 px-6 text-white rounded-lg shadow-md text-4xl hover:bg-gray-600">
                        Return
                    </button>
                </Link>
            </div>

                
            </div>
        </div>
    );
};

export default Progress;
