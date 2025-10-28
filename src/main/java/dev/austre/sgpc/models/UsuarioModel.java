package dev.austre.sgpc.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "usuarios")
public class UsuarioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;
    private String nombre;
    private String email;
    private String password;
    private String rol;

    @OneToMany(mappedBy = "autor")
    private List<ComentarioModel> comentarios;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private RolModel rolUsuario;
}