/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import style from './RentListItem.style';
import noImg from '../../assets/img/logo/homeb_default.svg';
import moreGray from '../../assets/img/userInterFace/more_gray.svg';
import arrowRight from '../../assets/img/arrows/Keyboard_arrow_right.svg';

//차입과 대여에 reuse 할 아이템 하나
const RentListItem = ({ mode, item, onClick }) => {
  const [comment, setComment] = useState('');
  const [buttonMsg, setButtonMsg] = useState('대여 현황');
  const { id, status, book, beginDate, endDate, returnDate } = item;
  const { author, subject, deposit, thumbnail } = book;
  const { RentListWrap, NoItem, RentIngBox, BookBox, BookInfo, BookPrice, ReturnBox, PaddingBox, BookingBox } = style;
  // 콤마
  const chgDeposit = deposit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const onErrorImg = e => {
    e.target.src = noImg;
  };

  useEffect(() => {
    if (mode === 'rent') {
      setButtonMsg('대여 현황');
      if (status === 'RENTED') {
        setComment('대여가 진행중이에요.');
      } else if (status === 'RETURN') {
        setComment('');
      }
    } else if (mode === 'borrow') {
      setButtonMsg('차입 현황');
      if (status === 'RENTED') {
        setComment('열심히 독서를 진행중이에요.');
      } else if (status === 'RETURN') {
        setComment('');
      }
    }
  }, [mode, status]);

  return (
    <>
      {status === 'RENTED' ? (
        <RentIngBox>
          <ul>
            <li>
              <h2>{comment}</h2>
              <BookBox onClick={onClick}>
                <div>
                  <img onError={onErrorImg} src={thumbnail === null ? '' : thumbnail.imageUrl} alt="도서 이미지" />
                </div>
                <BookInfo>
                  <h3>
                    {subject}
                    <span>{author}</span>
                  </h3>
                  <img src={arrowRight} alt=">" />
                  <h6>대여일자 {beginDate}</h6>
                  <BookPrice>
                    <div>
                      <p>대여료</p>
                      <p>2,000원</p>
                    </div>
                    <div>
                      <p>보증금</p>
                      <p>{chgDeposit}원</p>
                    </div>
                  </BookPrice>
                </BookInfo>
              </BookBox>
              <button onClick={onClick}>{buttonMsg}</button>
            </li>
          </ul>
        </RentIngBox>
      ) : (
        <ReturnBox>
          <ul>
            <li>
              <PaddingBox>
                <h2>
                  {returnDate.replaceAll('-', '.')} · 반납 완료
                  <img src={moreGray} alt="더보기" />
                </h2>
                <BookBox onClick={onClick}>
                  <div>
                    <img onError={onErrorImg} src={thumbnail === null ? '' : thumbnail.imageUrl} alt="도서 이미지" />
                  </div>
                  <BookInfo>
                    <h3>
                      {subject}
                      <span>{author}</span>
                    </h3>
                    <img className="return" src={arrowRight} alt=">" onClick={onClick} />
                    <h6>대여일자 {beginDate.replaceAll('-', '.')}</h6>
                    <BookPrice>
                      <div>
                        <p>대여료</p>
                        <p>2,000원</p>
                      </div>
                      <div>
                        <p>보증금</p>
                        <p>{chgDeposit}원</p>
                      </div>
                    </BookPrice>
                  </BookInfo>
                </BookBox>
              </PaddingBox>
              {/* <button>리뷰보기</button> */}
            </li>
          </ul>
        </ReturnBox>
      )}
      <button onClick={() => onClick()}></button>
    </>
  );
};

export default RentListItem;
