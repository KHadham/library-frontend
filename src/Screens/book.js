import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import {getBuku} from '../redux/actions/book';
import {getKategory} from '../redux/actions/kategori';
import {deleteBuku} from '../redux/actions/book';
import Modal from '../Components/modal/modalAddBook';

class Weapon extends Component {
  //buat state kosong
  state = {
    isiBukunya: [],
    isiKategori:[]
  };

  componentDidMount = async () => {
    await this.props.dispatch(getBuku());
    await this.props.dispatch(getKategory());

    this.setState({
      isiBukunya: this.props.buku,
      isiKategori: this.props.kategori,

    });
  };

  handledetails = async (id) =>{
    //this.props.history.push(`/borrowing/details/${id}`)
    await this.props.dispatch(deleteBuku(id));
    setTimeout(function(){ if(! alert("data telah di hapus")){window.location.reload();} }, 500);
  }

  render() {
    function text(text) {
      if (text.length > 140) {
          let textSplit = text.substr(0, 140)
          return `${textSplit} ...`
      } else {
          let textSplit = text
          return `${textSplit}`
      }
  }
  //const list = this.state.isiKategori.ListKategori || [] ; 
    console.log("cokk",this.props)
    const list_kategori = this.state.isiBukunya;
    console.log('ini dari list bawah ya', list_kategori.ListBuku)
    const arrayBaru = list_kategori.ListBuku || []
    return (
      <React.Fragment>
      <div className="container">
        <div className="mt-3">
        <MaterialTable
          title="Data Buku"
          columns={[
            {
              title: 'Avatar',
              field: 'e',
              render: rowData => (
                // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                //   Open modal
                // </button>
                <Link to={`/buku/${rowData.f}`} >
                    <img src={rowData.e} alt="" style={{width:"100px", height:"100px"}}></img>
                </Link>
              ),
            },
            {
              title: 'Avatar',
              field: 'e',
              render: rowData => (

                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#wikwik">
                  {rowData.g}
                </button>
                
                // <Link to={`/buku/${rowData.f}`} >
                //     <img src={rowData.e} alt="" style={{width:"100px", height:"100px"}}></img>
                // </Link>
              ),
            },
            { title: 'judul',    field: 'a' },
            { title: 'writer',   field: 'b' },
            { title: 'location', field: 'c' },
            { title: 'desc',     field: 'd' },
            
          ]}
          data= {arrayBaru.map((ress, index) =>{
            return(
              {
                f: ress.id_library,
                a: ress.nama_buku,
                b: ress.pengarang,
                c: ress.lokasi,
                d: text(ress.deskripsi),
                e:ress.foto_sampul,
                g:ress.status_pinjam,
              }
            ) 
                }
              )
            
          }       
          
              
          actions={ [
            { 
              className: 'btn btn-danger btn-sm',
              icon: 'edit',
              tooltip: 'edit',
              datatoggle:"modal" ,
              datatarget:"#wikwik",
              
            },
            rowData => ({
            icon: 'event_note',
            tooltip: 'pinjam Buku',
            onClick: (event, rowData) => alert("You want to delete " + rowData.a),
            disabled: rowData.g !== "tersedia"
          }),
            {   
              className: 'btn btn-danger btn-sm',
              icon: 'delete',
              tooltip: 'Detail Peminjaman',
              onClick: (event, rowData) =>this.handledetails(rowData.f)
            }
          ]}  
        />
      </div>
      <div>
      <form action="http://www.w3schools.com">
      <div class="modal fade" id="wikwik">
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
            
            {/* <div className="form-group">
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
            </div> */}
            
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
              {/* <button type="button" class="btn btn-success"   onClick={insertList.bind(this)}>
                Simpan
              </button> */}
            </div>

          </div>
        </div>
      </div> 
      </form>
      </div>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#getdebuk">
            Open modal
      </button>
      <Modal/>
      </div>
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => {
  return {
    buku: state.reBuku,
  };
};

export default connect(mapStateToProps)(Weapon);
