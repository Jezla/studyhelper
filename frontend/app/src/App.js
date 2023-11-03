import React , {useState} from 'react';
import './App.css';
import SideNav from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate }
	from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import Landing from './pages/landing';
import avatar from './images/account button.svg';
import Login from './pages/login';
import Query from './pages/query';
import Notes from './pages/notes';
import ProfResources from './pages/prof_resources';
import Resources from './pages/student_resources';
import Quiz from './pages/quiz';
import CreateAccount from './pages/CreateAccount';
import AccountProf from './pages/AccountProf';
import AccountStudent from './pages/AccountStudent';
import Prof from './pages/prof';
import Progress from './pages/progress';
import Feedback from './pages/feedback';
import Timetable from './pages/timetable';
import ErrorLogin from './pages/ErrorLogin';
import ErrorCreate from './pages/ErrorCreate';

function App(props, state) {
	const [wid, setWid] = useState("0%");

	const openSidenav = ( ) => {
		setWid("25%")
	}
	const closeNav = ( ) => {
		setWid("0%")
	}

	return (

		<Router>
			<button className="absolute pl-10 pt-10" onClick={openSidenav}><img src={avatar} alt="avatar" width="100px"/></button>
			<SideNav width={wid} closeNav={closeNav}/>

			<Routes>
				<Route exact path='/' element={<Navigate to="/home" replace={true} />} />
				<Route path='/home' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/blogs' element={<Blogs />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/landing' element={<Landing />} />
				<Route path='/login' element={<Login />} />
				<Route path='/query' element={<Query />} />
				<Route path='/notes' element={<Notes />} />
				<Route path='/prof_resources' element={<ProfResources />} />
				<Route path='/resources' element={<Resources />} />
				<Route path='/quiz' element={<Quiz />} />
				<Route path='/create' element={<CreateAccount />} />
				<Route path='/AccountStudent' element={<AccountStudent />} />\
				<Route path='/AccountProf' element={<AccountProf />} />
				<Route path='/prof' element={<Prof />} />
				<Route path='/progress' element={<Progress />} />
				<Route path='/feedback' element={<Feedback />} />
				<Route path='/timetable' element={<Timetable />} />
				<Route path='/ErrorLogin' element={<ErrorLogin />} />
				<Route path='/ErrorCreate' element={<ErrorCreate />} />

			</Routes>
		</Router>
	);
}

export default App;
