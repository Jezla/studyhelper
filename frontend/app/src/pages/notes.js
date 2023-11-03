import React, { useRef , useState } from 'react';
import { Link } from "react-router-dom";

const Notes = () => {

    const fileInputRef = useRef(null); 
    const [fileSelected, setFileSelected] = useState(false);
    const [fileContent, setFileContent] = useState("");


    // Function to open the file input dialog
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const push = async (e) => {



        try {

            const encodedContent = encodeURIComponent(e);
            
            const response = await fetch('http://localhost:8080/api/user/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "content= " +encodedContent
          });

          console.log(response);
      
          if (response.ok) {
            const data = await response.json();
            console.log(data); 
          } else {
            console.error('Error in Uploading notes');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const handleFileChange = async (event) => {
        if (event.target.files.length > 0) {
            setFileSelected(true); // Update the state when a file is chosen
    
            const file = event.target.files[0];
            const reader = new FileReader();
    
            reader.onload = function(e) {
                setFileContent(e.target.result);
                push(e.target.result);

            };
    
            reader.readAsText(file);
            
        } else {
            setFileSelected(false); // Reset the state if no file is chosen
            setFileContent("");     // Clear the content if no file is chosen
        }
    };
    

    // Function to display file content
    const handleQuiz = () => {
        // send the file conetent to generate quiz
        console.log("file");
    };
    


    return (
        <div className="flex h-screen bg-gradient-to-br from-[#FFA500] to-[#FFF5E1]">
            <div className="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat">

                {/* Header Section */}
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Notes - Student <br></br>
                        <p className="text-3xl">Study helper</p>
                    </h1> 
                </div>

                
                <div className="pl-24 pt-12 flex flex-col items-center">
                    {/* show notes Section */}
                    <div className="w-11/12 h-56 relative rounded-lg shadow-md overflow-hidden">
                    <textarea 
                        id="notes-content" 
                        className="absolute inset-0 w-full h-full p-6 text-gray-900 border-0 text-xl font-semibold resize-none"
                        placeholder=" Upload Notes to View"
                        value={fileContent}
                        readOnly
                    />
                    </div>
                    <br></br>
                    {/* Upload Section */}
                    <div className="w-11/12 h-56 relative rounded-lg shadow-md overflow-hidden bg-white">
                        <div className="flex items-center  justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 space-x-4">
                            <label htmlFor="file-upload" className="text-[#59361E] font-bold text-5xl cursor-pointer ">
                                Import files here
                            </label>
                            <input 
                                ref={fileInputRef}
                                id="file-upload" 
                                type="file" 
                                className="hidden" 
                                accept=".txt"
                                onChange={handleFileChange}
                            />
                            <button 
                                onClick={handleUploadClick}
                                
                                className="bg-[#59361E] py-2 px-6 text-white rounded-lg shadow-md text-3xl hover:bg-gray-600"
                            >
                                Upload
                            </button>
                            {fileSelected && ( 
                                <Link to="/quiz">
                                <button onClick={handleQuiz}
                                    className="bg-green-600 py-2 px-6 text-white rounded-lg shadow-md text-3xl hover:bg-green-700">
                                    Generate Quiz
                                </button>
                                </Link>
                            )}
                        </div>
                    </div>
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

export default Notes;