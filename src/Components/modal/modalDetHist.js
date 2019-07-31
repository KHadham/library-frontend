import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser1,updateUser} from '../../redux/actions/user'


class UsD extends Component {

    constructor(props) {
        super(props);
        this.state = {    //BUAT STATE DULU BUAT PENAMPUNGAN NANTI
            modal: false,
            useerStet: [],
            upload:[],
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {  // LOAD DATANYA DULU DI SINI
      const ID = this.props.match.isExact.iduser
     
        await this.props.dispatch(getUser1(ID))

        this.setState({
          useerStet:  this.props.usserProp,
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

      this.state.useerStet.ListUser[name] = val //NIMPA STATE DENGAN DATA YANG BARU
      this.setState({ useerStet: this.state.useerStet }) //TERUS DI SET STATE NYA
    }
    render() {
      const editList = async ()=>{

				this.state.upload.push({//NGISI STATE DENGAN DATA DI BAWAH INI
					email:stetEdit.email,
					password:stetEdit.password,
					telepon:stetEdit.telepon,
					background:stetEdit.background,
					fullname:stetEdit.fullname,
					alamat:stetEdit.alamat,
        })
        const ID = this.props.match.params.iduser
        //PROSES UPLOAD NYA 
        await this.props.dispatch(updateUser(ID,(this.state.upload[0]) ))
          
          //reload setelah 500 mili detil setelah submit 
        setTimeout(function(){ if(! alert("data user telah di update")){window.location.reload();} }, 500);
      }
        const stetEdit = this.state.useerStet.ListUser || []
    
    return (
    <div>
     				<form action="http://www.w3schools.com">
						<div class="modal fade" id="MeditUser">
							<div class="modal-dialog">
								<div class="modal-content">
								
									<div class="modal-header">
										<h6 class="modal-title">edisssts book</h6>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({ buku:state.reBuku, user: state.reUser

})

export default connect(mapStateToProps)(UsD);