package dev.austre.sgpc.services;

import dev.austre.sgpc.models.RolModel;
import java.util.List;
import java.util.Optional;

public interface RolService {
    List<RolModel> findAll();

    Optional<RolModel> findById(Long id);

    RolModel save(RolModel rol);

    void deleteById(Long id);
}
