import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getHist1asli,updateHist} from '../redux/actions/history'
import moment from "moment";
import '../../src/index.css'

class UsD extends Component {

    constructor(props) {
        super(props);
        this.state = {    //BUAT STATE DULU BUAT PENAMPUNGAN NANTI
            modal: false,
            historiia: [],
						updateS: [],
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {  // LOAD DATANYA DULU DI SINI
      const ID = this.props.match.params.idHist
      
        await this.props.dispatch(getHist1asli(ID))

        this.setState({
          historiia:  this.props.historih
        })
      } 
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    // changeHandle = (e) => { //MENERIMA PERUBAHAN PADA FORM
    //   const name = e.currentTarget.name
    //   const val = e.currentTarget.value

    //   this.state.bookS.ListBuku[name] = val //NIMPA STATE DENGAN DATA YANG BARU "val"
    //   this.setState({ bookS: this.state.bookS }) //TERUS DI SET STATE NYA
		// }
    render() {
      const editList = async ()=>{
				this.state.updateS.push({
					id_buku:stetEdit.id_buku,
					
				})
	
				const ID = this.props.match.params.idHist
        //PROSES UPLOAD NYA 
        await this.props.dispatch(updateHist(ID,(this.state.updateS[0]) ))
          
        //reload setelah 500 mili detil setelah submit 
        setTimeout(function(){ if(! alert("terimakasih telah meminjam")){window.location.reload();} }, 500);
			}
        const arrayBaru = this.state.historiia.ListHistory || []
        const stetEdit = arrayBaru[0] || []
        const tanggal_pinjam = moment(stetEdit.tanggal_pinjam).dayOfYear()
        const tanggal_kembali = stetEdit.tanggal_kembali == null ?
          moment(new Date()).dayOfYear() :
          moment(stetEdit.tanggal_kembali).dayOfYear()
        const selisih_hari = tanggal_kembali - tanggal_pinjam
        const sisahari = stetEdit.lama_pinjam- selisih_hari
        const denda = (selisih_hari - stetEdit.lama_pinjam) * 1500
        console.log("hst",selisih_hari)
        return (
          <div  style={{width:"100%",backgroundImage: `url(${stetEdit.foto_sampul})`}} >
          <div >
          {/*///////////////DETAIL USER START////////////////////////////  */}
          <div  className="container">
          
              <div  className="mt-2 card">
              <div  class="row card-body">
                    <div class="col-md-6">
                    <h1>loan summary </h1>
                        <table class="table table-borderless">
                          
                          <tbody>
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
                          </tbody>
                        </table>
                        { stetEdit.tanggal_kembali !== null ? 
                          <button type="button" disabled class="btn btn-success">Buku sudah kembali</button> :
                          <button type="button" onClick={editList.bind(this)} class="btn btn-primary">kembalikan buku</button>
                         }
                        
                    </div>
                    <div class="col-md-6">
                        <table class="table table-borderless">
                          <tbody>
                          <tr>
                  <th></th>
                  <th style={{ paddingRight: '10%' }}><img src={stetEdit.foto_sampul} style={{ width: '150px'}} /></th>
                </tr>
                          <tr>
                              <th style={{ paddingRight: '40px' }}> nama buku</th>
                              <th>:  {stetEdit.nama_buku}</th>
                            </tr>
                            <tr>
                              <th>tanggal_pinjam</th>
                              <th>:  { moment(stetEdit.tanggal_pinjam).format("dddd,DD-MM-YYYY")}</th>
                            </tr>
                            <tr>
                              <th>lama_pinjam</th>
                              <th>:  {stetEdit.lama_pinjam} hari</th>
                            </tr>
                            <tr>
                              <th>sisa hari</th>
                              <th>:  { sisahari + " hari"}</th>
                            </tr>
                            <tr>
                  <th>Denda</th>
                  <th>:  {denda < 0 ? "tidak ada denda" : denda + " rupiah" } </th>
                </tr>
                
                          </tbody>
                        </table>
                    </div>
                </div>
              </div>
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