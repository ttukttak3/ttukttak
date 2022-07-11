package com.ttukttak.rent.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.rent.dto.RentCard;
import com.ttukttak.rent.repository.RentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RentServiceImpl implements RentService {
	private final static int PAGE_SIZE = 20;
	private final RentRepository rentRepository;

	@Override
	public PageResponse<RentCard> getRentedList(Long ownerId, int pageNum) {
		Pageable pageable = PageRequest.of(pageNum, PAGE_SIZE);

		Page<RentCard> pageInfo = rentRepository
			.findAllByOwnerIdAndIsReturnFalseOrderByBeginDateAsc(ownerId, pageable)
			.map(RentCard::from);

		return PageResponse.<RentCard>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.build();
	}

	@Override
	public PageResponse<RentCard> getBorrowedList(Long lenderId, int pageNum) {
		Pageable pageable = PageRequest.of(pageNum, PAGE_SIZE);

		Page<RentCard> pageInfo = rentRepository
			.findAllByLenderIdAndIsReturnFalseOrderByBeginDateAsc(lenderId, pageable)
			.map(RentCard::from);

		return PageResponse.<RentCard>builder()
			.contents(pageInfo.getContent())
			.pageNumber(pageInfo.getNumber())
			.pageSize(pageInfo.getSize())
			.totalPages(pageInfo.getTotalPages())
			.build();
	}
}
