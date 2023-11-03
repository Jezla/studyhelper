
import React, { useState }from 'react';



const AccountStudent = () => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const exit = () => {
        window.location.href='/landing';
    }
    async function userCheck() {
        fetch('http://localhost:8080/api/user')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setUsername(data.username);
        })};

    userCheck();

    return (
        <div class="flex h-screen w-full ">
            <div class="flex-1 flex-shrink-0 bg-book bg-cover bg-center bg-no-repeat ">
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-8">
                    <h1 className="text-7xl text-[#964B00] uppercase tracking-wide text-center">
                        Account - Student
                    </h1> 
                </div>
                <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-8">
                    <h1 className="text-4xl text-[#964B00] uppercase tracking-wide text-center">
                        Study Helper
                    </h1> 
                </div>
                <div className=" flex flex-col space-y-12 items-center pt-8">
                <div className="bg-[length:100px_200px] w-8/12 bg-white/[.36] p-10 rounded-3xl  bg-center">
                <div className=" flex flex-col space-y-12 items-center pt-4">
                    
                    <button className="w-10/12  rounded-3xl bg-[#59361E] py-2 text-3xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> My Username : </button>
                    <label class="block text-[#59361E] text-4xl  font-bold mb-2" for="password">
                    {username}  
                    </label>


                    <button onClick={exit} className="w-3/12  rounded-3xl bg-[#59361E] py-4 text-3xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Return </button>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default AccountStudent;
