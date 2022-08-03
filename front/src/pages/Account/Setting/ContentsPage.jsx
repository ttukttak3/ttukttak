/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setBack, setAllFalse, setTitle } from '../../../app/headerSlice';
import style from './SettingPage.style';
import NoticePage from './NoticePage';

const ContentsPage = () => {
  const { contents } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = contents === 'faq' ? 'FAQ' : contents === 'notice' ? '공지사항' : contents === 'terms' ? '서비스 이용약관' : '개인 정보 처리 방침';

  useEffect(() => {
    dispatch(setAllFalse());
    dispatch(setBack(true));
    dispatch(setTitle(title));
    //로그인 back history
    //localStorage.setItem('url', `/account/setting/${contents}`);
    return () => {};
  }, [dispatch]);

  const handleAccordionFAQ = e => {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      e.target.nextElementSibling.classList.remove('active');
    } else {
      e.target.classList.add('active');
      e.target.nextElementSibling.classList.add('active');
    }
  };

  const { ContentsBox, FAQBox, NoticeBox, ServiceBox, CustomerBox } = style;

  //-------------- tab --------------
  const contetnsIndex = contents === 'faq' ? 0 : contents === 'notice' ? 1 : contents === 'terms' ? 2 : 3;
  const tabContArr = [
    {
      //FAQ
      tabCont: (
        <FAQBox>
          <ul>
            <li onClick={handleAccordionFAQ}>개인 책방은 어떻게 운영되나요?</li>
            <li>너..... 납치된거야</li>

            <li onClick={handleAccordionFAQ}>이용약관에 대한 컴플레인은 어떻게 하면 할 수 있나요?</li>
            <li>개인 책방은 뚝딱 멤버의 소중한 시간외 노동으로 이루어져 있습니다.</li>
          </ul>
        </FAQBox>
      ),
    },
    {
      //공지사항
      tabCont: (
        <NoticeBox>
          <NoticePage />
        </NoticeBox>
      ),
    },
    {
      //서비스 이용약관
      tabCont: (
        <ServiceBox>
          <h2>계정 관련</h2>
          <p>개인책방 서비스는 1인 1계정 생성을 원칙으로 하고 있습니다. 그래서 계정은 본인만 이용할 수 있으며, 다른 사람에게 이용을 허락하거나 양도할 수 없습니다. </p>
          <p>
            네이버와 카카오 로그인을 통해 계정을 생성할 수 있습니다. 네이버 또는 카카오 계정을 가지고 있지 않다면, 계정 생성에 제한을 받을 수 있습니다. 한 사람이 네이버와 카카오 로그인을 모두 사용하여
            2개의 계정을 생성하는 경우, 2개의 계정은 연동되지 않습니다. 그러므로 각각의 계정은 동일인이 아닌 타인으로 인지합니다.
          </p>
          <p>
            개인정보는 네이버와 카카오로부터 수급받습니다. 자세한 사항은 <span onClick={() => navigate('/account/setting/infomation')}>개인정보 처리방침</span>을 통해 확인하실 수 있습니다.
          </p>
          <p>제재원칙 또는 법률 위반 등의 정당한 사유로 관리자가 계정을 삭제할 수 있습니다. 계정 삭제 시에는 이메일을 통해 고지 후 진행합니다.</p>
          <h2>제재원칙</h2>
          <ol>
            <li>성인물 대여를 금지하고 있습니다. 성인물 업로드가 확인되었을 때는 해당 게시물을 삭제하는 조치를 취합니다.</li>
            <li>타 이용자의 정보를 무단으로 수집/이용하는 행위 및 수집한 타 이용자의 정보를 다른 사람들에게 제공하는 행위가 확인된 경우, 해당 계정을 강제 탈퇴하는 조치 및 법적 조치를 취합니다.</li>
            <li>잘못된 방법으로 서비스의 제공을 방해하거나 개인책방을 안내하는 방법 이외의 다른 방법을 사용하여 개인책방 서비스에 접근하는 행위에 대해 관리자 판단 하에 제재를 가합니다.</li>
            <li>저작권 침해 정보 등 법령에 위반되는 내용의 정보를 발송하거나 게시하는 경우, 해당 계정을 강제 탈퇴하거나 게시물을 삭제하는 조치를 취합니다.</li>
            <li>
              개인책방 동의 없이 개인책방 서비스 또는 이에 포함된 소프트웨어의 일부를 복사, 수정, 배포, 판매, 양도, 대여, 담보제공하거나 타인에게 그 이용을 허락하는 행위에 대해 관리자 판단 하에 제재
              및 법적 조치를 취합니다.
            </li>
            <li>소프트웨어를 역설계하거나 소스 코드의 추출을 시도하는 등 개인책방 서비스를 복제, 분해 또는 모방하거나 기타 변형하는 행위에 대해 관리자 판단 하에 제재 및 법적 조치를 취합니다.</li>
            <li>기타 관련 법령을 위반하는 행위에 대해 법적 조치를 취합니다.</li>
          </ol>
          <h2>게시물의 관리</h2>
          <p>개인책방 서비스 사용자는 서비스 내에 게시한 게시물에 대해 저작권을 가지고 있습니다.</p>
          <p>
            하지만 타 사용자의 게시물이 ‘정보통신망법’ 및 ‘저작권법’ 등 관련 법을 위반하는 내용을 포함하여 권리자에게 피해를 입힐 수 있습니다.
            <br />
            권리자는 관련 법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등 요청할 수 있습니다.
            <br /> 해당 요청에 따라, 개인책방은 관련법에 따라 조치를 취합니다.
          </p>
          <p>권리자의 요청이 없는 경우에도, 관리자의 판단 하에 권리침해가 인정되는 경우 또는 관련법을 위반되는 경우 게시물에 대해 제재를 가할 수 있습니다.</p>
          <h2>사용권리</h2>
          <p>
            개인책방은 서비스 이용을 위하여 양도불가능하고 무상의 라이선스를 사용자에게 제공합니다. <br />
            하지만 개인책방 상표 및 로고를 사용할 권리를 사용자에게 부여하지 않습니다.
          </p>
          <h2>서비스 고지 및 홍보내용 표시</h2>
          <p>개인책방은 사용자의 편의를 위해 서비스 이용과 관련된 각종 고지 및 기타 개인책방 서비스 홍보를 포함한 다양한 정보를 서비스에 표시할 수 있으며 사용자는 이에 동의합니다.</p>
          <p>
            한편 개인책방은 사용자가 수집에 동의한 서비스 내 활동 정보를 기초로 개인책방에게 직접적인 수익이 발생하지 않거나 개인책방이 판매하는 상품과 직접적인 관련성이 없는 한도에서 다른 서비스
            사용자가 판매하는 상품 또는 서비스에 관한 정보를 위와 같은 방법으로 사용자에게 보낼 수 있으며 사용자는 이에 동의합니다.
          </p>
          <p>사용자분는 관련 법령상 필요한 내용을 제외하고 언제든지 이러한 정보에 대한 수신 거절을 할 수 있으며, 이 경우 당근마켓은 즉시 위와 같은 정보를 보내는 것을 중단합니다.</p>
          <h2>위치기반서비스 관련</h2>
          <p>개인책방은 사용자에게 유용한 서비스를 제공하기 위하여 서비스에 위치기반서비스를 포함시킬 수 있습니다. </p>
          <p>
            개인책방의 위치기반서비스는 사용자의 단말기기의 위치정보를 수집하는 위치정보사업자로부터 위치정보를 전달받아 제공하는 무료서비스이며, 구체적으로는 사용자의 현재 위치를 기준으로 다른
            이용자와 해당 지역과 관련된 게시물을 작성할 수 있도록 하는 서비스가 있습니다.
          </p>
          <p>
            사용자는 서비스와 관련된 개인위치정보의 이용, 제공 목적, 제공받는 자의 범위 및 위치기반서비스의 일부에 대하여 동의를 유보하거나, 이용∙제공에 대한 동의의 전부 또는 일부 철회할 수 있으며,
            일시적인 중지를 요구할 수 있습니다.
          </p>
          <p>
            개인책방은 위치정보의 보호 및 이용 등에 관한 법률의 규정에 따라 개인위치정보 및 위치정보 이용∙제공사실 확인자료를 6개월 이상 보관하며, 사용자가 동의의 전부 또는 일부를 철회한 때에는
            개인책방은 철회한 부분에 해당하는 개인위치정보 및 위치정보 이용∙제공사실 확인자료를 지체 없이 파기하겠습니다.
          </p>
          <p>
            사용자는 개인책방에 대하여 사용자에 대한 위치정보 이용∙제공사실 확인자료나, 사용자의 개인위치정보가 법령에 의하여 제3자에게 제공되었을 때에는 그 이유 및 내용의 열람 또는 고지를 요구할 수
            있고, 오류가 있는 때에는 정정을 요구할 수 있습니다.
          </p>
          <p>
            만약, 개인책방이 사용자의 개인위치정보를 사용자가 지정하는 제3자에게 직접 제공하는 때에는 법령에 따라 개인위치정보를 수집한 스마트폰 등으로 사용자에게 개인위치정보를 제공받는 자, 제공 일시
            및 제공 목적을 즉시 통보하겠습니다.
          </p>
          <p>
            만약 사용자와 개인책방 간의 위치정보와 관련한 분쟁에 대하여 협의가 어려운 때에는 사용자는 위치정보의 보호 및 이용 등에 관한 법률 제 28조 2항 및 개인정보보호법 제43조의 규정에 따라 개인정보
            분쟁조정위원회에 조정을 신청할 수 있습니다.
          </p>
          <h2>서비스 중단</h2>
          <p>개인책방 서비스는 장비의 유지∙보수를 위한 정기 또는 임시 점검 또는 다른 이유로 서비스의 제공이 일시 중단될 수 있으며, 이때에는 미리 서비스 제공화면에 공지하겠습니다. </p>
          <p>만약, 개인책방으로서도 예측할 수 없는 이유로 서비스가 중단된 때에는 개인책방이 상황을 파악하는 즉시 통지하겠습니다.</p>
          <h2>이용계약 해지(서비스 탈퇴)</h2>
          <p>
            사용자가 서비스의 이용을 더 이상 원치 않는 때에는 언제든지 서비스 내 메뉴를 이용하여 서비스 이용계약의 해지 신청을 할 수 있으며, 개인책방은 법령이 정하는 바에 따라 신속히 처리하겠습니다.{' '}
          </p>
          <p>다만, 거래사기 등의 부정이용 방지를 위해 거래를 진행중이거나 거래 관련 분쟁이 발생한 사용자는 이용계약 해지 및 서비스 탈퇴가 특정 기간 동안 제한될 수 있습니다. </p>
          <p>이용계약이 해지되면 법령 및 개인정보처리방침에 따라 사용자 정보를 보유하는 경우를 제외하고는 사용자 정보나 사용자가 작성한 게시물 등 모든 데이터는 삭제됩니다. </p>
          <p>
            다만, 사용자가 작성한 게시물이 제3자에 의하여 스크랩 또는 다른 공유 기능으로 게시되거나, 사용자가 제3자와의 채팅 등의 경우에는 다른 이용자의 정상적 서비스 이용을 위하여 필요한 범위 내에서
            서비스 내에 삭제되지 않고 남아 있게 됩니다.
          </p>
          <h2>책임제한</h2>
          <p>개인책방은 법령상 허용되는 한도 내에서 서비스와 관련하여 본 약관에 명시되지 않은 어떠한 구체적인 사항에 대한 약정이나 보증을 하지 않습니다. </p>
          <p>예를 들어, 개인책방은 서비스에 속한 콘텐츠, 서비스의 특정 기능, 서비스의 이용가능성에 대하여 어떠한 약정이나 보증을 하는 것이 아니며, 서비스를 있는 그대로 제공합니다.</p>
          <h2>손해배상</h2>
          <p>개인책방의 과실로 인하여 사용자가 손해를 입게 될 경우, 개인책방은 법령에 따라 사용자의 손해를 배상하겠습니다. </p>
          <p>다만, 개인책방은 다음과 같은 손해에 대해 책임을 부담하기 않습니다.</p>
          <ol>
            <li>서비스에 접속 또는 이용과정에서 발생하는 개인적인 손해</li>
            <li>제3자가 불법적으로 개인책방의 서버에 접속하거나 서버를 이용함으로써 발생하는 손해</li>
            <li>제3자가 개인책방 서버에 대한 전송 또는 개인책방 서버로부터의 전송을 방해함으로써 발생하는 손해</li>
            <li>제3자가 악성 프로그램을 전송 또는 유포함으로써 발생하는 손해</li>
            <li>전송된 데이터의 생략, 누락, 파괴 등으로 발생한 손해</li>
            <li>명예훼손 등 제3자가 서비스를 이용하는 과정에서 사용자에게 발생시킨 손해</li>
          </ol>
          <p>또한 개인책방은 법률상 허용되는 한도 내에서 간접 손해, 특별 손해, 결과적 손해, 징계적 손해, 및 징벌적 손해에 대한 책임을 부담하지 않습니다.</p>
          <h2>약관수정</h2>
          <p>개인책방은 법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로 본 약관이나 서비스 가이드, 개인정보 처리방침을 수정할 수 있습니다. </p>
          <p>본 약관이 변경되는 경우, 이메일로 약관 변경을 알리며, 변경된 약관은 게시한 날로부터 7일 후부터 효력이 발생합니다.</p>
          <p>개인책방은 변경된 약관을 게시한 날로부터 효력이 발생되는 날까지 약관변경에 대한 사용자의 의견을 기다리겠습니다. </p>
          <p>위 기간이 지나도록 사용자의 의견이 개인책방에 접수되지 않으면, 사용자가 변경된 약관에 따라 서비스를 이용하는 데에 동의하는 것으로 간주합니다.</p>
          <p>사용자가 변경된 약관에 동의하지 않는 경우, 변경된 약관의 적용을 받는 해당 서비스의 제공이 더 이상 불가능하게 됩니다.</p>
          <h2>사용자 의견</h2>
          <p>사용자는 언제든지 서비스 내 문의하기을 통해 의견을 개진할 수 있습니다. </p>
          <p>본 약관은 개인책방과 사용자와의 관계에 적용되며, 제3자의 수익권을 발생시키지 않습니다.</p>
          <p>사용자가 본 약관을 준수하지 않은 경우, 개인책방이 즉시 조치를 취하지 않더라도 개인책방이 가지고 있는 권리를 포기하는 것이 아닙니다.</p>
          <p>본 약관 중 일부 조항의 집행이 불가능하게 되더라도 다른 조항에는 영향을 미치지 않습니다.</p>
          <p>본 약관 또는 서비스와 관련하여서는 대한민국의 법률이 적용됩니다.</p>
          <ul>
            <li>공고일자: 2022년 7월 16일</li>
            <li>시행일자: 2022년 7월 16일</li>
          </ul>
        </ServiceBox>
      ),
    },
    {
      //고객 정보 처리 방침
      tabCont: (
        <CustomerBox>
          <p>
            "개인책방”은 "정보통신망 이용촉진 및 정보보호에 관한 법률", “개인정보보호법”, "통신비밀보호법", "전기통신사업법" 및 “전자상거래 등에서의 소비자 보호에 관한 법률” 등 정보통신서비스제공자가
            준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하겠습니다. 회사는 이용자의 개인정보를 [개인정보의
            수집목적]에서 고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로 이용자의 개인정보를 외부에 제공 또는 위탁하지 않습니다. 다만, 아래의 경우에는
            예외로 합니다.
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우(이용자가 사전에 동의한 경우란, 서비스 이용 등을 위하여 이용자가 자발적으로 자신의 개인정보를 제3자에게 제공하는 것에 동의하는 것을 의미합니다.)</li>
            <li>
              법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
              <br />
              이러한 경우에도, 회사는 이용자에게 (1) 개인정보를 제공받는 자 (2) 그의 이용목적 (3) 개인정보의 보유 및 이용기간을 사전에 고지하고 이에 대해 명시적·개별적으로 동의를 얻습니다. 이와 같은
              모든 과정에 있어서 회사는 이용자의 의사에 반하여 추가적인 정보를 수집하거나, 동의의 범위를 벗어난 정보를 제3자와 공유하지 않습니다.
            </li>
          </ul>
          <h4>개인정보의 처리목적, 수집 항목, 보유 및 이용 기간</h4>
          <p>개인책방은 아래와 같은 활용 목적을 가지고 이용자 개인정보를 수집합니다.</p>
          <table>
            <colgroup>
              <col width="18%" />
              <col width="32%" />
              <col width="18%" />
              <col width="32%" />
            </colgroup>
            <thead>
              <tr>
                <th>서비스</th>
                <th>수집 목적</th>
                <th>수집하는 목적</th>
                <th>보유 및 이용 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="3">회원가입 시</td>
                <td>서비스 이용을 위한 이용자 식별, 이용자 개별적 통지⋅고지, 서비스 이용 문의 및 분쟁해결, 잘못된 이용행위의 방지, 휴면 계정 전환 시 이용자 식별</td>
                <td>[필수] 이메일 </td>
                <td>부정거래 방지, 안전한 거래 환경 보장을 위하여 수집 시점으로부터 1년까지</td>
              </tr>
              <tr>
                <td>서비스의 기본 기능이나 특화된 기능을 제공</td>
                <td>[선택] 위치정보, 닉네임, 프로필 이미지 </td>
                <td>회원 탈퇴 시까지</td>
              </tr>
              <tr>
                <td>인구통계학적 특성에 따른 서비스 제공</td>
                <td>[선택] 연령대, 성별 </td>
                <td>회원 탈퇴 시까지</td>
              </tr>
              <tr>
                <td>개인책방 채팅 이용 시</td>
                <td>이용자 간 채팅 서비스 제공, 앱 내 분쟁 조정, 잘못된 이용행위의 방지</td>
                <td>앱 내 채팅 기능을 사용한 채팅 내용 </td>
                <td>부정거래 방지, 안전한 거래 환경 보장을 위하여 수집 시점으로부터 1년까지</td>
              </tr>
            </tbody>
          </table>
          <h4>서비스 이용 과정에서 이용자로부터 수집하는 개인정보</h4>
          <p>서비스 이용과정에서 아래와 같은 정보가 수집될 수 있습니다.</p>
          <ul>
            <li>이용자가 작성하는 게시물 기타 콘텐츠 등 정보, 사용하는 기능, 수행하는 행동이나 활동 시간, 빈도 및 기간 등의 개인정보</li>
            <li>PC웹, 모바일 웹/앱 이용 과정에서 단말기정보(OS, 화면사이즈, 디바이스 아이디), IP주소, 쿠키, 방문일시 등 자동으로 생성되는 정보</li>
          </ul>
          <h4>만 14세 미만 아동의 개인정보 처리에 관한 사항</h4>
          <p>회사는 법정대리인의 동의가 필요한 만14세 미만 아동에 대한 정보를 수집 및 이용하지 않습니다.</p>
          <h4>개인정보 처리 위탁</h4>
          <p>개인책방은 서비스의 원활한 제공을 위해 필요한 때에는 개인정보의 처리를 일부 위탁하고 있으며, 수탁 받은 업체가 관계 법령을 준수하도록 관리·감독하고 있습니다.</p>
          <table>
            <colgroup>
              <col width="38%" />
              <col width="17%" />
              <col width="45%" />
            </colgroup>
            <thead>
              <tr>
                <th>수탁업체</th>
                <th>위탁내용</th>
                <th>개인정보의 보유 및 이용기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Naver Cloud Platform</td>
                <td>정보저장</td>
                <td>회원탈퇴시 혹은 위탁계약 종료시까지</td>
              </tr>
            </tbody>
          </table>
          <h4>개인정보 보유기간, 파기방법 및 이용기간</h4>
          <p>
            이용자 개인정보는 이용자로부터 동의를 받은 수집 및 이용목적이 달성된 때에는 회사 내부 방침 또는 관계 법령에서 정한 일정한 기간 동안 보관한 다음 파기합니다. 종이에 출력된 개인정보는
            분쇄기로 분쇄하거나 소각을 통하여 파기하고, 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 개인책방이 내부 방침 또는 법령에 따라 보관하는
            개인정보 및 해당 법령은 아래 표와 같습니다. 또한 아래 기준과 별개로 회사는 1년간 서비스를 이용하지 않은 회원의 개인정보를 별도로 분리 보관 또는 삭제하고 있으며, 분리 보관된 개인정보는
            3년간 보관 후 지체없이 파기합니다. '이용목적이 달성된 때'란 철회요청, 서비스계약 만료, 탈퇴 시를 의미합니다.
          </p>
          <p>
            <br />
            가. 회사 내부 방침에 의한 정보보유 사유
          </p>
          <table>
            <colgroup>
              <col width="38%" />
              <col width="38%" />
              <col width="24%" />
            </colgroup>
            <thead>
              <tr>
                <th>보존 항목</th>
                <th>보존 이유</th>
                <th>보존 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>부정 이용 기록 (신고, 제재)</td>
                <td>부정 이용 방지</td>
                <td>3년</td>
              </tr>
              <tr>
                <td>채팅 내용</td>
                <td>거래 관련 사기 방지 및 분쟁 해결</td>
                <td>1년</td>
              </tr>
              <tr>
                <td>탈퇴한 이용자의 휴대전화번호</td>
                <td>부정 가입 및 이용 방지</td>
                <td>(탈퇴일로부터) 1년</td>
              </tr>
            </tbody>
          </table>
          <p>
            <br />
            나. 관련 법령에 의한 정보보유 사유
          </p>
          <table>
            <colgroup>
              <col width="40%" />
              <col width="40%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th>보존 항목</th>
                <th>근거 법령</th>
                <th>보존 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>소비자의 불만 또는 분쟁처리에 관한 기록</td>
                <td>전자상거래 등에서의 소비자보호에 관한 법률</td>
                <td>3년</td>
              </tr>
              <tr>
                <td>서비스 방문기록</td>
                <td>통신비밀보호법</td>
                <td>3개월</td>
              </tr>
            </tbody>
          </table>
          <h4>정보주체의 권리·의무 및 그 행사방법에 관한 사항</h4>
          <p>
            이용자(만 14세 미만인 경우 법정 대리인)는 언제든지 이용자 개인정보를 조회하거나 수정할 수 있으며 수집·이용에 대한 동의 철회 또는 가입 해지를 요청할 수도 있습니다. 서비스 내 설정 기능을
            통한 변경, 가입 해지(동의 철회)를 위해서는 서비스 내 각 기능을 클릭하면 되며, 운영자에게 이메일으로 문의할 경우도 지체 없이 조치하겠습니다.
          </p>
          <ul>
            <li>개인정보 조회 : 나의 책방 ▷ 프로필 편집</li>
            <li>개인정보 변경 : 나의 책방 ▷ 프로필 편집</li>
            <li>동의 철회 : 나의 책방 ▷ 설정 ▷ 탈퇴하기</li>
          </ul>
          <h4>인터넷 접속정보파일 등 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항</h4>
          <ul>
            <li>
              쿠키란?
              <br />
              웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에 보내는 아주 작은 텍스트 파일로서 이용자 컴퓨터에 저장됩니다.
            </li>
            <li>
              사용목적?
              <br />
              개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 수시로 불러오는 쿠키를 사용합니다. 이용자가 웹사이트에 방문할 경우 웹 사이트 서버는 이용자의 디바이스에 저장되어
              있는 쿠키의 내용을 읽어 이용자의 환경설정을 유지하고 맞춤화된 서비스를 제공하게 됩니다. 쿠키는 이용자가 웹 사이트를 방문할 때, 웹 사이트 사용을 설정한대로 접속하고 편리하게 사용할 수
              있도록 돕습니다. 또한, 이용자의 웹사이트 방문 기록, 이용 형태를 통해서 최적화된 광고 등 맞춤형 정보를 제공하기 위해 활용됩니다.
            </li>
            <li>
              쿠키 수집 거부
              <br />
              쿠키에는 이름, 전화번호 등 개인을 식별하는 정보를 저장하지 않으며, 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를
              허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수도 있습니다. 다만, 쿠키 설치를 거부할 경우 웹 사용이 불편해지며, 로그인이 필요한 일부 서비스 이용에 어려움이
              있을 수 있습니다.
            </li>
            <li>
              설정 방법의 예<br />
              Internet Explorer의 경우 웹 브라우저 상단의 도구 메뉴 ▷ 인터넷 옵션 ▷ 개인정보 ▷ 설정 Chrome의 경우 웹 브라우저 우측의 설정 메뉴 ▷ 화면 하단의 고급 설정 표시 ▷ 개인정보의 콘텐츠 설정
              버튼 ▷ 쿠키
            </li>
          </ul>
          <h4>개인정보의 안전성 확보 조치에 관한 사항</h4>
          <p> 회사는 「개인정보보호법」 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적, 관리적, 물리적 조치를 하고 있습니다.</p>
          <ul>
            <li>
              개인정보 취급자의 최소화 및 교육
              <br />
              개인정보를 처리하는 직원을 최소화 하며, 개인정보를 처리하는 모든 임직원들을 대상으로 개인정보보호 의무와 보안에 대한 정기적인 교육과 캠페인을 실시하고 있습니다.
            </li>
            <li>
              개인정보에 대한 접근 제한
              <br />
              개인정보를 처리하는 시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있습니다.
            </li>
          </ul>
          <h4>개인정보 문의처 및 개인정보 보호책임자</h4>
          <p>
            사용자가 서비스를 이용하면서 발생하는 모든 개인정보보호 관련 문의, 불만, 조언이나 기타 사항은 개인정보 보호책임자 및 담당부서로 연락해 주시기 바랍니다. 개인책방은 사용자 목소리에 귀
            기울이고 신속하고 충분한 답변을 드릴 수 있도록 최선을 다하겠습니다.
          </p>
          <ul>
            <li>이름: 이효정</li>
            <li>직위: 대표</li>
            <li>연락처: ddukddack@naver.com </li>
          </ul>
          <h4>정보주체의 권익침해에 대한 구제방법</h4>
          <p>정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다</p>
          <ul>
            <li>
              개인정보 침해신고센터 (한국인터넷진흥원 운영)
              <ul>
                <li>소관업무 : 개인정보 침해사실 신고, 상담 신청</li>
                <li>홈페이지 : privacy.kisa.or.kr</li>
                <li>전화 : (국번없이) 118</li>
                <li>주소 : 전라남도 나주시 진흥길 9 한국인터넷진흥원</li>
              </ul>
            </li>
            <li>
              개인정보 분쟁조정위원회
              <ul>
                <li>소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)</li>
                <li>홈페이지 : www.kopico.go.kr</li>
                <li>전화 : 1833-6972</li>
                <li>주소 : 서울특별시 종로구 세종대로 209 정부서울청사 12층</li>
              </ul>
            </li>
            <li>
              대검찰청 사이버수사과
              <ul>
                <li>(국번없이) 1301, privacy@spo.go.kr (http://www.spo.go.kr/)</li>
              </ul>
            </li>
            <li>
              경찰청 사이버수사국
              <ul>
                <li>(국번없이) 182 (http://ecrm.cyber.go.kr/)</li>
              </ul>
            </li>
          </ul>
          <p>
            <br />
            또한, 개인정보의 열람, 정정·삭제, 처리정지 등에 대한 정보주체자의 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익을 침해 받은 자는 행정심판법이 정하는 바에 따라
            행정심판을 청구할 수 있습니다.
          </p>
          <h4>고지의 의무</h4>
          <p>
            개인책방은 법률이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보처리방침을 수정할 수 있습니다. 개인정보처리방침이 변경되는 경우 개인책방은 변경 사항을 게시하며, 변경된
            개인정보처리방침은 게시한 날로부터 7일 후부터 효력이 발생합니다.
          </p>
          <ul>
            <li>공고일자: 2022년 7월 5일</li>
            <li>시행일자: 2022년 7월 5일</li>
          </ul>
        </CustomerBox>
      ),
    },
  ];

  return <ContentsBox>{tabContArr[contetnsIndex].tabCont}</ContentsBox>;
};

export default ContentsPage;