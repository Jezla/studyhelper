import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Quiz = () => {

    // Example states for the question and responses
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [question, setQuestion] = useState("No Notes provided");
    const [responses, setResponses] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");  // Example correct answer
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [feedback, setFeedback] = useState(null); 
    const [score, setScore] = useState(0); 
    const [disableNext, setDisable] = useState(false);
    const [loading, setLoading] = useState(true);


    async function load () {
        setLoading(true);
        await fetch('http://localhost:8080/api/user/quiz') 
        .then(response => response.text())  // get as text first
        .then(text => {
            console.log(text);  // Log the raw text
            const modifiedText = "[" + text.replace(/\}\s*\{/g, "},{") + "]";
            return JSON.parse(modifiedText); 
        })
        .then(data => {

            console.log(data);
            
            if (data && data.length > 1 ) {
                setAllQuestions(data);
                if (data[currentIndex]) {
                    setQuestion(data[currentIndex].question);
                    setResponses(data[currentIndex].options);
                    setCorrectAnswer(data[currentIndex].correct_answer);
                } else {
                    console.error(`Question at index ${currentIndex} doesn't exist.`);
                }

                setCurrentIndex(currentIndex + 1);

            } else {
                console.error('Invalid data format received');
            }
    
        });
        setLoading(false);
    }


    const handleNext = () => {
        if (allQuestions.length > 0) {
            setQuestion(allQuestions[currentIndex].question);
            setResponses(allQuestions[currentIndex].options);
            setCorrectAnswer(allQuestions[currentIndex].correct_answer);

            if(currentIndex===1){
                setDisable(true);
                setCurrentIndex(1+currentIndex);
            }
        }

        
    }

    const handleValidation = () => {
        if (selectedResponse === correctAnswer) {
            setFeedback("Correct!");
            setScore(1+score);
        } else {
            setFeedback("Wrong answer. Please try again.");
        }

        console.log(currentIndex);

        if(currentIndex === allQuestions.length){
            setFeedback("You scored: " +  score + "/2"    );

        }
    }

    useEffect(() => {
        load();
    }, []);

    if (loading) {
        return (
            <div class="flex h-screen ">
                <div class="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat ">
                    <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                        <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                            Quizzes - Student <br></br>
                            <p className="text-3xl">Study helper</p>
                        </h1> 
                    </div>

                    <div className='flex items-center justify-center pt-[300px]'>
                        <p className="text-6xl text-white ">Loading...</p>
                    </div>
                </div>    
            </div>
        );
    }
    

    return (
        <div className="flex h-screen bg-gradient-to-br from-[#FFA500] to-[#FFF5E1]">
            <div className="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat">

                {/* Header Section */}
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Quizzes - Student <br></br>
                        <p className="text-3xl">Study Helper</p>
                    </h1> 
                </div>

                <div className="pl-24 pt-12 flex flex-col items-center">
                    {/* Question Section */}
                    <div className="w-11/12 h-56 relative rounded-lg shadow-md overflow-hidden bg-white">
                        <div className="p-6 text-gray-900 text-xl font-semibold">
                            {question}
                        </div>
                    </div>
                    <br/>
                    {/* Responses Section */}
                    <div className="w-11/12 h-56 relative rounded-lg shadow-md overflow-hidden bg-white">
                        {responses.map((response, idx) => (
                            <div key={idx} className="p-4">
                                <input 
                                    type="radio"
                                    id={`response-${idx}`}
                                    name="quiz-response"
                                    value={response}
                                    onChange={() => setSelectedResponse(response)}
                                />
                                <label htmlFor={`response-${idx}`} className="ml-2">{response}</label>
                            </div>
                        ))}
                    </div>

                    {feedback && (
                        <div className="mt-5 text-2xl text-white ">
                            {feedback}
                        </div>
                    )}

                    <br/>
                    {/* Validate Button */}
                    <button onClick={handleValidation}  className="bg-[#59361E] py-2 px-6 text-white rounded-lg shadow-md text-4xl hover:bg-gray-600">
                        Validate
                    </button>

                    {/* Next Button */}
                    <button onClick={handleNext} disabled={disableNext} className="mt-5 bg-[#59361E] py-2 px-6 text-white rounded-lg shadow-md text-4xl hover:bg-gray-600">
                        Next
                    </button>

                    <br/>
                    {/* Return Button */}
                    <Link to="/landing">
                        <button className="mt-5 bg-[#59361E] py-2 px-6 text-white rounded-lg shadow-md text-4xl hover:bg-gray-600">
                            Return
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
