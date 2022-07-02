package com.ttukttak.book.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookDto;
import com.ttukttak.book.dto.BookRequest;
import com.ttukttak.book.dto.BookResponse;
import com.ttukttak.book.dto.BookUploadRequest;
import com.ttukttak.common.dto.PageResponse;

public interface BookService {

	List<BookCategoryDto> findAllBookCategory();

	PageResponse<BookResponse> findBookList(BookRequest bookRequest);

	Long bookSave(Long id, BookUploadRequest bookUploadRequest, List<MultipartFile> imageFiles);

	BookDto findById(Long bookId);

	Boolean isDelete(Long bookId);

}
