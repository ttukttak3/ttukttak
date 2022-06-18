package com.ttukttak.address.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ttukttak.address.dto.CoordinateRequest;
import com.ttukttak.address.dto.TownDto;
import com.ttukttak.address.service.AddressService;
import com.ttukttak.address.service.ReverseGeocoding;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AddressController {
	private final AddressService addressService;
	private final ReverseGeocoding reverseGeocoding;

	@GetMapping("/address/location")
	public ResponseEntity<?> location(CoordinateRequest cooreiCoordinateRequest) {

		TownDto townDto = reverseGeocoding.getLocation(cooreiCoordinateRequest);

		return ResponseEntity.status(HttpStatus.OK).body(townDto);
	}

}
