package dev.austre.sgpc.services;

import dev.austre.sgpc.models.TareaModel;
import java.util.List;
import java.util.Optional;

public interface TareaService {
    List<TareaModel> findAll();

    Optional<TareaModel> findById(Long id);

    TareaModel save(TareaModel tarea);

    void deleteById(Long id);
}
