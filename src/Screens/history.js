import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
import moment from "moment";
import Modal from '../Components/modal/modalAddHist'
import { Link } from 'react-router-dom'
import {getHist,deleteHist} from '../redux/actions/history';

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
  handledetails = async (id) =>{
    //this.props.history.push(`/borrowing/details/${id}`)
    await this.props.dispatch(deleteHist(id));
    setTimeout(function(){ if(! alert("data telah di hapus")){window.location.reload();} }, 500);

  }
  render() {
    
    console.log("cokk",this.state.DataHistory)
    const historii = this.state.DataHistory;
    console.log('ini dari list bawah ya', historii.ListHistory)
    const arrayBaru = historii.ListHistory || []
    return (
      <div className="container">
        <div className="mt-5">
        <MaterialTable
          title="riwayat peminjaman"
          columns={[
            { title: 'No',       field: 'f' },
            { title: 'nama peminjam',   field: 'b' },
            { title: 'buku yang di pinjam',    field: 'a' },
            
            { title: 'location', field: 'c' },
            { title: 'lama pinjam',     field: 'd' },
            { title: 'tanggal pinjam',     field: 'e' },
            { title: 'tanggal kembali',     field: 'g' },
            
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
                      h: ress.tanggal_kembali,

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
            disabled: rowData.g !== "Invalid date"
          }),
          {   
              className: 'btn btn-danger btn-sm',
              icon: 'delete',
              tooltip: 'Detail Peminjaman',
              onClick: (event, rowData) =>this.handledetails(rowData.f)
            }
          ]} 
        />
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
            Open modal
      </button>
      <Modal/>
      </div></div>

    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.reHistory,
  };
};

export default connect(mapStateToProps)(histoooriii);
