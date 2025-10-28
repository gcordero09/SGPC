package dev.austre.sgpc.services;

import dev.austre.sgpc.models.ProyectoModel;
import java.util.List;
import java.util.Optional;

public interface ProyectoService {
    List<ProyectoModel> findAll();

    Optional<ProyectoModel> findById(Long id);

    ProyectoModel save(ProyectoModel proyecto);

    void deleteById(Long id);
}
