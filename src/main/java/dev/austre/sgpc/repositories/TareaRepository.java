package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.austre.sgpc.models.TareaModel;

public interface TareaRepository extends JpaRepository<TareaModel, Long> {
}
