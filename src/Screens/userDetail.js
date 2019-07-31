import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser1,updateUser} from '../redux/actions/user'
import { getHist1} from '../redux/actions/history'
import MaterialTable from 'material-table'
import moment from "moment";
import '../../src/index.css'

class UsD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            useerStet: [],
            historiia: [],
            upload:[],
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
      const ID = this.props.match.params.iduser
      
        await this.props.dispatch(getUser1(ID))
        await this.props.dispatch(getHist1(ID))

        this.setState({
            useerStet:  this.props.usserProp,
            historiia:  this.props.historih
        })
    } 
    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    changeHandle = (e) => {
      const name = e.currentTarget.name
      const val = e.currentTarget.value
      
      this.state.useerStet.ListUser[name] = val
      this.setState({ useerStet: this.state.useerStet })
    }

    render() {
      const editList = async ()=>{

				this.state.upload.push({
					email:stetEdit.email,
					password:stetEdit.password,
					telepon:stetEdit.telepon,
					background:stetEdit.background,
					fullname:stetEdit.fullname,
					alamat:stetEdit.alamat,
        })

        await this.props.dispatch(updateUser(
        this.props.match.params.iduser,(this.state.upload[0]) ))
          //reload setelah 500 mili detil setelah submit 
        setTimeout(function(){ if(! alert("data user telah di update")){window.location.reload();} }, 500);
      }
        const arrayBaru = this.state.historiia.ListHistory
        const stetEdit = this.state.useerStet.ListUser || []
        return (
          <div >
            <div>
              <table style={{ marginLeft: '30px', marginTop: '1em' }}>
                <tr>
                  <th style={{ paddingRight: '40px' }}> Name</th>
                  <th>:  {stetEdit.fullname}</th>
                </tr>
                <tr>
                  <th>No Telpon</th>
                  <th>:  {stetEdit.telepon}</th>
                </tr>
                <tr>
                  <th>Email</th>
                  <th>:  {stetEdit.email}</th>
                </tr>
                <tr>
                  <th>Status</th>
                  <th>:  {stetEdit.status}</th>
                </tr>
                <tr>
                  <th>alamat</th>
                  <th>:  {stetEdit.alamat}</th>
                </tr>
                <tr>
                  <th>background</th>
                  <th>:  {stetEdit.background}</th>
                </tr>
                <tr>
                  <th>
                  <a data-toggle="modal" data-target="#editUser" className="button"><input type="submit" class="btn btn-info" value="edit"/></a>
                  </th>
                </tr>
              </table>
            </div>
{/* //////////// TABLE START ////////////  */}
              <div className="container">
                <div className="mt-5">
                <MaterialTable
                  title="Data ussr"
                  columns={[
                    { title: 'nama buku',    field: 'a' },
                    { title: 'lama pinjam',   field: 'b' },
                    { title: 'tanggal pinjam', field: 'c' },
                    { title: 'tanggal kembali',     field: 'd' },
                  ]}
                  
                  data= {arrayBaru && arrayBaru.length > 0 && arrayBaru.map((ress, index) =>{
                    return(
                      {
                        f: ress.id_user,
                        a: ress.nama_buku == null ? "anda" :ress.nama_buku,
                        b: ress.lama_pinjam == null ? "belum" :ress.lama_pinjam ,
                        c: moment(ress.tanggal_pinjam).format("dddd,DD-MM-YYYY") === "Invalid date" ?
                          <p>pernah</p> 
                          : moment(ress.tanggal_pinjam).format("dddd,DD-MM-YYYY"),
                        d: moment(ress.tanggal_kembali).format("dddd,DD-MM-YYYY") === "Invalid date" ?
                          <p style={{color:"red"}}>buku belum kembali</p> 
                          : moment(ress.tanggal_kembali).format("dddd,DD-MM-YYYY"),
                            }
                          ) 
                        }
                      )
                    }       
                    actions={ [
                      rowData => ({
                        icon: 'reply',
                        tooltip: 'Kembalikan Buku',
                        onClick: (event, rowData) => alert("You want to delete " + rowData.a),
                        disabled: rowData.d !== "Invalid date"
                      }),
                    ]} 
                />
              </div>
            </div>
{/* //////////// TABLE END ////////////  */}
            
{/*------------ modal start ----------------*/}
						<form action="http://www.w3schools.com">
						<div class="modal fade" id="editUser">
							<div class="modal-dialog">
								<div class="modal-content">
								
									<div class="modal-header">
										<h6 class="modal-title">edits book</h6>
										<button type="button" class="close" data-dismiss="modal">&times;</button>
									</div>

									<div class="modal-body">
                    <div className="form-group">
                      <label className="control-label">
                        Nama 
                      </label>
                      <input type="text" name="fullname" value={stetEdit.fullname} className="form-control" required
                        onChange = {this.changeHandle}/>
                    </div>
                    
                    <div className="form-group">
                      <label className="control-label">
                      telepon
                      </label>
                      <input
                        type="text" name="telepon" value={stetEdit.telepon} className="form-control"   required
                        onChange = {this.changeHandle}/>
                    </div>

                    <div className="form-group">
                      <label className="control-label">
                      email
                      </label>
                      <input
                        type="text" name="email" value={stetEdit.email} className="form-control"  required
                        onChange = {this.changeHandle}/>
                    </div>
                    
                    <div className="form-group">
                      <label className="control-label">
                        alamat
                      </label>
                      <input type="text" name="alamat" value={stetEdit.alamat} className="form-control"   required
                        onChange = {this.changeHandle}/>
                    </div>

                    <div className="form-group">
                      <label className="control-label">
                        background
                      </label>
                      <input type="text" name="background" value={stetEdit.background} className="form-control" required
                        onChange = {this.changeHandle}/>
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
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        usserProp: state.reUser,
        historih: state.reHistory,
    };
};

export default connect(mapStateToProps)(UsD);