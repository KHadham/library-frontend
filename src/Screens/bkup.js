import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser1} from '../redux/actions/user'
import { getHist1asli} from '../redux/actions/history'
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import moment from "moment";
import '../../src/index.css'

class UsD extends Component {

    constructor(props) {
        super(props);
        this.state = {    //BUAT STATE DULU BUAT PENAMPUNGAN NANTI
            modal: false,
            useerStet: [],
            historiia: [],
            //upload:[],
        };
    }

    componentDidMount = async () => {  // LOAD DATANYA DULU DI SINI
      const ID = this.props.match.params.idHist
      
        await this.props.dispatch(getUser1(ID))
        await this.props.dispatch(getHist1asli(ID))

        this.setState({
          useerStet:  this.props.usserProp,
          historiia:  this.props.historih
        })
      } 
      
    render() {
        const arrayBaru = this.state.historiia.ListHistory
        const stetEdit = this.state.useerStet.ListUser || []
        console.log("aray baru", arrayBaru)
        return (
          <div >
          {/*///////////////DETAIL USER START////////////////////////////  */}
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
{/* //////////// TABLE START ////////////  */}
              <div className="container">
                <div className="mt-5">
                <MaterialTable
                  title="Data Return Book "
                  columns={[
                    {
              title: '',
              field: 'e',
              render: rowData => (
                // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                //   Open modal
                // </button>
                rowData.e === null ? 
                <Link to={`/history/${rowData.f}`} >
                  <Tooltip title="Detail User">
                  <img style = {{width:"30px"}} src="https://image.flaticon.com/icons/png/512/1/1755.png" data-toggle="modal" data-target="#detailPmj"alt="" ></img>
                  </Tooltip>
                </Link> :
                <img style = {{width:"30px"}} src="https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/check.png" data-toggle="modal" data-target="#detailPmj"alt="" ></img>
              ),
            },
            {
              title: '',
              field: 'g',
              render: rowData => (
                // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                //   Open modal
                // </button>
                <Link to={`/buku/${rowData.h}`} >
                  <Tooltip title="Detail User">
                  <img style = {{width:"80px"}} src={rowData.g} data-toggle="modal" data-target="#detailPmj"alt="" ></img>
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
                        a: ress.nama_buku == null ? "no data" :ress.nama_buku,
                        b: ress.lama_pinjam == null ? "no data" :ress.lama_pinjam + " hari" ,
                        c: moment(ress.tanggal_pinjam).format("dddd,DD-MM-YYYY") === "Invalid date" ?
                          <p>pernah</p> 
                          : moment(ress.tanggal_pinjam).format("dddd,DD-MM-YYYY"),
                        d: moment(ress.tanggal_kembali).format("dddd,DD-MM-YYYY") === "Invalid date" ?
                          <p style={{color:"red"}}>buku belum kembali</p> 
                          : moment(ress.tanggal_kembali).format("dddd,DD-MM-YYYY"),
                        e: ress.tanggal_kembali  ,
                        g: ress.foto_sampul  ,
                        h: ress.id_buku  ,

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