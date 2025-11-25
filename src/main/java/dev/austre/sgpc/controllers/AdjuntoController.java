package dev.austre.sgpc.controllers;

import dev.austre.sgpc.models.AdjuntoModel;
import dev.austre.sgpc.services.AdjuntoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adjuntos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AdjuntoController {
    private final AdjuntoService adjuntoService;

    @GetMapping
    public ResponseEntity<List<AdjuntoModel>> getAll() {
        return ResponseEntity.ok(adjuntoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdjuntoModel> getById(@PathVariable Long id) {
        return adjuntoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<AdjuntoModel> create(@RequestBody AdjuntoModel adjunto) {
        AdjuntoModel saved = adjuntoService.save(adjunto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdjuntoModel> update(@PathVariable Long id, @RequestBody AdjuntoModel adjunto) {
        return adjuntoService.findById(id).map(existing -> {
            adjunto.setIdAdjunto(existing.getIdAdjunto());
            AdjuntoModel updated = adjuntoService.save(adjunto);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        adjuntoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
