import React from 'react';
import { Link } from 'react-router-dom'
import {deleteBuku} from '../redux/actions/book';

const Posts = ({ posts, loading }) => {
  
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
        
<div className="container" >
        {
          <div style={{ float: 'right' }}>
            {/* <Input placeholder="Search Books Here..." className="searcHome" onChange={(e) => this.searchBook({ search: e.target.value })} /> */}
            <div style={{ float: 'right', marginTop: '-95px' }}>
            </div>
            <div className="Col md-12 layoutStyle" style={{ marginTop: '50px' }} >
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
                            {/* <p className="statusView">{entry.status_pinjam}</p> */}
                            <img className="adjuctimgs" src={entry.foto_sampul} alt="..." />
                            <p className="catView">[ {entry.nama_kategori}]</p>
                            <p className="textViews">{entry.nama_buku}</p>
                        </div>
                      </Link>
                      <button type="button" class="btn btn-danger btn-sm"  onClick={(event, rowData) =>this.handledetails(entry.id_library)}> hapus </button>
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
