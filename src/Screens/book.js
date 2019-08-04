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
  //   function text(text) {
  //     if (text.length > 140) {
  //         let textSplit = text.substr(0, 140)
  //         return `${textSplit} ...`
  //     } else {
  //         let textSplit = text
  //         return `${textSplit}`
  //     }
  // }
  //const list = this.state.isiKategori.ListKategori || [] ; 
    console.log("cokk",this.props)
    const list_kategori = this.state.isiBukunya;
    console.log('ini dari list bawah ya', list_kategori.ListBuku)
    const arrayBaru = list_kategori.ListBuku || []
    return (
      <React.Fragment>
      <div className="container">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#getdebuk">
tambah                </button>
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
                rowData.g === "tersedia" ?
                  (<button type="button" class="btn btn-success" data-toggle="modal" data-target="#wikwik">
                    <h6>{rowData.g}</h6>
                  </button>) :
                  (<button type="button" class="btn btn-secondary btn-sm" disabled data-toggle="modal" data-target="#wikwik">
                     <h6>{rowData.g}</h6>
                  </button>)
                // 
                
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
                      // d: text(ress.deskripsi),
                      d: ress.deskripsi,
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
              datatarget:"apdet",
              
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
              tooltip: 'Delete',
              onClick: (event, rowData) =>this.handledetails(rowData.f)
            }
          ]}  
        />
      </div>
      <div>
      </div>
     
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
