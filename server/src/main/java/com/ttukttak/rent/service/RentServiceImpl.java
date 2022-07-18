package com.ttukttak.rent.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ttukttak.book.entity.Book;
import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.common.exception.DuplicatedException;
import com.ttukttak.common.exception.UnauthChangeException;
import com.ttukttak.oauth.entity.User;
import com.ttukttak.oauth.repository.UserRepository;
import com.ttukttak.rent.dto.CreateRentRequest;
import com.ttukttak.rent.dto.ExtendResponse;
import com.ttukttak.rent.dto.RentResponse;
import com.ttukttak.rent.entity.Extend;
import com.ttukttak.rent.entity.Rent;
import com.ttukttak.rent.repository.ExtendRepository;
import com.ttukttak.rent.repository.RentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RentServiceImpl implements RentService {
	private final static int PAGE_SIZE = 20;
	private final RentRepository rentRepository;
	private final ExtendRepository extendRepository;
	private final BookRepository bookRepository;
	private final UserRepository userRepository;

	@Override
	@Transactional(readOnly = true)
	public PageResponse<RentResponse> getRentedList(Long ownerId, int pageNum) {
		Pageable pageable = PageRequest.of(pageNum, PAGE_SIZE);

		Page<RentResponse> pageInfo = rentRepository
			.findAllByOwnerIdAndReturnDateIsNullOrderByBeginDateAsc(ownerId, pageable)
			.map(RentResponse::from);

		return PageResponse.<RentResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements((int)pageInfo.getTotalElements())
			.build();
	}

	@Override
	@Transactional(readOnly = true)
	public PageResponse<RentResponse> getBorrowedList(Long lenderId, int pageNum) {
		Pageable pageable = PageRequest.of(pageNum, PAGE_SIZE);

		Page<RentResponse> pageInfo = rentRepository
			.findAllByLenderIdAndReturnDateIsNullOrderByBeginDateAsc(lenderId, pageable)
			.map(RentResponse::from);

		return PageResponse.<RentResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.totalElements((int)pageInfo.getTotalElements())
			.build();
	}

	@Override
	@Transactional(readOnly = true)
	public RentResponse getRentById(Long rentId) {
		return rentRepository.findById(rentId)
			.map(RentResponse::from)
			.orElseThrow(() -> new IllegalArgumentException());
	}

	@Override
	public RentResponse addRent(CreateRentRequest request, Long userId) {
		Book book = bookRepository.findById(request.getBookId()).orElseThrow(() -> new IllegalArgumentException());
		User lender = userRepository.findById(request.getLenderId()).orElseThrow(() -> new IllegalArgumentException());

		if (checkUnauthRequest(book, userId)) {
			throw new UnauthChangeException();
		}

		Rent findRent = rentRepository.findByBookIdAndLenderId(request.getBookId(), request.getLenderId()).orElse(null);

		if (findRent != null && findRent.getReturnDate() != null) {
			throw new DuplicatedException();
		}

		Rent rent = rentRepository.save(Rent.builder().book(book).lender(lender).build());

		return RentResponse.from(rent);
	}

	@Override
	public RentResponse changeRentStatus(Long rentId, Long userId) {
		Rent rent = rentRepository.findById(rentId).orElseThrow(() -> new IllegalArgumentException());

		if (checkUnauthRequest(rent.getBook(), userId)) {
			throw new UnauthChangeException();
		}
		rent.returnBook();

		rentRepository.save(rent);

		return RentResponse.from(rent);
	}

	@Override
	public ExtendResponse addExtend(Long rentId, Long userId) {
		Rent rent = rentRepository.findById(rentId).orElseThrow(() -> new IllegalArgumentException());

		// TODO: 커스텀예외
		if (rent.getExtendList().size() >= 2) {
			throw new IllegalArgumentException();
		}

		if (checkUnauthRequest(rent.getBook(), userId)) {
			throw new UnauthChangeException();
		}

		Extend extend = Extend.builder().rent(rent).build();
		extendRepository.save(extend);

		return ExtendResponse.from(extend);
	}

	private boolean checkUnauthRequest(Book book, Long userId) {
		User owner = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException());

		return book.getOwner().getId() != owner.getId();
	}
}
