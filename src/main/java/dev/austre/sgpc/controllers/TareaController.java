package dev.austre.sgpc.controllers;

import dev.austre.sgpc.models.TareaModel;
import dev.austre.sgpc.services.TareaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TareaController {
    private final TareaService tareaService;

    @GetMapping
    public ResponseEntity<List<TareaModel>> getAll() {
        return ResponseEntity.ok(tareaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TareaModel> getById(@PathVariable Long id) {
        return tareaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TareaModel> create(@RequestBody TareaModel tarea) {
        TareaModel saved = tareaService.save(tarea);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TareaModel> update(@PathVariable Long id, @RequestBody TareaModel tarea) {
        return tareaService.findById(id).map(existing -> {
            tarea.setId(existing.getId());
            TareaModel updated = tareaService.save(tarea);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tareaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
