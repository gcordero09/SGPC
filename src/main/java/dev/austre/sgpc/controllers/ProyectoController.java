package dev.austre.sgpc.controllers;

import dev.austre.sgpc.models.ProyectoModel;
import dev.austre.sgpc.services.ProyectoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
@RequiredArgsConstructor
public class ProyectoController {
    private final ProyectoService proyectoService;

    @GetMapping
    public ResponseEntity<List<ProyectoModel>> getAll() {
        return ResponseEntity.ok(proyectoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProyectoModel> getById(@PathVariable Long id) {
        return proyectoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProyectoModel> create(@RequestBody ProyectoModel proyecto) {
        ProyectoModel saved = proyectoService.save(proyecto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProyectoModel> update(@PathVariable Long id, @RequestBody ProyectoModel proyecto) {
        return proyectoService.findById(id).map(existing -> {
            proyecto.setId(existing.getId());
            ProyectoModel updated = proyectoService.save(proyecto);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        proyectoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
