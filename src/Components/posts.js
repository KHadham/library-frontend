/* eslint-disable no-restricted-globals */
import React from 'react';
import { Link } from 'react-router-dom'
import { deleteBuku } from '../redux/actions/book';
import { useDispatch } from 'react-redux'

const dataStorage = JSON.parse(localStorage.getItem("data")) || ""

const Posts = ({ posts, loading }) => {
  const dispatch = useDispatch()

  if (loading) {
    return <h2>Loading...</h2>;
  }
  const handledetails = async (id) => {
    let confirmation = confirm( "anda yakin ingin menghapus data buku ini ?")
    if (confirmation === true) {
      dispatch(deleteBuku(id))
      setTimeout(() => {
        window.location.reload()
      }, 300);
    }
  }
  return (

    <div className="container" >
      {
        <div class="center">
          
          <div className="Col md-12 layoutStyle" style={{ marginTop: '25px' }} >
            {
              posts &&
              posts.length > 0 &&
              posts.map((entry, index) => {
                return (
                  <div key={index} className="Col md-8 boxs">
                    <Link to={`buku/${entry.id_library}`}>
                      <div>
                        {entry.status_pinjam == "tersedia" ?
                          <p className="statusAda" >{entry.status_pinjam}</p> :
                          <p className="statusView">{entry.status_pinjam}</p>
                        }
                        <img className="adjuctimgs" src={entry.foto_sampul} alt="..." />
                        <p className="catView">[ {entry.nama_kategori}]</p>
                        <p className="textViews">{entry.nama_buku}</p>
                      </div>
                    </Link>
                    {dataStorage.status && dataStorage.status === "admin" ?
                      <button type="button" class="btn btn-danger btn-sm" onClick={(event, rowData) => handledetails(entry.id_library)}> hapus </button>
                      : ""
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>

  );
};

export default Posts;
