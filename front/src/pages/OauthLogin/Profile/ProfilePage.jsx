import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../../util/APIUtils';

const HeaderBox = styled.div`
  height: 100px;
  line-height: 100px;
  background: #efefef;
  text-align: center;
  font-size: 30px;
`;

const ProfileBox = styled.div`
  margin: 0;
  padding: 0;
  text-align: center;
  img {
    border-radius: 50%;
  }
`;

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
      })
      .catch(error => {
        setCurrentUser('');
      });
  }, []);

  console.log(currentUser);

  return (
    <div>
      <HeaderBox>
        <Link to="/">Home</Link>
      </HeaderBox>
      <ProfileBox>
        <h6>{currentUser.name}</h6>
        <img src={currentUser.imageUrl} alt="profileImg" />
        <div>{currentUser.email}</div>
      </ProfileBox>
    </div>
  );
};

export default ProfilePage;
