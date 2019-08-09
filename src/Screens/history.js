import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
import moment from "moment";
import Modal from '../Components/modal/modalAddHist'
import {getHist,deleteHist,updateHist} from '../redux/actions/history';
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
const dataStorage = JSON.parse(localStorage.getItem("data")) || ""

class histoooriii extends Component {
  //buat state kosong
  state = {
    DataHistory: [],
  };

  componentDidMount = async () => {
    await this.props.dispatch(getHist());
    this.setState({
      DataHistory: this.props.history,
    });
  };

  Deletetete = async (id) =>{
    await this.props.dispatch(deleteHist(id));
    setTimeout(function(){ if(! alert("data telah di hapus")){window.location.reload();} }, 500);
  }

  UPPPPdett = async (id,data) =>{
    await this.props.dispatch(updateHist(id,data));
    setTimeout(function(){ if(! alert("buku sudah di kembalikan")){window.location.reload();} }, 500);

  }

  render() {
    console.log("cokk",this.state.DataHistory)
    const historii = this.state.DataHistory;
    console.log('ini dari list bawah ya', historii.ListHistory)
    const arrayBaru = historii.ListHistory || [] 

    return (
      <div className="container">
        {dataStorage.status && dataStorage.status == "admin" ?
        <div className="mt-5">
        <MaterialTable
          title="riwayat peminjaman"
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
            { title: 'No',       field: 'f' },
            { title: 'nama peminjam',   field: 'b' },
            { title: 'buku yang di pinjam',    field: 'a' },
            
            { title: 'location', field: 'c' },
            { title: 'lama pinjam',     field: 'd' },
            { title: 'tanggal pinjam',     field: 'e' },
            { title: 'tanggal kembali',     field: 'h' },
            
          ]}
          data= {arrayBaru.map((ress, index) =>{
            
            return(
                    {
                      f: ress.id,
                      a: ress.nama_buku,
                      b: ress.fullname,
                      c: ress.alamat,
                      d: ress.lama_pinjam+" hari",
                      e: moment(ress.tanggal_pinjam).format("dddd,DD-MM-YYYY"),
                      g: moment(ress.tanggal_kembali).format("dddd,DD-MM-YYYY"),
                      h: moment(ress.tanggal_kembali).format("dddd,DD-MM-YYYY") === "Invalid date" ?  <p style={{color:"red"}}>buku belum di kembalikan</p>
                      : moment(ress.tanggal_kembali).format("dddd,DD-MM-YYYY")
                      
                    }
                  ) 
                }
              )
            }       
            actions={ [
              rowData => ({
                icon: 'reply',
                tooltip: 'Kembalikan Buku',
                onClick: (event, rowData) => this.UPPPPdett(rowData.f),
                disabled: rowData.g !== "Invalid date"
              }),
              {   
                  className: 'btn btn-danger btn-sm',
                  icon: 'delete',
                  tooltip: 'Hapus',
                  onClick: (event, rowData) => this.Deletetete(rowData.f)
                }
              ]} 
        />
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
            Open modal
      </button>
      <Modal/> 
      
      </div>
            :
          <h1>anda bukan admin</h1>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.reHistory,
  };
};

export default connect(mapStateToProps)(histoooriii);
