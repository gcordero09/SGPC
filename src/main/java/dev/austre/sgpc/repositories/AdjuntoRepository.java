package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.austre.sgpc.models.AdjuntoModel;

public interface AdjuntoRepository extends JpaRepository<AdjuntoModel, Long> {
}
