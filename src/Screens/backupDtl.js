import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBuku1, deleteBuku, updateBuku } from '../redux/actions/book'


class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            books: [],
            updates: [],
        };
        this.deleteClick = this.deleteClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount = async () => {
        await this.props.dispatch(getBuku1(this.props.match.params.id))
        this.setState({
            books:  this.props.book
        })
    }

    deleteClick() {
        this.props.dispatch(deleteBuku(this.props.match.params.id))
        this.setState({
            books: this.props.book
        })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    editClick(book_name, writter, location, foto_sampul, id_category, description, status) {
        this.props.dispatch(updateBuku(this.props.match.params.bookid, book_name, writter, location, foto_sampul, id_category, description, status))
        this.setState({
            updates: this.props.update
        })
    }

    render() {
        //const { books } = this.state
        const list = this.state.books.ListBuku
        console.log("isi", this.state.books.ListBuku)
        return (
            <div style={{ backgroundColor: '#f2f2f2', marginBottom: '3em' }}>
                <section>

                    <div>
                        <div className="box">
                            <ul className="navLink">
                                <li><Link className="textLink" to={'/'}><i class="fas fa-arrow-alt-circle-left fa-2x"></i></Link></li>
                            </ul>
                        </div>
                    </div>



                    <img className="cover" src={list ? list.foto_sampul : ''} alt=".." />
                    <img className="imgThum" src={list ? list.foto_sampul : ''} alt=".." />
                </section>
                <section>
                    <div className="textDetail container" style={{ backgroundColor: '#f2f2f2', marginTop: '20px' }}>
                        <h1 className="font" >{list ? list.book_name : ''}</h1>
                        <h3>{list ? list.writter : ''}</h3>
                        <ul className="tambahandetail">
                            <li><h5 className="category">{list ? list.category_name : ''}</h5></li>
                            <li><h5 className="location">{list ? list.location : ''}</h5></li>
                            <li><h5 className="status">{list ? list.status : ''}</h5></li>
                        </ul>
                        <p className="textDesc" >{list ? list.description : ''}</p>

                    </div>
                </section>

            </div>)
    }
}

const mapStateToProps = state => {
    return {
        book: state.buku,
        upadate: state.update
    };
};

export default connect(mapStateToProps)(Detail);