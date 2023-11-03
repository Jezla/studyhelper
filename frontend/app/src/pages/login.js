
import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');

    const login = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "username=" + username + "&password=" + password
          });
      
          if (response.ok) {
            const data = await response.json();
             if (userType=='student'){
                window.location.href='/landing';
             }
             else {
                //GOING TO HOME PROF PAGE WHICH IS NOT CREATED YET
             }
            console.log(data); 
          } else {
            window.location.href='/ErrorLogin';
            console.error('Erreur lors de la connexion.');
          }
        } catch (error) {
          console.error(error);
        }
      };
      
    
    return (
        <div class="flex h-screen w-full ">
        <div class="flex-1 bg-book bg-cover bg-center bg-no-repeat ">
            <div className="flex flex-1 bg-[#FFA500]  font-bold justify-center py-20">
                <h1 className="text-7xl text-[#59361E] uppercase tracking-wide text-center">
                    Study Helper
                </h1> 
            </div>
            
            <div className=" flex flex-col space-y-24 items-center pt-28">
                <div className="bg-[length:100px_200px] w-4/12 bg-white/[.36] p-10 rounded-3xl  bg-center">
                
                <div class="mb-4">
                    <label class="block text-[#59361E] text-2xl  font-bold mb-2" for="username">
                    Username :
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" value= {username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div class="mb-6">
                    <label class="block text-[#59361E] text-2xl  font-bold mb-2" for="password">
                    Password :
                    </label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>

                <button onClick={login} className="w-10/12 rounded-3xl  bg-[#59361E] py-1 pr-24 pl-24 text-2xl duration-500 text-white hover:bg-gray  active:scale-90 disabled:bg-transparent"> Log in </button>
                
            </div>
            </div>
        </div>
    </div>

    );
};

export default Login;
