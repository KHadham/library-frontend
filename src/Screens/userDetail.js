import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser1, deleteBuku, updateBuku } from '../redux/actions/user'
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
      
        await this.props.dispatch(getUser1(this.props.match.params.id))
        this.setState({
            books:  this.props.suser
        })
    } 
    


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    render() {
        //const { books } = this.state
       // const list = this.state.books.ListUser
        console.log("sisi",this.props.suser)
        console.log("isi", this.state.books.ListUser)
        return (
          
            <div style={{ backgroundColor: '#f2f2f2', marginBottom: '3em' }}>
           
                
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        suser: state.reUser,
        upadate: state.update,
        deleteBook:state.buku
    };
};

export default connect(mapStateToProps)(Detail);