package dev.austre.sgpc.controllers;

import dev.austre.sgpc.models.ComentarioModel;
import dev.austre.sgpc.services.ComentarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
@RequiredArgsConstructor
public class ComentarioController {
    private final ComentarioService comentarioService;

    @GetMapping
    public ResponseEntity<List<ComentarioModel>> getAll() {
        return ResponseEntity.ok(comentarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComentarioModel> getById(@PathVariable Long id) {
        return comentarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ComentarioModel> create(@RequestBody ComentarioModel comentario) {
        ComentarioModel saved = comentarioService.save(comentario);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComentarioModel> update(@PathVariable Long id, @RequestBody ComentarioModel comentario) {
        return comentarioService.findById(id).map(existing -> {
            comentario.setId(existing.getId());
            ComentarioModel updated = comentarioService.save(comentario);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        comentarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
