import React, {Component} from 'react';
import {connect} from 'react-redux';
// import Posts from '../Components/posts';
// import Pagination from '../Components/Pagination';
import { Link } from 'react-router-dom'
import {getBuku} from '../redux/actions/book';
import {getKategory} from '../redux/actions/kategori';
import {deleteBuku} from '../redux/actions/book';
import Modal from '../Components/modal/modalAddBook';

function text(text) {
  if (text.length > 140) {
      let textSplit = text.substr(0, 140)
      return `${textSplit} ...`
  } else {
      let textSplit = text
      return `${textSplit}`
  }
}
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
    //console.log("cokk",text())
    const list_kategori = this.state.isiBukunya;
    console.log('ini dari list bawah ya', list_kategori.ListBuku)
    const arrayBaru = list_kategori.ListBuku || []
    return (
      <React.Fragment>
      <div className="container">
      <button style={{ marginTop: '20px' }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#getdebuk">tambah</button>
      
      <div className="container" >
        {
          <div style={{ float: 'right' }}>
            {/* <Input placeholder="Search Books Here..." className="searcHome" onChange={(e) => this.searchBook({ search: e.target.value })} /> */}
            <div style={{ float: 'right', marginTop: '-95px' }}>
            </div>
            <div className="Col md-12 layoutStyle" style={{ marginTop: '50px' }} >
              {
                arrayBaru &&
                arrayBaru.length > 0 &&
                arrayBaru.map((entry, index) => {
                  return (
                    <div key={index} className="Col md-8 boxs">
                      <Link to={`buku/${entry.id_library}`}>
                        <div>
                        {entry.status_pinjam == "tersedia" ? 
                          <p className="statusAda" >{entry.status_pinjam}</p> : 
                          <p className="statusView">{entry.status_pinjam}</p>
                          }
                            {/* <p className="statusView">{entry.status_pinjam}</p> */}
                            <img className="adjuctimgs" src={entry.foto_sampul} alt="..." />
                            <p className="catView">[ {entry.nama_kategori}]</p>
                            <p className="textViews">{entry.nama_buku}</p>
                        </div>
                      </Link>
                      <button type="button" class="btn btn-danger btn-sm"  onClick={(event, rowData) =>this.handledetails(entry.id_library)}> hapus </button>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
      </div>
     
      <Modal/>
     
      </div>
      <div class="center">
        <div class="pagination">
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a href="#" >2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
        </div>
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
