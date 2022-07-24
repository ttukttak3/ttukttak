const showCategoryModal = () => {
  setTitle('카테고리');
  const categoryOnclickList = [];
  categoryList.map(item =>
    categoryOnclickList.push({
      onClick: () => {
        setCurrentCategory(item.id);
        setCurrentCategoryTitle(item.name);
        setShowModal(false);
      },
      message: item.name,
    }),
  );
  setContentList([...categoryOnclickList]);
  setShowModal(true);
};

const showBookGrade = () => {
  const gradeList = [];
  bookGradeList.map(item =>
    gradeList.push({
      onClick: () => {
        setBookGrade(item);
        setShowModal(false);
      },
      message: item,
    }),
  );
  setTitle('책 상태 등급');
  setContentList([...gradeList]);
  setShowModal(true);
};

const api = { showCategoryModal, showBookGrade };
export default api;
