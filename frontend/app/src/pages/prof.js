
import React from 'react';


const Prof = () => {
    const prof_resource= () => {
        window.location.href='/prof_resources';
    }
    

    const feedback = () => {
        window.location.href='/feedback';
    }




    return (
        <div class="flex h-screen ">
            <div class="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat ">
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Home - Professor <br></br>
                        <p className="text-3xl">study helper</p>
                    </h1> 
                </div>
                <div className="space-y-12 pt-48">
                    <div className="flex space-x-24 justify-center">
                        <button onClick={prof_resource} className=" w-4/12  rounded-3xl bg-[#59361E] p-24 py-64 text-4xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Upload Resources</button>
                        <button onClick={feedback} className=" w-4/12  rounded-3xl bg-[#59361E] p-24 text-4xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Download student feedback</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Prof;
