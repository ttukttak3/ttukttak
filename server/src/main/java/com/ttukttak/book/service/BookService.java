package com.ttukttak.book.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookDetailResponse;
import com.ttukttak.book.dto.BookDto;
import com.ttukttak.book.dto.BookRequest;
import com.ttukttak.book.dto.BookResponse;
import com.ttukttak.book.dto.BookUploadRequest;
import com.ttukttak.book.dto.MyBookResponse;
import com.ttukttak.book.entity.Book.BookGrade;
import com.ttukttak.book.entity.Book.BookStatus;
import com.ttukttak.common.dto.PageResponse;

public interface BookService {

	List<BookCategoryDto> findAllBookCategory();

	PageResponse<BookResponse> findBookList(BookRequest bookRequest);

	Long bookSave(Long id, BookUploadRequest bookUploadRequest, List<MultipartFile> imageFiles);

	BookDto findById(Long bookId);

	void removeBook(Long bookId);

	void updateStatus(Long bookId, BookStatus status);

	void updateGrade(Long bookId, BookGrade grade);

	BookDetailResponse findByIdDetail(Long bookId);

	void bookUpdate(Long bookId, BookUploadRequest bookUploadRequest, List<MultipartFile> imageFiles);

	PageResponse<MyBookResponse> getMyBookList(Long id, int pageNum);

	void updateHide(Long bookId);

}
