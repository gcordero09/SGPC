package dev.austre.sgpc.services.impl;

import dev.austre.sgpc.models.ProyectoModel;
import dev.austre.sgpc.repositories.ProyectoRepository;
import dev.austre.sgpc.services.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProyectoServiceImpl implements ProyectoService {
    private final ProyectoRepository proyectoRepository;

    @Override
    public List<ProyectoModel> findAll() {
        return proyectoRepository.findAll();
    }

    @Override
    public Optional<ProyectoModel> findById(Long id) {
        return proyectoRepository.findById(id);
    }

    @Override
    public ProyectoModel save(ProyectoModel proyecto) {
        return proyectoRepository.save(proyecto);
    }

    @Override
    public void deleteById(Long id) {
        proyectoRepository.deleteById(id);
    }
}
