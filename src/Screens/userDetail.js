import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser1} from '../redux/actions/user'
import { getHist1} from '../redux/actions/history'
import MaterialTable from 'material-table'
import moment from "moment";

import '../../src/index.css'

class UsD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            useer: [],
            historiia: [],
            updates: [],
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
      
        await this.props.dispatch(getUser1(this.props.match.params.iduser))
        await this.props.dispatch(getHist1(this.props.match.params.iduser))

        this.setState({
            useer:  this.props.usser,
            historiia:  this.props.historih
        })
    } 
    


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    render() {
        //const { useer } = this.state
        const arrayBaru = this.state.historiia.ListHistory
        console.log("Props USD", this.props.usser.ListUser)
        //console.log("State USD", arrayBaru.email)

        console.log("HST", this.state.historiia.ListHistory)
        return (
          
            <div >
                <div>
                    <table style={{ marginLeft: '30px', marginTop: '1em' }}>
                        <tr>
                            <th style={{ paddingRight: '40px' }}> Name</th>
                            <th>:  {this.props.usser.ListUser.fullname}</th>
                        </tr>
                        <tr>
                            <th>No KTP</th>
                            <th>:  {this.props.usser.ListUser.telepon}</th>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <th>:  {this.props.usser.ListUser.email}</th>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <th>:  {this.props.usser.ListUser.status}</th>
                        </tr>
                        <tr>
                            <th>alamat</th>
                            <th>:  {this.props.usser.ListUser.alamat}</th>
                        </tr>
                        <tr>
                            <th>background</th>
                            <th>:  {this.props.usser.ListUser.background}</th>
                        </tr>
                    </table>
                </div>
                <div className="container">
                  <div className="mt-5">
                  <MaterialTable
                    title="Data ussr"
                    columns={[
                      // {
                      //   title: 'Avatar',
                      //   field: 'e',
                      //   render: rowData => (
                      //     <Link to={`/users/${rowData.f}`} >
                      //         <p>e</p>
                      //     </Link>
                      //   ),
                      // },
                      { title: 'nama buku',    field: 'a' },
                      { title: 'lama pinjam',   field: 'b' },
                      { title: 'tanggal pinjam', field: 'c' },
                      { title: 'tanggal kembali',     field: 'd' },

                      
                    ]}
                    data= {arrayBaru &&
                            arrayBaru.length > 0 &&
                            arrayBaru.map((ress, index) =>{
                      return(
                        {
                          f: ress.id_user,
                          a: ress.nama_buku,
                          b: ress.lama_pinjam + " hari ",
                          c: moment(ress.tanggal_pinjam).format("dddd,DD-MM-YYYY"),
                          d: moment(ress.tanggal_kembali).format("dddd,DD-MM-YYYY"),
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
                      // {   
                      //   className: 'btn btn-danger btn-sm',
                      //   icon: 'delete',
                      //   tooltip: 'Detail Peminjaman',
                      //   onClick: (event, rowData) =>this.handledelete(rowData.f)
                        
                      // }
                    ]} 
                  />
                </div>
              </div>
              
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        usser: state.reUser,
        historih: state.reHistory,
    };
};

export default connect(mapStateToProps)(UsD);