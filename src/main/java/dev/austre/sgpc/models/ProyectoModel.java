package dev.austre.sgpc.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "proyectos")
public class ProyectoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private Date fechaInicio;
    private Date fechaFin;
    private String estatus;

    @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL)
    private List<TareaModel> tareas;
}