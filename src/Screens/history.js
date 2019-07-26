import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
import moment from "moment";
import Modal from '../Components/modal/modalAddHist'
import { Link } from 'react-router-dom'
import {getHist} from '../redux/actions/history';

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
                    }
                  ) 
                }
              )
            }       
          
              
          actions={[
            {
              icon: 'add',
              tooltip: 'Add User',
              isFreeAction: true,
              
              //onClick: (event) => alert("You want to add a new row")
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
    history: state.history,
  };
};

export default connect(mapStateToProps)(histoooriii);
