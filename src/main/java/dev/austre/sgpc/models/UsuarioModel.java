package dev.austre.sgpc.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

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
    private Long rolId;

    @OneToMany(mappedBy = "autor")
    private List<ComentarioModel> comentarios;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "rolId", insertable = false, updatable = false)
    private RolModel rolUsuario;
}