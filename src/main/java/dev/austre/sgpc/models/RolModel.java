package dev.austre.sgpc.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "roles")
public class RolModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRol;
    private String nombre;

    @OneToMany(mappedBy = "rolUsuario")
    private List<UsuarioModel> usuarios;
}