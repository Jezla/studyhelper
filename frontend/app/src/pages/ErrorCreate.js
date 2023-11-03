
import React, { useState }from 'react';



const ErrorCreate = () => {
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

                <div className=" flex flex-col space-y-12 items-center pt-48">
                    <div className="bg-[length:100px_200px] w-8/12 bg-white/[.36] p-10 rounded-3xl  bg-center">
                        <div className=" flex flex-col space-y-12 items-center pt-4">
                            <h1 className="text-2xl text-[#59361E]text-center">
                            Registration Unsuccessful. 
                            An account likely already exists with that name.
                            </h1> 
                

                

                    
                         </div>
                     </div>
                     <div className="flex space-x-48 justify-center">
                     <button onClick={login} className="w-3/12  rounded-3xl bg-[#59361E] py-4 pr-12 pl-12 text-3xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Log in</button>
                    <button onClick={create} className="w-3/12  rounded-3xl bg-[#59361E] py-4 pr-24 pl-12 text-3xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent">Create an account</button>
                
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ErrorCreate;
