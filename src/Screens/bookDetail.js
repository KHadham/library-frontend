import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBuku1, deleteBuku, updateBuku } from '../redux/actions/book'
import Modal from '../Components/modal/modalAddHist'

import '../../src/index.css'

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            books: [],
            updates: [],
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
      
        await this.props.dispatch(getBuku1(this.props.match.params.id))
        this.setState({
            books:  this.props.book
        })
    } 
    


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    render() {
        //const { books } = this.state
        const list = this.state.books.ListBuku
        console.log("isi", this.state.books.ListBuku)
        return (
          
            <div style={{ backgroundColor: '#f2f2f2', marginBottom: '3em' }}>
           
                <section>
                    <img className="cover"  src={list ? list.foto_sampul : ''} alt=".." />
                    <img className="imgThum" src={list ? list.foto_sampul : ''} alt=".." />
                </section>
                <section>
                    <div className="textDetail container" style={{ backgroundColor: '#f2f2f2', marginTop: '20px' }}>
                        <h1 className="font" >{list ? list.book_name : ''}</h1>
                        <h3>{list ? list.pengarang : ''}</h3>
                        <ul className="tambahandetail">
                            <li><h5 className="category">{list ? list.nama_kategori : ''}</h5></li>
                            <li><h5 className="location">{list ? list.lokasi : ''}</h5></li>
                         
                            <li><h5 className="status">{list ? list.status_pinjam : ''}</h5></li>
                        </ul>
                        <p className="textDesc" >{list ? list.deskripsi : ''}</p>

                    </div>
                </section>
            {/* <Modal/> */}
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        book: state.buku,
        upadate: state.update,
        deleteBook:state.buku
    };
};

export default connect(mapStateToProps)(Detail);