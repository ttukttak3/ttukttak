package com.ttukttak.rent.service;

import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.rent.dto.RentRequest;
import com.ttukttak.rent.dto.RentResponse;

public interface RentService {
	PageResponse<RentResponse> getRentedList(Long ownerId, int pageNum);

	PageResponse<RentResponse> getBorrowedList(Long lenderId, int pageNum);

	RentResponse getRentById(Long rentId);

	RentResponse addRent(RentRequest request);

	RentResponse changeRentStatus(Long rentId);

}
