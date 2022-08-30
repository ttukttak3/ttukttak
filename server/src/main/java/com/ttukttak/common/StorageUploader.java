package com.ttukttak.common;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ttukttak.common.dto.FileUploadResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class StorageUploader {

	private final AmazonS3 amazonS3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	public FileUploadResponse upload(MultipartFile multipartFile, String dirName) throws IOException {

		File uploadFile = convert(multipartFile)
			.orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

		return upload(uploadFile, dirName);
	}

	//기존 Storage 파일 제거.
	public void removeOldFile(String imageUrl) {
		try {
			String storageUrl = "https://" + bucket + ".kr.object.ncloudstorage.com/";
			if (imageUrl == null) {
				log.info("기존 이미지가 없습니다.");
			} else if (imageUrl.indexOf(storageUrl) > -1) {
				String objectName = imageUrl.replace(storageUrl, "");
				amazonS3Client.deleteObject(bucket, objectName);
			} else {
				log.info("ncloudsotrage에 있는 파일이 아닙니다.");
			}

		} catch (AmazonS3Exception e) {
			e.printStackTrace();
		} catch (SdkClientException e) {
			e.printStackTrace();
		}
	}

	private FileUploadResponse upload(File uploadFile, String dirName) {
		String originFilename = uploadFile.getName();
		String extName = originFilename.substring(originFilename.lastIndexOf("."), originFilename.length());
		String uploadFileName = getSavefileName(extName);
		String fileName = dirName + "/" + uploadFileName;
		String uploadImageUrl = putS3(uploadFile, fileName);
		removeNewFile(uploadFile);

		return new FileUploadResponse(originFilename, uploadImageUrl);
	}

	private String putS3(File uploadFile, String fileName) {
		amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
			CannedAccessControlList.PublicRead));
		return amazonS3Client.getUrl(bucket, fileName).toString();
	}

	private void removeNewFile(File targetFile) {
		if (targetFile.delete()) {
			log.info("파일이 삭제되었습니다.");
		} else {
			log.info("파일이 삭제되지 못했습니다.");
		}
	}

	private Optional<File> convert(MultipartFile file) throws IOException {
		File convertFile = new File(file.getOriginalFilename());
		if (convertFile.createNewFile()) {
			try (FileOutputStream fos = new FileOutputStream(convertFile)) {
				fos.write(file.getBytes());
			}
			return Optional.of(convertFile);
		}

		return Optional.empty();
	}

	//저장 파일명 유니크한 값으로 변경
	private String getSavefileName(String extName) {
		String fileName = "";

		Calendar calendar = Calendar.getInstance();
		fileName += calendar.get(Calendar.YEAR);
		fileName += calendar.get(Calendar.MONTH);
		fileName += calendar.get(Calendar.DATE);
		fileName += calendar.get(Calendar.HOUR);
		fileName += calendar.get(Calendar.MINUTE);
		fileName += calendar.get(Calendar.SECOND);
		fileName += calendar.get(Calendar.MILLISECOND);
		fileName += extName;

		return fileName;
	}

}
