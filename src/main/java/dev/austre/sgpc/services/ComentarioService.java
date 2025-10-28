package dev.austre.sgpc.services;

import dev.austre.sgpc.models.ComentarioModel;
import java.util.List;
import java.util.Optional;

public interface ComentarioService {
    List<ComentarioModel> findAll();

    Optional<ComentarioModel> findById(Long id);

    ComentarioModel save(ComentarioModel comentario);

    void deleteById(Long id);
}
