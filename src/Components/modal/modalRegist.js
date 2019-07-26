import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getKategory} from "../../redux/actions/kategori";
import {postUser} from "../../redux/actions/user";


class Navbar extends Component {
//bikin sate kosongan 
state = {
  insertUser:[],
  isiKategori: [],
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
  
  toggle = this.toggle.bind(this);
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  render() {
    
    const insertList =async ()=>{
      this.state.insertUser.push({
        email:this.state.email,
        password:this.state.password,
        telepon:this.state.telepon,
        background:this.state.background,
        fullname:this.state.fullname,
        alamat:this.state.alamat,
      })

      const data = this.state.insertUser
      this.props.dispatch(postUser(data));
      setTimeout(function(){ if(! alert("data sudah di daftarkan")){window.location.reload();} }, 500);
      //if(!alert('data sudah di daftarkan')){window.location.reload();}
    }

    const list = this.state.isiKategori.ListKategori || [] ;       //tampung state di variable baru
    console.log('buk',list)
    
    // let array = []
    // if (list.length>0 ){
    //   array = list.kategori
    //   console.log("aray",array)
    // }
    return (
    <div>
      <form action="http://www.w3schools.com">
      <div class="modal fade" id="mydaftar">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title">Register</h6>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <div className="form-group">
                <label className="control-label">
                  email
                </label>
                <input type="text"  className="form-control"   required
                  onChange = {(e)=>this.setState({email:e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="control-label">
                  password
                </label>
                <input
                  type="text"  className="form-control"   required
                  onChange = {(e)=>this.setState({password:e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="control-label">
                telepon
                </label>
                <input
                  type="text"  className="form-control"  required
                  onChange = {(e)=>this.setState({telepon:e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="control-label">
                background
                </label>
                <input
                  type="text"  className="form-control"  required
                  onChange = {(e)=>this.setState({background:e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="control-label">
                  fullname
                </label>
                <input type="text"  className="form-control"   required
                  onChange = {(e)=>this.setState({fullname:e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="control-label">
                  alamat
                </label>
                <input type="text"  className="form-control"   required
                  onChange = {(e)=>this.setState({alamat:e.target.value})}
                />
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal" >Close</button>
              <button type="button" class="btn btn-success"   onClick={insertList.bind(this)}>
                Simpan
              </button>
            </div>

          </div>
        </div>
      </div> 
      </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({ kategori: state.kategori,postUser

})

export default connect(mapStateToProps)(Navbar);