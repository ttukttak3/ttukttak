package com.ttukttak.rent.service;

import com.ttukttak.common.dto.PageResponse;
import com.ttukttak.rent.dto.RentCard;

public interface RentService {
	PageResponse<RentCard> getRentedList(Long ownerId, int pageNum);

	PageResponse<RentCard> getBorrowedList(Long lenderId, int pageNum);

}
