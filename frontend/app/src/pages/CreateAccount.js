
import React, {useState} from 'react';
import { Outlet, Link } from "react-router-dom";


const CreateAccount = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [userType, setUserType] = useState('student');

    const handleCreateAccount = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "username=" + username + "&password=" + password + "&type=" + userType
          });

          if (response.ok) {
            const data = await response.json();
            window.location.href='http://localhost:3000/login';
            console.log(data);
          } else {
            window.location.href='http://localhost:3000/ErrorCreate';
            console.error('Registration unsuccesful');
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
            
            <div className=" flex flex-col space-y-24 items-center pt-14">
                <div className="bg-[length:100px_200px] w-3/12 bg-white/[.36] p-10 rounded-3xl  bg-center">
                
                <div class="mb-4">
                    <label class="block text-[#59361E] text-1xl font-bold mb-2" for="username">
                    Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" value= {username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div class="mb-6">
                    <label class="block text-[#59361E] text-1xl  font-bold mb-2" for="password">
                    Password
                    </label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" value= {password} onChange={(e) => setPassword(e.target.value)}></input>
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div class="mb-6">
                    <label class="block text-[#59361E] text-1xl  font-bold mb-2" for="password">
                    Verify Password
                    </label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value= {verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}></input>
                    <p class="text-red-500 text-xs italic">Please type the same password.</p>
                </div>
                <label class="block text-[#59361E] text-1xl  font-bold mb-2" >
                    Are you a student or a professor ?
                    </label>
                <div class="flex gap-10"> 
                    <div class="inline-flex items-center">
                        <label 
                        class="relative flex cursor-pointer items-center rounded-full p-3"
                        for="student"
                        data-ripple-dark="true"
                        >
                        <input
                        type="radio"
                        id="student"
                        name="userType"
                        value="student"
                        checked={userType === "student"}
                        onChange={() => setUserType("student")}
                        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        />
                    <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        >
                        <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                        </svg>
                    </div>
                        </label>
                        <label
                        class=" block text-orange-950 text-2xl mt-px cursor-pointer select-none font-light"
                        for="student"
                        >
                        Student
                        </label>
                    </div>
                        <div class="inline-flex items-center">
                        <label
                        class="relative flex cursor-pointer items-center rounded-full p-3"
                        for="teacher"
                        data-ripple-dark="true"
                        >
                        <input
                        id="teacher"
                        name="userType"
                        type="radio"
                        value="teacher"
                        checked={userType === "teacher"}
                        onChange={() => setUserType("teacher")}
                        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                        />
                        <div class="border-neutral-950 pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3.5 w-3.5"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            >
                            <circle  data-name="ellipse" cx="8" cy="8" r="8"></circle>
                            </svg>
                            </div>
                            </label>
                            <label
                            class="block text-orange-950 text-2xl mt-px cursor-pointer select-none font-light"
                            for="teacher"
                            >
                            Professor
                            </label>
                        </div>
                        </div>
                            <button onClick={handleCreateAccount} className=" w-10/12 rounded-3xl bg-[#59361E] py-1 text-2xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent"> Create an account </button>
                        </div>
                     </div>
                </div>
            </div>

    );
};

export default CreateAccount;
