import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser1} from '../redux/actions/user'
import { getHist1} from '../redux/actions/history'
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import moment from "moment";
import '../../src/index.css'

const dataStorage = JSON.parse(localStorage.getItem("data")) || "" 

class UsD extends Component {
    
    constructor(props) {
        super(props);
        this.state = {    //BUAT STATE DULU BUAT PENAMPUNGAN NANTI
            modal: false,
            useerStet: [],
            historiia: [],
            //upload:[],
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {  // LOAD dataStorage D JSON.parse(localStorageULU.getItem(data))  DI SINI
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
    render() {
        const arrayBaru = this.state.historiia.ListHistory
        const stetEdit = this.state.useerStet.ListUser || []
        console.log("user",stetEdit)
        return (
          <div >
{/*///////////////DETAIL USER START////////////////////////////  */}

      {       dataStorage.status && dataStorage.status === "admin"  ?
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
                  <a data-toggle="modal" data-target="#MeditUser" className="button"><input type="submit" class="btn btn-info" value="edit"/></a>
                  </th>
                </tr>
              </table>
            </div>
            :
            <h1>COOOK</h1>
            }

              <div className="container">
                <div className="mt-5">
                
                <MaterialTable
                  title="List Data User"
                  columns={[
                    {
              title: 'Avatar',
              field: 'e',
              render: rowData => (
                // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                //   Open modal
                // </button>
                <Link to={`/history/${rowData.f}`} >
                  <Tooltip title="Detail User">
                  <img style = {{width:"30px"}} src="https://image.flaticon.com/icons/png/512/1/1755.png" data-toggle="modal" data-target="#detailPmj"alt="" ></img>
                  </Tooltip>
                </Link>
              ),
            },
                    { title: 'nama buku',    field: 'a' },
                    { title: 'lama pinjam',   field: 'b' },
                    { title: 'tanggal pinjam', field: 'c' },
                    { title: 'tanggal kembali',     field: 'd' },
                  ]}
                  
                  data= {arrayBaru && arrayBaru.length > 0 && arrayBaru.map((ress, index) =>{
                    return(
                      {
                        f: ress.id,
                        a: ress.nama_buku == null ? "belum pernah pinjam" :ress.nama_buku,
                        b: ress.lama_pinjam == null ? "belum pernah pinjam" :ress.lama_pinjam ,
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