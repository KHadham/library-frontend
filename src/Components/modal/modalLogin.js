import React, { Component } from 'react';
import { connect } from 'react-redux'
import {postUserIn} from "../../redux/actions/user";

class Navbar extends Component {
  state = {
    users:[],
    email:"",
    password: "",
    modal: false,
  };
  
  //mengolah data yang sudah di tarik dari action 
    // componentDidMount = async () => {
  
    //   await this.props.dispatch(getKategory());
  
    //   this.setState({
    //     //tampung di state
    //     isiKategori: this.props.kategori,
    //   });
    // };

    login = async (data)=>{
      await this.props.dispatch(postUserIn(data));
      this.setState({
        users:this.props.users,
        email:"",
        password:""
      })
      window.location.href = '/users'
    }

    toggle = this.toggle.bind(this);
    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
    
  render() {
    //destructuring
    //const {email,password} = this.state

    let data = {
      email:this.state.email,
      password:this.state.password
    }

    const login = async (data)=>{
      await this.props.dispatch(postUserIn(data));
      this.setState({

        users:this.props.users,
        email:"",
        password:""

      })
      setTimeout(function(){ if(! alert("anda telah login")){window.location.href = '/buku';} }, 500);

      // window.location.href = '/'
      console.log ("data",data)
    }

    //   const data = this.state.insertUser
    //   this.props.dispatch(postUser(data));
    //   setTimeout(function(){ if(! alert("anda telah menfaftar ,silahkan login")){window.location.reload();} }, 500);
    //   //if(!alert('data sudah di daftarkan')){window.location.reload();}
    // }
console.log ("emauil",this.state.email)
console.log ("password",this.state.password)

    return (
      <div id="mylogin" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">login coeg</h4>
      </div>
      <div class="modal-body">
        <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Username</label>
      <input type="text" onChange = {(e)=>this.setState({email:e.target.value})} class="form-control" id="username" placeholder="Username"/>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" onChange = {(e)=>this.setState({password:e.target.value})} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
  </form>
      </div>
      <div class="modal-footer">
       <button type="button" onClick = {()=>login(data)} class="btn btn-success" data-dismiss="modal">Login</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    );
  }
}
const mapStateToProps = state => ({ users: state.reUser.ListUser
})

export default connect(mapStateToProps)(Navbar);