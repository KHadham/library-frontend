import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBuku1 } from '../redux/actions/book'
import { deleteBuku } from '../redux/actions/book'
// import {getUser} from "../redux/actions/user";
import {postHist} from "../redux/actions/history";
import '../../src/index.css'
const dataStorage = JSON.parse(localStorage.getItem("data")) || ""

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
						bookS: [],
						isiUser: [],
						insertHist:[],

					
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
			const ID = this.props.match.params.idd

				await this.props.dispatch(getBuku1(ID))
				// await this.props.dispatch(getUser());

        this.setState({
						bookS:  			this.props.book,
						isiUser: this.props.user,
					})
				} 
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    
    handledetails = async (id) =>{
      //this.props.history.push(`/borrowing/details/${id}`)
      await this.props.dispatch(deleteBuku(id));
      setTimeout(function(){ if(! alert("data telah di hapus")){window.location.href='/buku';} }, 500);
    }

    render() {
			const insertList =async ()=>{
				this.state.insertHist.push({
					id_peminjam:dataStorage.id_user,
					id_buku:list.id_library,
					lama_pinjam:this.state.lama_pinjam
	
				})
				
				const data = this.state.insertHist
				this.props.dispatch(postHist(data));
			  setTimeout(function(){ if(! alert("selamat membaca")){window.location.reload();} }, 200);
			}

				const list = this.state.bookS.ListBuku || []
				const user = this.state.isiUser.ListUser || []

        console.log("issssi usser", this.state.isiUser.ListUser)
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
									<h1 className="font" >{ list.nama_buku }</h1>
									<h5>{ list.pengarang }</h5>
									<ul className="tambahandetail">
										<li><h5 className="category">{ list.nama_kategori }</h5></li>
										<li><h5 className="location">{ list.lokasi }</h5></li>
                    { dataStorage.status == "admin" ? 
                    <li  className="button"><input type="submit" onClick={() =>this.handledetails(this.props.match.params.idd)} class="btn btn-danger" value="hapus"/></li>
                    :<li  className="button"><input type="submit" disabled onClick={() =>this.handledetails(this.props.match.params.idd)}  value="hapus"/></li>

                    }
                    { list.status_pinjam == "tersedia" && dataStorage.status == "admin" || dataStorage.status == "member"  ? 
                      <li  data-toggle="modal" data-target="#Pinjam" className="button"><input type="submit" class="btn btn-warning" value="PINJAM"/></li>
                      : 
                      <li  data-toggle="modal" data-target="#Pinjam" className="button"><input type="submit" disabled class="btn btn-warning" value="PINJAM"/></li>
                    }
                    { dataStorage.status == "admin" || "" ?
										  <li  data-toggle="modal" data-target="#Memedit" className="button"><input type="submit" class="btn btn-success" value="edit"/></li>
                      : ""
                    }
									</ul>
									<p className="textDesc" >{ list.deskripsi }</p>
								</div>
							</section>
						</div> 
{/*------------ end detail ----------------*/}
{/*------------ START MODAL ----------------*/}

<form action="http://www.w3schools.com">
      <div class="modal fade" id="Pinjam">
        <div class="modal-dialog">
          <div class="modal-content">
          
          <div class="modal-header">
              <h4 class="modal-title">pinjem buku dong</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
						<div className="form-group">
              <label className="control-label">
                Buku
              </label>
              <select disabled name="id" value={list.id_library} onChange = {(e)=>this.setState({idbukunya:e.target.value})} className="form-control" required>
								<option >--Pilih Bukumu--</option>
								<option  value={list.id_library}>{list.nama_buku}</option>
              </select >
            </div>

            <div className="form-group">
              <label className="control-label">
                user
              </label>
              <select disabled name="id" value={dataStorage.id_user} onChange = {(e)=>this.setState({idbukunya:e.target.value})} className="form-control" required>
								<option >--Pilih Bukumu--</option>
								<option  value={dataStorage.id_user}>{dataStorage.fullname}</option>
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
					)
    		}
}

const mapStateToProps = state => {
    return {
        book: state.reBuku,
				kategori: state.reKategori,user: state.reUser,postHist
    };
};

export default connect(mapStateToProps)(Detail);