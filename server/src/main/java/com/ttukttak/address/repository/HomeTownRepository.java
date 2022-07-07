package com.ttukttak.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttukttak.address.entity.HomeTown;
import com.ttukttak.address.entity.HomeTown.UseStatusType;

public interface HomeTownRepository extends JpaRepository<HomeTown, Long> {

	HomeTown getByUserId(Long id);

	HomeTown findByUserIdAndUseStatus(Long id, UseStatusType y);

}
