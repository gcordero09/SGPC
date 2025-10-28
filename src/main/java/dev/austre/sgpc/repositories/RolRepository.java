package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.austre.sgpc.models.RolModel;

public interface RolRepository extends JpaRepository<RolModel, Long> {
}
