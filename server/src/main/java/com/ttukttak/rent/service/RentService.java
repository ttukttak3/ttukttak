package com.ttukttak.rent.service;

import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.rent.dto.CreateRentRequest;
import com.ttukttak.rent.dto.ExtendResponse;
import com.ttukttak.rent.dto.RentResponse;

public interface RentService {
	PageResponse<RentResponse> getRentedList(Long ownerId, int pageNum);

	PageResponse<RentResponse> getBorrowedList(Long lenderId, int pageNum);

	RentResponse getRentById(Long rentId);

	RentResponse addRent(CreateRentRequest request, Long userId);

	RentResponse changeRentStatus(Long rentId, Long userId);

	ExtendResponse addExtend(Long rentId, Long userId);

}
