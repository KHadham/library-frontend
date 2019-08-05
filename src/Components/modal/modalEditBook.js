import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getKategory} from "../../redux/actions/kategori"
import { getBuku1,  updateBuku } from '../../redux/actions/book'

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            bookS: [],
						updateS: [],
						isiKategori:[]
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
			const ID = this.props.match.params.idd

				await this.props.dispatch(getBuku1(ID))
				await this.props.dispatch(getKategory());

        this.setState({
						bookS:  			this.props.book,
						isiKategori: 	this.props.kategori
        })
    	} 
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
		}
		
		changeHandle = (e) => { //MENERIMA PERUBAHAN PADA FORM
      const name = e.currentTarget.name
      const val = e.currentTarget.value

      this.state.bookS.ListBuku[name] = val //NIMPA STATE DENGAN DATA YANG BARU "val"
      this.setState({ bookS: this.state.bookS }) //TERUS DI SET STATE NYA
		}
		
    render() {
			const editList = async ()=>{
				this.state.updateS.push({
					nama_buku:list.nama_buku,
					pengarang:list.pengarang,
					deskripsi:list.deskripsi,
					lokasi:list.lokasi,
					foto_sampul:list.foto_sampul,
					id_kategori:list.id_kategori,
				})
	
				const ID = this.props.match.params.idd
        //PROSES UPLOAD NYA 
        await this.props.dispatch(updateBuku(ID,(this.state.updateS[0]) ))
          
        //reload setelah 500 mili detil setelah submit 
        setTimeout(function(){ if(! alert("data buku telah di update")){window.location.reload();} }, 500);
			}
				const ktg = this.state.isiKategori.ListKategori || [] 
        const list = this.state.bookS.ListBuku || []
        console.log("isi", list)
        return (
          <div>
{/*------------ modal start ----------------*/}
						<form action="http://www.w3schools.com">
						<div class="modal fade" id="Memedit">
							<div class="modal-dialog">
								<div class="modal-content">
								
									<div class="modal-header">
										<h6 class="modal-title">editsssss book</h6>
										<button type="button" class="close" data-dismiss="modal">&times;</button>
									</div>

									<div class="modal-body">
									<div className="form-group">
										<label className="control-label">
											Nama buku
										</label>
										<input type="text" name="nama_buku" value={list.nama_buku} className="form-control" required
											onChange =  {this.changeHandle}
										/>
									</div>
									<div className="form-group">
										<label className="control-label">
											pengarang
										</label>
										<input
											type="text" name="pengarang" value={list.pengarang} className="form-control"   required
											onChange =  {this.changeHandle}
										/>
									</div>
									
									<div className="form-group">
										<label className="control-label">
											kategori buku
										</label>
										<select name="id_kategori" value={list.id_kategori} onChange =  {this.changeHandle} className="form-control" required>
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
											type="text" name="lokasi" value={list.lokasi} className="form-control"  required
											onChange =  {this.changeHandle}
										/>
									</div>
									
									<div className="form-group">
										<label className="control-label">
										foto sampul
										</label>
										<input
											type="file" name="foto_sampul"  className="form-control"  required
											onChange =  {this.changeHandle}
										/>
									</div>
									
									<div className="form-group">
										<label className="control-label">
											deskripsi
										</label>
										<input type="text" value={list.deskripsi} className="form-control" name="deskripsi" required
											onChange =  {this.changeHandle}
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
				kategori: state.reKategori
    };
};

export default connect(mapStateToProps)(Detail);