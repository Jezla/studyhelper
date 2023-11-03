
import React from 'react';


const Landing = () => {

    const notes= () => {
        window.location.href='/notes';
    }
    

    const resources = () => {
        window.location.href='/resources';
    }

    const quiz= () => {
        window.location.href='/quiz';
    }
    

    const query = () => {
        window.location.href='/query';
    }

    async function profCheck() {
        fetch('http://localhost:8080/api/user')
        .then((response) => response.json())
        .then((data) => {
            console.log(data.username);
            if (data.username == 'teacher') {
                window.location.href='/prof';
            }})
        .catch((err) => {
            console.log(err.message);
        });
    };

    profCheck();


    return (
        <div class="flex h-screen ">
            <div class="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat ">
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Study Helper
                    </h1> 
                </div>
                <div className="space-y-12 pt-48">
                    <div className="flex space-x-24 justify-center">
                        <button onClick={notes} className=" w-4/12  rounded-3xl bg-[#59361E] p-24 text-4xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Notes</button>
                        <button onClick={resources} className=" w-4/12  rounded-3xl bg-[#59361E] p-24 text-4xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Professor Resources</button>
                    </div>
                    <div className="flex space-x-24 justify-center ">
                        <button onClick={quiz} className=" w-4/12  rounded-3xl bg-[#59361E] p-24 text-4xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Quizzes</button>
                        <button onClick={query} className=" w-4/12  rounded-3xl bg-[#59361E] p-24 text-4xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Direct Queries</button>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default Landing;
