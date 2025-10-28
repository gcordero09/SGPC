package dev.austre.sgpc.services.impl;

import dev.austre.sgpc.models.AdjuntoModel;
import dev.austre.sgpc.repositories.AdjuntoRepository;
import dev.austre.sgpc.services.AdjuntoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AdjuntoServiceImpl implements AdjuntoService {
    private final AdjuntoRepository adjuntoRepository;

    @Override
    public List<AdjuntoModel> findAll() {
        return adjuntoRepository.findAll();
    }

    @Override
    public Optional<AdjuntoModel> findById(Long id) {
        return adjuntoRepository.findById(id);
    }

    @Override
    public AdjuntoModel save(AdjuntoModel adjunto) {
        return adjuntoRepository.save(adjunto);
    }

    @Override
    public void deleteById(Long id) {
        adjuntoRepository.deleteById(id);
    }
}
