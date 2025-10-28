package dev.austre.sgpc.services.impl;

import dev.austre.sgpc.models.ComentarioModel;
import dev.austre.sgpc.repositories.ComentarioRepository;
import dev.austre.sgpc.services.ComentarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ComentarioServiceImpl implements ComentarioService {
    private final ComentarioRepository comentarioRepository;

    @Override
    public List<ComentarioModel> findAll() {
        return comentarioRepository.findAll();
    }

    @Override
    public Optional<ComentarioModel> findById(Long id) {
        return comentarioRepository.findById(id);
    }

    @Override
    public ComentarioModel save(ComentarioModel comentario) {
        return comentarioRepository.save(comentario);
    }

    @Override
    public void deleteById(Long id) {
        comentarioRepository.deleteById(id);
    }
}
