package dev.austre.sgpc.services;

import dev.austre.sgpc.models.AdjuntoModel;
import java.util.List;
import java.util.Optional;

public interface AdjuntoService {
    List<AdjuntoModel> findAll();

    Optional<AdjuntoModel> findById(Long id);

    AdjuntoModel save(AdjuntoModel adjunto);

    void deleteById(Long id);
}
