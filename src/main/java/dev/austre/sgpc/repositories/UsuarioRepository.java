package dev.austre.sgpc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import dev.austre.sgpc.models.UsuarioModel;

public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {
}
