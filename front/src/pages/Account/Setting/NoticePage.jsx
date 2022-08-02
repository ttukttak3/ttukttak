/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticePage = () => {
  const navigate = useNavigate();
  const [contents, setContens] = useState();

  useEffect(() => {}, []);

  return (
    <ul>
      {contents ? (
        contents.map(item => {
          return (
            <li key={item.id} onClick={() => navigate(`/account/setting/notice/${item.id}`)}>
              <h4>{item.content}</h4>
              <p>{item.cratedDate}</p>
            </li>
          );
        })
      ) : (
        <li>
          <h4>공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.공지사항입니다.</h4>
          <p>2020-12-45</p>
        </li>
        // <li className="noList">공지사항이 없습니다.</li>
      )}
    </ul>
  );
};

export default NoticePage;
