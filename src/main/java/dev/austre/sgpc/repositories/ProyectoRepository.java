package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.austre.sgpc.models.ProyectoModel;

public interface ProyectoRepository extends JpaRepository<ProyectoModel, Long> {
}
