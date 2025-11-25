package dev.austre.sgpc.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
@Table(name = "tareas")
public class TareaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descripcion;
    private Date fechaLimite;
    private String estatus;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "proyecto_id")
    private ProyectoModel proyecto;

    @OneToMany(mappedBy = "tarea", cascade = CascadeType.ALL)
    private List<ComentarioModel> comentarios;
}