package dev.austre.sgpc.services;

import dev.austre.sgpc.models.UsuarioModel;
import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    List<UsuarioModel> findAll();

    Optional<UsuarioModel> findById(Long id);

    UsuarioModel save(UsuarioModel usuario);

    void deleteById(Long id);
}
