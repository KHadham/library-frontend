import React, {Component} from 'react';
import {connect} from 'react-redux';
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import {getUser,deleteUser} from '../redux/actions/user';
import { func } from 'prop-types';

class profile extends Component {
  //buat state kosong
  state = {
    proff: [],
  };

  componentDidMount = async () => {
    await this.props.dispatch(getUser());
    this.setState({
      proff: this.props.jamban,
    });
  };
  handledelete = async (id) =>{
    //this.props.history.push(`/borrowing/details/${id}`)
    await this.props.dispatch(deleteUser(id));
    setTimeout(function(){ if(! alert("data telah di hapus")){window.location.reload();} }, 500);

  }
  handledetails = (id) =>{
    console.log(this.state.proff.ListUser.id)
    //alert(console.log(this.state.proff))
    //this.state.proff.ListUser.push(`/users/${id}`)
  }
  render() {
   

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
            {
              title: 'Avatar',
              field: 'e',
              render: rowData => (
                <Link to={`/users/${rowData.f}`} >
                    <p>e</p>
                </Link>
              ),
            },
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
              onClick: (event, rowData) =>this.handledetails(rowData.f)
            },
            {   
              className: 'btn btn-danger btn-sm',
              icon: 'delete',
              tooltip: 'Detail Peminjaman',
              onClick: (event, rowData) =>this.handledelete(rowData.f)
              
            }
          ]} 
        />
      
      </div></div>

    );
  }
}

const mapStateToProps = state => {
  return {
    jamban: state.reUser,
  };
};

export default connect(mapStateToProps)(profile);
