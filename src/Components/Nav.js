import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ModalReg from '../Components/modal/modalRegist'
import ModalLog from '../Components/modal/modalLogin'

class Navbar extends Component {
    render() {
			return (
				<React.Fragment>
				<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
					<a className="navbar-brand" >
						<img src="https://pngimage.net/wp-content/uploads/2018/06/logo-pertamina-png-6.png" alt="Logo" style={{width:"120px"}}/>
					</a>

					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to="/history"><a className="nav-link">history</a></Link>
						</li>

						<li className="nav-item">
							<Link to="/buku"><a className="nav-link">buku</a></Link>
						</li>

						<li className="nav-item">
							<Link to="/profile"><a className="nav-link">Ussr</a></Link>
						</li>

						
						
						
					</ul>
              
						{/* style={{ borderLeft: '1px solid  rgb(185, 185, 185)', marginTop: '10px', height: '30px' }} */}
						<div ></div>

						<div style={{ marginLeft: '55%'}} class="float-right">
							<ul class="navbar-nav float-right">
							
								<li className="nav-item " data-toggle="modal" data-target="#mydaftar"><a className="nav-link" >Daftar</a></li>
								
								<li className="nav-item " data-toggle="modal" data-target="#mylogin"><a className="nav-link" > Login</a></li>
								
							</ul>
						</div>
				</nav>

				<ModalLog/>
				<ModalReg/>
				</React.Fragment>
			);
    }
}

export default Navbar;