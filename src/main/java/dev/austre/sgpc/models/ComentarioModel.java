package dev.austre.sgpc.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Data
@Entity
@Table(name = "comentarios")
public class ComentarioModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comentario;
    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "tarea_id")
    private TareaModel tarea;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private UsuarioModel autor;
}