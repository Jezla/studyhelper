
import React from 'react';



const Home = () => {
    const login= () => {
        window.location.href='/login';
    }
    


    const create = () => {
        window.location.href='/create';
    }
    
    return (
        <div class="flex h-screen w-full ">
            <div class="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat ">
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Study Helper
                    </h1> 
                </div>
                <div className="flex flex-col space-y-24 pt-52 items-center">
                    <button onClick={login} className="w-3/12  rounded-3xl bg-[#59361E] py-6 text-3xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Log in</button>
                    <button onClick={create} className="w-3/12  rounded-3xl bg-[#59361E] py-6 text-3xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Create an account</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
