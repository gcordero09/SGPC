package dev.austre.sgpc.services.impl;

import dev.austre.sgpc.models.UsuarioModel;
import dev.austre.sgpc.repositories.UsuarioRepository;
import dev.austre.sgpc.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioServiceImpl implements UsuarioService {
    private final UsuarioRepository usuarioRepository;

    @Override
    public List<UsuarioModel> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<UsuarioModel> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public UsuarioModel save(UsuarioModel usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }
}
