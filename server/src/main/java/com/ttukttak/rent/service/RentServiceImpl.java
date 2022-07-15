package com.ttukttak.rent.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ttukttak.book.repository.BookRepository;
import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.common.exception.DuplicatedException;
import com.ttukttak.oauth.repository.UserRepository;
import com.ttukttak.rent.dto.RentRequest;
import com.ttukttak.rent.dto.RentResponse;
import com.ttukttak.rent.entity.Rent;
import com.ttukttak.rent.repository.RentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RentServiceImpl implements RentService {
	private final static int PAGE_SIZE = 20;
	private final RentRepository rentRepository;
	private final BookRepository bookRepository;
	private final UserRepository userRepository;

	@Override
	public PageResponse<RentResponse> getRentedList(Long ownerId, int pageNum) {
		Pageable pageable = PageRequest.of(pageNum, PAGE_SIZE);

		Page<RentResponse> pageInfo = rentRepository
			.findAllByOwnerIdAndIsReturnFalseOrderByBeginDateAsc(ownerId, pageable)
			.map(RentResponse::from);

		return PageResponse.<RentResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.build();
	}

	@Override
	public PageResponse<RentResponse> getBorrowedList(Long lenderId, int pageNum) {
		Pageable pageable = PageRequest.of(pageNum, PAGE_SIZE);

		Page<RentResponse> pageInfo = rentRepository
			.findAllByLenderIdAndIsReturnFalseOrderByBeginDateAsc(lenderId, pageable)
			.map(RentResponse::from);

		return PageResponse.<RentResponse>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.build();
	}

	@Override
	public RentResponse getRentById(Long rentId) {
		return rentRepository.findById(rentId)
			.map(RentResponse::from)
			.orElseThrow(() -> new IllegalArgumentException());
	}

	@Override
	public RentResponse addRent(RentRequest request) {
		bookRepository.findById(request.getBookId()).orElseThrow(() -> new IllegalArgumentException());
		userRepository.findById(request.getLenderId()).orElseThrow(() -> new IllegalArgumentException());

		Rent findRent = rentRepository.findByBookIdAndLenderId(request.getBookId(), request.getLenderId()).orElse(null);

		if (findRent != null && findRent.getReturnDate() != null) {
			throw new DuplicatedException();
		}

		Rent rent = rentRepository.save(Rent.from(request));

		return RentResponse.from(rent);
	}

	@Override
	public RentResponse changeRentStatus(Long rentId) {
		// TODO: 반납하는 주체가 맞는지 확인 필요

		Rent rent = rentRepository.findById(rentId).orElseThrow(() -> new IllegalArgumentException());
		rent.returnBook();

		rentRepository.save(rent);

		return RentResponse.from(rent);
	}
}
