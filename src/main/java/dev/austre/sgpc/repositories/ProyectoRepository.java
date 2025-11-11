package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.austre.sgpc.models.ProyectoModel;

@Repository
public interface ProyectoRepository extends JpaRepository<ProyectoModel, Long> {
}
