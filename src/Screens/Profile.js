import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import {getUser,deleteUser} from '../redux/actions/user';

class profile extends Component {
  //buat state kosong
  state = {
    proff: [],
  };

  componentDidMount = async () => {
    await this.props.dispatch(getUser());
    this.setState({
      proff: this.props.user,
    });
  };
  handledetails = async (id) =>{
    //this.props.history.push(`/borrowing/details/${id}`)
    await this.props.dispatch(deleteUser(id));
    setTimeout(function(){ if(! alert("data telah di hapus")){window.location.reload();} }, 500);

  }
  render() {
    const {proff} = this.state;
    const list = proff.listaasdas;
    console.log( this.props);

    const list_kategori = this.state.proff;
    console.log('ini dari list bawah ya', list_kategori.ListBuku)
    const arrayBaru = list_kategori.ListUser || []
    console.log( "wikwik",arrayBaru)
    return (
      <div className="container">
        <div className="mt-5">
        <MaterialTable
          title="Data ussr"
          columns={[
            // {
            //   title: 'Avatar',
            //   field: 'e',
            //   render: rowData => (
            //     <Link to={`/books/${rowData.f}`} >
            //         <img src={rowData.e} alt="" style={{width:"100px", height:"100px"}}></img>
            //     </Link>
            //   ),
            // },
            { title: 'id',       field: 'f' },
            { title: 'fullname',    field: 'a' },
            { title: 'email',   field: 'b' },
            { title: 'location', field: 'c' },
            { title: 'telepon',     field: 'd' },
            { title: 'background',     field: 'e' },

            
          ]}
          data= {arrayBaru.map((ress, index) =>{
            return(
              {
                f: ress.id_user,
                a: ress.fullname,
                b: ress.email,
                c: ress.alamat,
                d: ress.telepon,
                e: ress.background
              }
            ) 
                }
              )
            
          }       
          
              
          actions={ [
            { 
              className: 'btn btn-danger btn-sm',
              icon: 'edit',
              tooltip: 'edit',
              onClick: () =>this.handleupdate()
            },
            {   
              className: 'btn btn-danger btn-sm',
              icon: 'delete',
              tooltip: 'Detail Peminjaman',
              onClick: (event, rowData) =>this.handledetails(rowData.f)
              
            }
          ]} 
        />
      
      </div></div>

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(profile);
