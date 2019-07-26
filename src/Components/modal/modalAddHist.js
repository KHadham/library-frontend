import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getBuku} from "../../redux/actions/book";
import {getUser} from "../../redux/actions/user";
import {postHist} from "../../redux/actions/history";



class Navbar extends Component {
//bikin sate kosongan 
state = {
  insertHist:[],
  isiBuku: [],
  isiUser: [],
  modal: false,
};

//mengolah data yang sudah di tarik dari action 
  componentDidMount = async () => {

    await this.props.dispatch(getBuku());
    await this.props.dispatch(getUser());

    this.setState({
      //tampung di state
      isiBuku: this.props.buku,
      isiUser: this.props.user,
    });
  };
  
  toggle = this.toggle.bind(this);
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  render() {
    
    const insertList =async ()=>{
      this.state.insertHist.push({
        id_peminjam:this.state.nama_peminjam,
        id_buku:this.state.idbukunya,
        lama_pinjam:this.state.lama_pinjam

      })
      
      const data = this.state.insertHist
      this.props.dispatch(postHist(data));
      setTimeout(function(){ if(! alert("data sudah di daftarkan")){window.location.reload();} }, 500);

    }

    const list = this.state.isiUser.ListUser || [] ;       //tampung state di variable baru
    const array = this.state.isiBuku.ListBuku || [] ;       //tampung state di variable baru
    console.log('hist',this.state.insertHist)
    
    return (
    <div>
      <form action="http://www.w3schools.com">
      <div class="modal fade" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
          
          <div class="modal-header">
              <h4 class="modal-title">pinjem buku dong</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <div className="form-group">
              <label className="control-label">
                User
              </label>
              <select name="id" onChange = {(e)=>this.setState({nama_peminjam:e.target.value})} className="form-control" required>
              <option >--Pilih pengguna--</option>
              
                {list.map((list, index) =>{
                  return(
                      <option key ={index} value={list.id_user}>{list.fullname}</option>
                  )
              })}
              </select >
            </div>

            
            <div className="form-group">
              <label className="control-label">
                Buku
              </label>
              <select name="id" onChange = {(e)=>this.setState({idbukunya:e.target.value})} className="form-control" required>
              <option >--Pilih Bukumu--</option>
              
                {array.map((list, index) =>{
                  return(
                      <option key ={index} value={list.id}>{list.nama_buku}</option>
                  )
              })}
              </select >
            </div>
            <div className="form-group">
              <label className="control-label">
              lama hari
              </label>
              <input
                type="number"  className="form-control"  required
                onChange = {(e)=>this.setState({lama_pinjam:e.target.value})}
              />
            </div>
            
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal" >Close</button>
              <button type="button" class="btn btn-success" onClick={insertList.bind(this)}>
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
const mapStateToProps = state => ({ buku: state.buku,user: state.user,postHist

})

export default connect(mapStateToProps)(Navbar);