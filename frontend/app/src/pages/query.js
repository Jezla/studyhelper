import React, {useState} from 'react';


const Query = () => {
    const [postContent, setPostContent] = useState('');
    const [answerContent, setAnswerContent] = useState('');
    const [loading, setLoading] = useState(false);
    const landing= () => {
        window.location.href='/landing';
    }


    async function ownLLM() {
        setLoading(true);
        await fetch('http://localhost:8080/api/directdoc?request=' + postContent) 
        .then(response => response.json())
        .then(data => {
            console.log("here: " + data.gptResponse);
            setAnswerContent(data.gptResponse);
            setPostContent(data.gptResponse);
        });
        
        setLoading(false);
    }
    /** Older version 
        const getLLM= () => {
            setLoading(true);
            fetch('http://localhost:8080/api/direct')
            .then(response => response.json())
            .then(async (data) => {
                setAnswerContent(data.gptResponse);
                setPostContent(answerContent);
                ownLLM();
            })

            fetch('http://localhost:8080/api/direct?request="' + postContent + '"')
        };
    */




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
        <div class="flex h-screen ">
            <div class="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat ">
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Quizzes - Student <br></br>
                        <p className="text-3xl">Study helper</p>
                    </h1> 
                </div>

                <div className="pl-24 pt-24">
                
                    <textarea
                        id="small-input"
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                        className="flex-1 p-56 w-11/12 text-gray-900 border rounded-lg text-2xl font-semibold h-full"
                        placeholder="Write the Question"
                        style={{ textAlign: "center" }}
                    />
                </div>

                <div className="flex justify-center space-x-48  mt-20 ">
                    <button onClick={() => {      
                        console.log(postContent);
                        /**getLLM();*/
                        ownLLM();
                        
                        setPostContent(answerContent);
                        setAnswerContent('');
                    }}
                    className="w-2/12  rounded-3xl bg-[#59361E] py-6 text-3xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Ask</button>
                    <button onClick={landing} className="w-2/12  rounded-3xl bg-[#59361E] py-6 text-3xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Return</button>
                </div>
                
            </div>
            
        </div>
    );
};

export default Query;