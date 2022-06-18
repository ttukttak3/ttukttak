package com.ttukttak.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FileUploadResponse {

	String fileName;
	String url;

}
