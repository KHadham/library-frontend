import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ModalReg from '../Components/modal/modalRegist'
import ModalLog from '../Components/modal/modalLogin'
import {logoutUser} from '../redux/actions/user';
import { connect } from 'react-redux'

const dataStorage = JSON.parse(localStorage.getItem("data")) || ""  

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
				modal: false,
				bookS: [],
				isiUser: [],
				insertHist:[],

			
		};
}
	handledetails = async (id) =>{
		//this.props.history.push(`/borrowing/details/${id}`)
		await this.props.dispatch(logoutUser(id));
		setTimeout(function(){ if(! alert("anda telah logout")){window.location.href='/buku';} }, 500);
		//setTimeout(function(){ if(! alert("anda telah logout")){window.location.reload();} }, 500);
	}
    render() {
			return (
				<React.Fragment>
				<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
					<a className="navbar-brand" >
						<img src="https://pngimage.net/wp-content/uploads/2018/06/logo-pertamina-png-6.png" alt="Logo" style={{width:"120px"}}/>
					</a>
					<ul className="navbar-nav">
						

						<li className="nav-item">
							<Link to="/buku"><a className="nav-link">buku</a></Link>
						</li>

					{dataStorage.status && dataStorage.status === "admin"  ?
						<React.Fragment>
							<li className="nav-item">
								<Link to="/history"><a className="nav-link">history</a></Link>
							</li>
							<li className="nav-item">
								<Link to="/users"><a className="nav-link">User</a></Link>
							</li>
						</React.Fragment>
						 :
					""
					}
					</ul>
						<div ></div>
						<div style={{ marginLeft: '55%'}} class="float-right">
							<ul class="navbar-nav float-right">
							
								{dataStorage.token && dataStorage.token !== "" ?
									<React.Fragment>
										<li className="nav-item"  onClick={() =>this.handledetails(dataStorage.id_user)} ><a className="nav-link" > LOGOUT</a></li>
										<li className="nav-item">
											<Link to="/profile"><a className="nav-link">{dataStorage.fullname}</a></Link>
										</li>
									</React.Fragment>
										 :
										 <React.Fragment>
										  <li className="nav-item " data-toggle="modal" data-target="#mydaftar"><a className="nav-link" >Daftar</a></li>
											<li className="nav-item " data-toggle="modal" data-target="#mylogin"><a className="nav-link" > login</a></li>
											</React.Fragment>
								}
							</ul>
						</div>
				</nav>

				<ModalLog/>
				<ModalReg/>
				</React.Fragment>
			);
    }
}


const mapStateToProps = state => {
	return {
			book: state.reBuku,
	};
};

export default connect(mapStateToProps)(Navbar);