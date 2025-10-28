package dev.austre.sgpc.services.impl;

import dev.austre.sgpc.models.RolModel;
import dev.austre.sgpc.repositories.RolRepository;
import dev.austre.sgpc.services.RolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RolServiceImpl implements RolService {
    private final RolRepository rolRepository;

    @Override
    public List<RolModel> findAll() {
        return rolRepository.findAll();
    }

    @Override
    public Optional<RolModel> findById(Long id) {
        return rolRepository.findById(id);
    }

    @Override
    public RolModel save(RolModel rol) {
        return rolRepository.save(rol);
    }

    @Override
    public void deleteById(Long id) {
        rolRepository.deleteById(id);
    }
}
