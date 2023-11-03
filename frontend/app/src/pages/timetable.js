import React from 'react';

import { Link } from "react-router-dom";

const Timetable = () => {

    // const [fileContent, setFileContent] = useState(""); // how do i set this 


    return (
        <div className="flex h-screen bg-gradient-to-br from-[#FFA500] to-[#FFF5E1]">
            <div className="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat">

                {/* Header Section */}
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Timetable - Student <br></br>
                        <p className="text-3xl">Study helper</p>
                    </h1> 
                </div>
                
                <div className="pl-24 pt-12 flex flex-col items-center">
                    {/* show notes Section */}
                    <div className="w-11/12 h-56 relative rounded-lg shadow-md overflow-hidden">
                    <textarea 
                        id="notes-content" 
                        className="absolute inset-0 w-full h-full p-6 text-black-900 border-0 text-xl font-semibold resize-none"
                        placeholder='Timetable:
                        - Upload Notes 08:00 - 10:00
                        - Practice Quiz 12:00 - 14:00
                        - Review Notes 17:00 - 19:00
                        - Provide Feedback 21:00 - 22:00'
                    />
                    </div>
                    <br></br>
                    
                </div>

                {/* Return Button */}
            <div className="mt-20 flex  justify-center">
                <Link to="/prof">
                    <button  className="bg-[#59361E] py-2 px-6 text-white rounded-lg shadow-md text-4xl hover:bg-gray-600">
                        Return
                    </button>
                </Link>
            </div>

                
            </div>
        </div>
    );
};

export default Timetable;