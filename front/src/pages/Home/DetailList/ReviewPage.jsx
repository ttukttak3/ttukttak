import React from 'react';
import style from './BookDetailPage.style';
const ReviewPage = () => {
  const { ReviewWrap } = style;
  return (
    <ReviewWrap>
      <h2>이 책에 대한 리뷰</h2>
      <ul>
        <li>
          <div>★★★★★</div>
          <div>
            중요한 건 남의 대답을 정리한 게 아니라 자신의 대답을 써야 한다는 것이다. 와아
            <button>더보기</button>
          </div>
          <p>쏴리질러봐 | 2022.05.28</p>
        </li>
      </ul>
    </ReviewWrap>
  );
};

export default ReviewPage;
