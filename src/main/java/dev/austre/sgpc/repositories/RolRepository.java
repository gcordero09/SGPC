package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.austre.sgpc.models.RolModel;

@Repository
public interface RolRepository extends JpaRepository<RolModel, Long> {
}
