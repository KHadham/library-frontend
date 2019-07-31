import React, { Component } from 'react';
import { connect } from 'react-redux'
import {getKategory} from "../../redux/actions/kategori";
import {postBuku} from "../../redux/actions/book";



class Navbar extends Component {
//bikin sate kosongan 
state = {
  insertBook:[],
  isiKategori: [],
  modal: false,
};

//mengolah data yang sudah di tarik dari action 
  componentDidMount = async () => {

    await this.props.dispatch(getKategory());

    this.setState({
      //tampung di state
      isiKategori: this.props.kategori,
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
      this.state.insertBook.push({
        nama_buku   :this.state.nama_buku,
        lokasi      :this.state.lokasi,
        pengarang   :this.state.pengarang,
        deskripsi   :this.state.deskripsi,
        foto_sampul :this.state.foto_sampul,
        id_kategori :this.state.id_category
      })

      const data = this.state.insertBook
      this.props.dispatch(postBuku(data));
      setTimeout(function(){ if(! alert("data sudah di daftarkan")){window.location.reload();} }, 500);

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
      <div class="modal fade" id="getdebuk">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title">donate book</h6>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <div className="form-group">
              <label className="control-label">
                Nama buku
              </label>
              <input type="text"  className="form-control"   required
                onChange = {(e)=>this.setState({nama_buku:e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="control-label">
                pengarang
              </label>
              <input
                type="text"  className="form-control"   required
                onChange = {(e)=>this.setState({pengarang:e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="control-label">
                kategori buku
              </label>
              <select  onChange = {(e)=>this.setState({id_category:e.target.value})} className="form-control" required>
              <option >--Pilih kategorinya--</option>
              
                {list.map((list, index) =>{
                  return(
                      <option key ={index} value={list.id_category}>{list.nama_kategori}</option>
                      )
                  })}
              </select >
            </div>
            
            <div className="form-group">
              <label className="control-label">
              lokasi
              </label>
              <input
                type="text"  className="form-control"  required
                onChange = {(e)=>this.setState({lokasi:e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="control-label">
              foto sampul
              </label>
              <input
                type="text"  className="form-control"  required
                onChange = {(e)=>this.setState({foto_sampul:e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label className="control-label">
                deskripsi
              </label>
              <input type="text"  className="form-control"   required
                onChange = {(e)=>this.setState({deskripsi:e.target.value})}
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
const mapStateToProps = state => ({ kategori: state.reKategori,postBuku

})

export default connect(mapStateToProps)(Navbar);