package dev.austre.sgpc.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "adjuntos")
public class AdjuntoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdjunto;
    private String nombre;
    private String tipo;
    private String url;

    @ManyToOne
    @JoinColumn(name = "subido_por_id")
    private UsuarioModel subidoPor;
}