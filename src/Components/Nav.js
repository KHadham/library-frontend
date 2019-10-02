/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ModalReg from '../Components/modal/modalRegist'
import ModalLog from '../Components/modal/modalLogin'
import { logoutUser } from '../redux/actions/user';
import { connect } from 'react-redux'

const dataStorage = JSON.parse(localStorage.getItem("data")) || ""

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			bookS: [],
			isiUser: [],
			insertHist: [],


		};
	}
	handledetails = async (id) => {
		//this.props.history.push(`/borrowing/details/${id}`)
		await this.props.dispatch(logoutUser(id));
		setTimeout(function () { if (!alert("anda telah logout")) { window.location.href = '/buku'; } }, 500);
		//setTimeout(function(){ if(! alert("anda telah logout")){window.location.reload();} }, 500);
	}
	render() {
		return (
			<React.Fragment>
				<nav style={{ backgroundColor: "#e3f2fd" }} border className="navbar sticky-top navbar-expand-sm navbar-light border">
					<a className="navbar-brand">
						<img src="https://cdn.pixabay.com/photo/2013/07/12/19/19/multimedia-154540_960_720.png" alt="Logo" style={{ width: "50px" }} />  Perpustakaan
					</a>

					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">

						<li className="nav-item">
							<Link to="/buku"><a className="nav-link">buku</a></Link>
						</li>

						{dataStorage.status && dataStorage.status === "admin" ?
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
					{/* {dataStorage.token && dataStorage.token !== "" ?
						<div class="border form-inline my-2 my-lg-0">
							<button data-toggle="modal" data-target="#mydaftar" class="border btn btn-outline-primary mr-sm-2 my-2 my-sm-0" type="submit">daftar</button>
							<button data-toggle="modal" data-target="#mylogin" class="border btn btn-outline-primary my-2 my-sm-0" type="submit">login</button>
						</div> :
						<div class="border form-inline my-2 my-lg-0">
							<button onClick={() => this.handledetails(dataStorage.id_user)} class="border btn btn-outline-primary mr-sm-2 my-2 my-sm-0" type="submit">log out</button>
							<Link to="/profile">
								<button  class="border btn btn-outline-primary my-2 my-sm-0" type="submit">profile</button>
							</Link>
						</div>
					} */}
					<ul class="navbar-nav float-right">

								{dataStorage.token && dataStorage.token !== "" ?
									<React.Fragment>
										<li className="nav-item" onClick={() => this.handledetails(dataStorage.id_user)} ><a className="nav-link" > log-out</a></li>
										<li className="nav-item">
											<Link to="/profile"><a className="nav-link">profile</a></Link>
										</li>
									</React.Fragment>
									:
									<React.Fragment>
										<li className="nav-item " data-toggle="modal" data-target="#mydaftar"><a className="nav-link" >Daftar</a></li>
										<li className="nav-item " data-toggle="modal" data-target="#mylogin"><a className="nav-link" > login</a></li>
									</React.Fragment>
								}
							</ul>
				</nav>

				<ModalLog />
				<ModalReg />
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