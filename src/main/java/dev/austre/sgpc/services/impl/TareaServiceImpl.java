package dev.austre.sgpc.services.impl;

import dev.austre.sgpc.models.TareaModel;
import dev.austre.sgpc.repositories.TareaRepository;
import dev.austre.sgpc.services.TareaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TareaServiceImpl implements TareaService {
    private final TareaRepository tareaRepository;

    @Override
    public List<TareaModel> findAll() {
        return tareaRepository.findAll();
    }

    @Override
    public Optional<TareaModel> findById(Long id) {
        return tareaRepository.findById(id);
    }

    @Override
    public TareaModel save(TareaModel tarea) {
        return tareaRepository.save(tarea);
    }

    @Override
    public void deleteById(Long id) {
        tareaRepository.deleteById(id);
    }
}
