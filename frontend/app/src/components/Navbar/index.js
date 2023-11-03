import React , {useState} from 'react';
import './NavBar.css';
import avatar from '../../images/account button.svg';
import { useLocation} from 'react-router-dom';



const SideNav = (props) => {
    const [state, setState] = useState(false);

    
	const account = () => {
        window.location.href='/AccountStudent';
    }
    

    const timetable = () => {
        window.location.href='/timetable';
    }

    const profaccount = () => {
        window.location.href='/AccountProf';
    }

    const progress= () => {
        window.location.href='/progress';
    }
    

    const logout = () => {
        window.location.href='/home';
    }
    async function profCheck() {
        fetch('http://localhost:8080/api/user')
        .then((response) => response.json())
        .then((data) => {
            console.log(data.username);
            if (data.username == 'teacher') {
                setState(true);
            }})
        .catch((err) => {
            console.log(err.message);
        });
    };

    profCheck();
	const withoutSidebarRoutes = ["/home", "/login", "/create"];
	const {pathname} = useLocation();
	if (withoutSidebarRoutes.some((item) => pathname.includes(item))) return null;
    if (state) {
        return (
            <div className="sidenav flex space-y-16" style={{width: props.width}}>
                <button className="pb-24" onClick={props.closeNav}><img src={avatar} alt="avatar" width="100px"/></button>
                <button onClick={profaccount} className="w-6/12 rounded-3xl bg-[#59361E] p-8 text-2xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent">Account</button>
                <button onClick={logout} className="w-6/12  rounded-3xl bg-[#59361E] p-8 text-2xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent">Logout</button>
    
    
            </div>
        );
    }
	return (
		<div className="sidenav flex space-y-16" style={{width: props.width}}>
			<button className="pb-24" onClick={props.closeNav}><img src={avatar} alt="avatar" width="100px"/></button>
            <button onClick={account} className="w-6/12 rounded-3xl bg-[#59361E] p-8 text-2xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent">Account</button>
            <button onClick={timetable} className="w-6/12  rounded-3xl bg-[#59361E] p-8 text-2xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent">Timetable</button>
			<button onClick={progress} className="w-6/12  rounded-3xl bg-[#59361E] p-8 text-2xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent">Progress Report</button>
			<button onClick={logout} className="w-6/12  rounded-3xl bg-[#59361E] p-8 text-2xl duration-500 hover:bg-gray text-white active:scale-90 disabled:bg-transparent">Logout</button>


		</div>
	);
};

export default SideNav;