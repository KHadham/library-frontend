import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import {getBuku} from '../redux/actions/book';
import Modal from '../Components/modal/modalAddBook'

class Weapon extends Component {
  //buat state kosong
  state = {
    isiBukunya: [],
  };

  componentDidMount = async () => {
    await this.props.dispatch(getBuku());
    this.setState({
      isiBukunya: this.props.buku,
    });
  };

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
    
    console.log("cokk",this.props)
    const list_kategori = this.state.isiBukunya;
    console.log('ini dari list bawah ya', list_kategori.ListBuku)
    const arrayBaru = list_kategori.ListBuku || []
    return (
      <div className="container">
        <div className="mt-5">
        <MaterialTable
          title="Data Buku"
          columns={[
            {
              title: 'Avatar',
              field: 'e',
              render: rowData => (
                <Link to={`/books/${rowData.f}`} >
                    <img src={rowData.e} alt="" style={{width:"100px", height:"100px"}}></img>
                </Link>
              ),
            },
            { title: 'No',       field: 'f' },
            { title: 'judul',    field: 'a' },
            { title: 'writer',   field: 'b' },
            { title: 'location', field: 'c' },
            { title: 'desc',     field: 'd' },
            
          ]}
          data= {arrayBaru.map((ress, index) =>{
            return(
              {
                f: ress.id,
                a: ress.nama_buku,
                b: ress.pengarang,
                c: ress.lokasi,
                d: text(ress.deskripsi),
                e:ress.foto_sampul,
              }
            ) 
                }
              )
            
          }       
          
              
          actions={[
            {
              icon: 'add',
              tooltip: 'Add User',
              isFreeAction: true,
              
              //onClick: (event) => alert("You want to add a new row")
            }
          ]}
        />
      
      </div>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#getdebuk">
            Open modal
      </button>
      <Modal/>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    buku: state.buku,
  };
};

export default connect(mapStateToProps)(Weapon);
