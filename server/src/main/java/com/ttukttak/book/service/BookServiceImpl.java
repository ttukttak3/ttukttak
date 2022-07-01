package com.ttukttak.book.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ttukttak.address.service.AddressService;
import com.ttukttak.book.dto.BookCategoryDto;
import com.ttukttak.book.dto.BookRequest;
import com.ttukttak.book.dto.BookResponse;
import com.ttukttak.book.entity.Book;
import com.ttukttak.book.entity.Book.DeleteStatus;
import com.ttukttak.book.repository.BookCategoryRepositroy;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.common.dto.PageResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
	private final BookCategoryRepositroy bookCategoryRepositroy;
	private final BookRepository bookRepository;

	private final AddressService addressService;

	private final ModelMapper modelMapper;

	private static int PAGESIZE = 20;

	@Override
	public List<BookCategoryDto> findAllBookCategory() {
		return bookCategoryRepositroy.findAll()
			.stream()
			.map(category -> modelMapper.map(category, BookCategoryDto.class))
			.collect(Collectors.toList());
	}

	@Override
	public PageResponse<BookResponse> findBookList(BookRequest bookRequest) {
		//페이징 선언
		PageRequest pageRequest = PageRequest.of(bookRequest.getPageNo() - 1, PAGESIZE,
			Sort.by(bookRequest.getOrder()).descending());

		//인근 지역 ID 가져오기
		List<Long> townIdList = addressService.getNearTown(bookRequest.getTownId(), 3)
			.stream()
			.map(c -> new Long(c.getId()))
			.collect(Collectors.toList());

		//페이징 결과 조회
		Page<Book> pageList = bookRepository.findByStatusAndIsDeleteAndTownIdIn(
			bookRequest.getStatus(),
			DeleteStatus.N,
			townIdList,
			pageRequest);

		//Entity -> Dto 변환
		List<BookResponse> bookResponses = pageList.getContent()
			.stream()
			.map(book -> new BookResponse(book))
			.collect(Collectors.toList());

		return PageResponse.<BookResponse>builder()
			.contents(bookResponses)
			.pageNumber(bookRequest.getPageNo())
			.pageSize(pageList.getSize())
			.totalPages(pageList.getTotalPages())
			.build();
	}

}
