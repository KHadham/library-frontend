import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBuku1, deleteBuku, updateBuku } from '../redux/actions/book'
import Modal from '../Components/modal/modalAddHist'

import '../../src/index.css'

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            books: [],
            updates: [],
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
      
        await this.props.dispatch(getBuku1(this.props.match.params.id))
        this.setState({
            books:  this.props.book
        })
    } 
    


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    render() {
        //const { books } = this.state
        const list = this.state.books.ListBuku
        console.log("isi", this.state.books.ListBuku)
        return (
          
            <div style={{ backgroundColor: '#f2f2f2', marginBottom: '3em' }}>
           
                <section>
                    <img className="cover"  src={list ? list.foto_sampul : ''} alt=".." />
                    <img className="imgThum" src={list ? list.foto_sampul : ''} alt=".." />
                </section>
                <section>
                    <div className="textDetail container" style={{ backgroundColor: '#f2f2f2', marginTop: '20px' }}>
                        <h1 className="font" >{list ? list.book_name : ''}</h1>
                        <h3>{list ? list.pengarang : ''}</h3>
                        <ul className="tambahandetail">
                            <li><h5 className="category">{list ? list.nama_kategori : ''}</h5></li>
                            <li><h5 className="location">{list ? list.lokasi : ''}</h5></li>
                         
                            <li><h5 className="status">{list ? list.status_pinjam : ''}</h5></li>
                        </ul>
                        <p className="textDesc" >{list ? list.deskripsi : ''}</p>

                    </div>
                </section>
            {/* <Modal/> */}
            <div>
      <form action="http://www.w3schools.com">
      <div class="modal fade" id="uppp">
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
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        book: state.buku,
        upadate: state.update,
        deleteBook:state.buku
    };
};

export default connect(mapStateToProps)(Detail);