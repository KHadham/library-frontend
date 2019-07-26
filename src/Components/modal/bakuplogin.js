import React, { Component } from 'react';
import { connect } from 'react-redux'
//import {postRegist} from "../../redux/actions/weapon";

class Navbar extends Component {

  //mengolah data yang sudah di tarik dari action 
  
  insertList =async ()=>{
  
    const body = {
      fullname:this.state.fullname,
      email:this.state.email,
      password:this.state.password,
    }
    
    //await this.props.dispatch(postRegist(body));

  }
  
  render() {
    return (
      <div id="mydaftar" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">daftarkan dirimu</h4>
            </div>

          <div class="modal-body">
            <form>

              <div class="form-group">
                <label for="exampleInputEmail1">Fullname</label>
                <input type="text" class="form-control" placeholder="Fullname"
                  onChange = {(e)=>this.setState({Fullname:e.target.value})}
                />
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" placeholder="Email"
                  onChange = {(e)=>this.setState({Email:e.target.value})}
                />
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" placeholder="Password"
                  onChange = {(e)=>this.setState({Password:e.target.value})}
                />
              </div>

            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal" onClick={this.insertList} >Daftar</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({ modalPlus: state.events})

export default connect(mapStateToProps)(Navbar);