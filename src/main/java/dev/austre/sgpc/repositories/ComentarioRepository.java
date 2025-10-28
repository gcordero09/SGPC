package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.austre.sgpc.models.ComentarioModel;

public interface ComentarioRepository extends JpaRepository<ComentarioModel, Long> {
}
