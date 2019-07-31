import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getKategory} from "../redux/actions/kategori"
import { getBuku1,  updateBuku } from '../redux/actions/book'
import '../../src/index.css'

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            books: [],
						updates: [],
						isiKategori:[]
						
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
				await this.props.dispatch(getBuku1(this.props.match.params.idd))
				await this.props.dispatch(getKategory());

        this.setState({
						books:  this.props.book,
						isiKategori: this.props.kategori

        })
    	} 
    
  	toggle = this.toggle.bind(this);

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
			const ktg = this.state.isiKategori.ListKategori || [] ;    
			const editList = async ()=>{
				this.state.insertUser.push({
					email:this.state.email,
					password:this.state.password,
					telepon:this.state.telepon,
					background:this.state.background,
					fullname:this.state.fullname,
					alamat:this.state.alamat,
				})
	
				const data = this.state.insertUser
				this.props.dispatch(updateBuku(data));
				setTimeout(function(){ if(! alert("anda telah menfaftar ,silahkan login")){window.location.reload();} }, 500);
			}
        //const { books } = this.state
        const list = this.state.books.ListBuku || []
        console.log("isi", this.props.book.ListBuku)
        return (
          <div>
{/*------------ detail start ----------------*/}
            <div style={{ backgroundColor: '#f2f2f2', marginBottom: '3em' }}>
							<section>
								<img className="cover"  src={ list.foto_sampul } alt=".." />
								<img className="imgThum" src={ list.foto_sampul } alt=".." />
							</section>
							<section>
								<div className="textDetail container" style={{ backgroundColor: '#f2f2f2', marginTop: '20px' }}>
									<h1 className="font" >{ list.book_name }</h1>
									<h3>{ list.pengarang }</h3>
									<ul className="tambahandetail">
										<li><h5 className="category">{ list.nama_kategori }</h5></li>
										<li><h5 className="location">{ list.lokasi }</h5></li>
										<li><h5 className="status">{ list.status_pinjam }</h5></li>
										<li  data-toggle="modal" data-target="#edit" className="button"><input type="submit" class="btn btn-info" value="edit"/></li>
									</ul>
									<p className="textDesc" >{ list.deskripsi }</p>
								</div>
							</section>
						</div> 
{/*------------ end detail ----------------*/}

{/*------------ modal start ----------------*/}
						<form action="http://www.w3schools.com">
						<div class="modal fade" id="edit">
							<div class="modal-dialog">
								<div class="modal-content">
								
									<div class="modal-header">
										<h6 class="modal-title">edits book</h6>
										<button type="button" class="close" data-dismiss="modal">&times;</button>
									</div>

									<div class="modal-body">
									<div className="form-group">
										<label className="control-label">
											Nama buku
										</label>
										<input type="text" value={this.props.book.ListBuku.nama_buku} className="form-control" required
											onChange = {(e)=>this.setState({nama_buku:e.target.value})}
										/>
									</div>
									<div className="form-group">
										<label className="control-label">
											pengarang
										</label>
										<input
											type="text" value={this.props.book.ListBuku.pengarang} className="form-control"   required
											onChange = {(e)=>this.setState({pengarang:e.target.value})}
										/>
									</div>
									
									<div className="form-group">
										<label className="control-label">
											kategori buku
										</label>
										<select value={this.props.book.ListBuku.id_kategori} onChange = {(e)=>this.setState({id_category:e.target.value})} className="form-control" required>
										<option >--Pilih kategorinya--</option>
											{ktg.map((ktg, index) =>{
												return(
														<option key ={index} value={ktg.id_category}>{ktg.nama_kategori}</option>
														)
												})}
										</select >
									</div>
									
									<div className="form-group">
										<label className="control-label">
										lokasi
										</label>
										<input
											type="text" value={this.props.book.ListBuku.lokasi} className="form-control"  required
											onChange = {(e)=>this.setState({lokasi:e.target.value})}
										/>
									</div>
									
									<div className="form-group">
										<label className="control-label">
										foto sampul
										</label>
										<input
											type="text" value={this.props.book.ListBuku.foto_sampul} className="form-control"  required
											onChange = {(e)=>this.setState({foto_sampul:e.target.value})}
										/>
									</div>
									
									<div className="form-group">
										<label className="control-label">
											deskripsi
										</label>
										<input type="text" value={this.props.book.ListBuku.deskripsi} className="form-control"   required
											onChange = {(e)=>this.setState({deskripsi:e.target.value})}
										/>
									</div>
									</div>

									<div class="modal-footer">
										<button type="button" class="btn btn-danger" data-dismiss="modal" >Close</button>
										<button type="button" class="btn btn-success"   onClick={editList.bind(this)}>
											Simpan
										</button>
									</div>

								</div>
							</div>
						</div> 
						</form>
{/*------------ end modal ----------------*/}
					</div>
					)
    }
}

const mapStateToProps = state => {
    return {
        book: state.reBuku,
        upadate: state.update,
				deleteBook:state.buku,
				kategori: state.reKategori
    };
};

export default connect(mapStateToProps)(Detail);