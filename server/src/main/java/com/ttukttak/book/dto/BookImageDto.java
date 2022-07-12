package com.ttukttak.book.dto;

import com.ttukttak.book.entity.BookImage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookImageDto {
	private Long id;
	private String imageUrl;

	@Builder
	private BookImageDto(Long id, String imageUrl) {
		this.id = id;
		this.imageUrl = imageUrl;
	}

	public static BookImageDto from(BookImage bookImage) {
		return BookImageDto.builder()
			.id(bookImage.getId())
			.imageUrl(bookImage.getImageUrl())
			.build();
	}
}
