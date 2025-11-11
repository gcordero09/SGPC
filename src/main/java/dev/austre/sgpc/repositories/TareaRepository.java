package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dev.austre.sgpc.models.TareaModel;

@Repository
public interface TareaRepository extends JpaRepository<TareaModel, Long> {
}
