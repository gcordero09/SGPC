package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.austre.sgpc.models.AdjuntoModel;

@Repository
public interface AdjuntoRepository extends JpaRepository<AdjuntoModel, Long> {
}
