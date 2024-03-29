import React, { useState, useEffect } from 'react';
import Posts from '../Components/posts';
import Pagination from '../Components/Pagination';
import axios from 'axios';
import { getBuku } from '../redux/actions/book';
import { deleteBuku } from '../redux/actions/book';
import Modal from '../Components/modal/modalAddBook';

// import './App.css';

const App = () => {
  //hooks
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://wikwik123.herokuapp.com/buku');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <div className='border container my-4'>
        <button style={{ marginTop: '20px' }} type="button" class="btn btn-primary" data-toggle="modal" data-target="#getdebuk">donasikan buku</button>
          <Posts posts={currentPosts} loading={loading} />
        <Modal />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          />
          </div>
    </React.Fragment>
  );
};

export default App;