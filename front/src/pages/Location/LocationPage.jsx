/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setBack, setAllFalse, setLocationBox, setPlaceholder } from '../../app/headerSlice';
import style from './LocationPage.style';
import locationUtils from '../../util/LocationApi';

const LocationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getNearTown, getLocation, getSearchTownList } = locationUtils;
  const [eventListener, setEventListener] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const [searchTownList, setSearchTownList] = useState([]);
  //layout param
  const { townId } = useParams();

  //---------------header START---------------
  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setLocationBox(true));
    dispatch(setPlaceholder('동명(읍, 면) 으로 검색 (ex. 서초동)'));

    getNearTown(townId).then(result => {
      setNearTownList(result);
    });
    setEventListener(true);
    return () => {};
  }, [dispatch, getNearTown]);

  //header event
  const searchInputKeyUp = e => {
    if (e.key === 'Enter') {
      searchBtnClick();
    }

    if (!e.target.value) {
      tabClickHandler(0);
    }
  };

  const searchBtnClick = () => {
    //eventListner 재 실행 막기
    if (isAction) {
      return;
    }
    setIsAction(true);
    if (document.getElementById('searchInput').value === '') {
      alert('검색어를 입력하세요');
    } else {
      getSearchTownList(document.getElementById('searchInput').value).then(result => setSearchTownList(result));
      tabClickHandler(1);
    }
  };

  const clearBtnClick = () => {
    tabClickHandler(0);
  };

  useEffect(() => {
    //header search input
    if (eventListener) {
      document.getElementById('searchInput').addEventListener('keyup', searchInputKeyUp);
      document.getElementById('searchBtn').addEventListener('click', searchBtnClick);
      document.getElementById('clearBtn').addEventListener('click', clearBtnClick);
    }
    return () => {
      document.getElementById('searchInput').removeEventListener('keyup', searchInputKeyUp);
      document.getElementById('searchBtn').removeEventListener('click', searchBtnClick);
      document.getElementById('clearBtn').removeEventListener('click', clearBtnClick);
    };
  }, [eventListener]);

  //---------------header END---------------
  const [nearTownList, setNearTownList] = useState([]);
  //현재 위치로 찾기
  const onNearHandler = () => {
    getCurrentLocation();
    document.getElementById('clearBtn').click();
  };

  //현재 위치 가져오기
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          getLocation(position).then(result => {
            getNearTown(result.id).then(result => {
              setNearTownList(result);
            });
          });
        },
        function (error) {
          alert('위치를 허용하지 않아 기본값인 세종로 기준으로 조회합니다.');
          getNearTown('1111011900').then(result => {
            setNearTownList(result);
          });
        },
      );
    } else {
      alert('위치를 허용하지 않아 기본값인 세종로 기준으로 조회합니다.');
      getNearTown('1111011900').then(result => {
        setNearTownList(result);
      });
    }
  };
  //조회 동네 click
  const onClickHandler = town => {
    localStorage.setItem('backTownId', town.id);
    localStorage.setItem('backAddress', town.longAddress);
    localStorage.setItem('town', JSON.stringify(town));
    navigate(-1);
  };

  //-------------- tab --------------
  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler = index => {
    setActiveIndex(index);
  };

  const { LocationBox, SubmitBtn, NearBox } = style;
  const tabContArr = [
    {
      //조회 전 근처 동네
      tabCont: (
        <NearBox className={activeIndex === 0 ? 'active' : 'hide'}>
          <h2>근처 동네</h2>
          <ul>
            {nearTownList.map((item, idx) => (
              <li key={idx} onClick={() => onClickHandler(item)}>
                {item.longAddress}
              </li>
            ))}
          </ul>
        </NearBox>
      ),
    },
    {
      //조회 동네
      tabCont: (
        <div className={activeIndex === 1 ? 'active' : 'hide'}>
          <ul>
            {searchTownList.map((item, idx) => (
              <li key={idx} onClick={() => onClickHandler(item)}>
                {item.city} {item.address} {item.etc}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <LocationBox>
      <SubmitBtn onClick={onNearHandler}>현재 위치로 찾기</SubmitBtn>
      {tabContArr[activeIndex].tabCont}
    </LocationBox>
  );
};

export default LocationPage;
