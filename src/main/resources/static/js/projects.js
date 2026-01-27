document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('projectGrid');

    // Determine API URL based on where the file is served from
    const API_BASE_URL = window.location.protocol === 'file:' || window.location.hostname === ''
        ? 'http://localhost:8080'
        : '';

    try {
        const response = await fetch(`${API_BASE_URL}/api/proyectos`);
        if (response.ok) {
            const projects = await response.json();
            renderProjects(projects);
        } else {
            grid.innerHTML = '<div class="empty-state">Error al cargar proyectos</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        grid.innerHTML = '<div class="empty-state">Error de conexión. Asegúrate de que el servidor esté corriendo.</div>';
    }

    function renderProjects(projects) {
        if (projects.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <p>No hay proyectos creados aún.</p>
                    <a href="proyectos.html" class="btn" style="width: auto; margin-top: 1rem; display: inline-block;">Crear el primero</a>
                </div>
            `;
            return;
        }

        grid.innerHTML = projects.map(project => `
            <div class="project-card" onclick="openProjectTasks(${project.id})" style="cursor: pointer;">
                <div class="project-header">
                    <div class="project-title">${escapeHtml(project.nombre)}</div>
                    <span class="project-status">${escapeHtml(project.estatus || 'N/A')}</span>
                </div>
                <p class="project-desc">${escapeHtml(project.descripcion || 'Sin descripción')}</p>
                <div class="project-meta">
                    <span>Inicio: ${formatDate(project.fechaInicio)}</span>
                    <span>Fin: ${formatDate(project.fechaFin)}</span>
                </div>
            </div>
        `).join('');
    }

    // --- Task Management Functions ---

    // --- Task Management Functions ---

    window.openProjectTasks = async function (projectId) {
        document.getElementById('currentProjectId').value = projectId;

        // Highlight selected project
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.borderColor = 'var(--glass-border)';
            card.style.boxShadow = 'none';
        });
        const selectedCard = document.querySelector(`div[onclick="openProjectTasks(${projectId})"]`);
        if (selectedCard) {
            selectedCard.style.borderColor = 'var(--primary-color)';
            selectedCard.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.3)';
        }

        // Show panel
        const panel = document.getElementById('projectTasksPanel');
        panel.style.display = 'block';

        // Fetch project details and tasks
        loadTasks(projectId);
    };

    async function loadTasks(projectId) {
        const container = document.getElementById('panelTaskList');
        container.innerHTML = '<div class="empty-state" style="padding: 2rem;">Cargando tareas...</div>';

        try {
            // Fetch project details which now includes tasks due to @JsonManagedReference
            const response = await fetch(`${API_BASE_URL}/api/proyectos/${projectId}`);
            if (response.ok) {
                const project = await response.json();

                // Update header info
                // Update header info
                document.getElementById('panelProjectTitle').textContent = project.nombre;

                const statusContainer = document.getElementById('panelProjectStatus');
                statusContainer.style.display = 'inline-block';
                statusContainer.innerHTML = `
                    <select onchange="updateProjectStatus(${project.id}, this.value)" class="status-select ${project.estatus === 'COMPLETADO' ? 'success' : ''}">
                        <option value="ACTIVO" ${project.estatus === 'ACTIVO' ? 'selected' : ''}>ACTIVO</option>
                        <option value="PENDIENTE" ${project.estatus === 'PENDIENTE' ? 'selected' : ''}>PENDIENTE</option>
                        <option value="COMPLETADO" ${project.estatus === 'COMPLETADO' ? 'selected' : ''}>COMPLETADO</option>
                        <option value="CANCELADO" ${project.estatus === 'CANCELADO' ? 'selected' : ''}>CANCELADO</option>
                    </select>
                `;

                // Render tasks from the project object
                if (project.tareas) {
                    renderTasks(project.tareas);
                } else {
                    renderTasks([]);
                }
            } else {
                container.innerHTML = '<div class="empty-state" style="padding: 2rem;">Error al cargar proyecto</div>';
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
            container.innerHTML = '<div class="empty-state" style="padding: 2rem;">Error de conexión</div>';
        }
    }

    function renderTasks(tasks) {
        const container = document.getElementById('panelTaskList');
        if (tasks.length === 0) {
            container.innerHTML = '<div class="empty-state" style="padding: 2rem;">No hay tareas en este proyecto</div>';
            return;
        }

        container.innerHTML = tasks.map(task => `
            <div class="task-item">
                <div class="task-info">
                    <h4>${escapeHtml(task.titulo)}</h4>
                    <div class="task-meta">Vence: ${formatDate(task.fechaLimite)}</div>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHtml(task.descripcion)}</p>
                </div>
                <select onchange="updateTaskStatus(${task.id}, this.value)" class="status-select sm ${task.estatus === 'COMPLETADO' ? 'success' : ''}">
                    <option value="PENDIENTE" ${task.estatus === 'PENDIENTE' ? 'selected' : ''}>PENDIENTE</option>
                    <option value="EN_PROGRESO" ${task.estatus === 'EN_PROGRESO' ? 'selected' : ''}>EN PROGRESO</option>
                    <option value="COMPLETADO" ${task.estatus === 'COMPLETADO' ? 'selected' : ''}>COMPLETADO</option>
                </select>
            </div>
        `).join('');
    }

    // --- Form Handlers ---

    document.getElementById('createTaskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const projectId = document.getElementById('currentProjectId').value;

        const data = {
            titulo: document.getElementById('newTaskTitle').value,
            descripcion: document.getElementById('newTaskDesc').value,
            fechaLimite: document.getElementById('newTaskDueDate').value,
            estatus: 'PENDIENTE',
            proyecto: { id: projectId }
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/tareas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Reset form and reload tasks
                document.getElementById('newTaskTitle').value = '';
                document.getElementById('newTaskDesc').value = '';
                // document.getElementById('newTaskDueDate').value = ''; // Flatpickr handling below
                const datePicker = document.querySelector("#newTaskDueDate")._flatpickr;
                if (datePicker) {
                    datePicker.clear();
                }
                toggleCreateTaskForm(); // Hide form
                loadTasks(projectId);
            } else {
                alert('Error al crear la tarea');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Error de conexión');
        }
    });

    // --- Helpers ---

    window.toggleCreateTaskForm = function () {
        const container = document.getElementById('createTaskContainer');
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
    };

    window.closeModal = function (id) {
        document.getElementById(id).classList.remove('show');
    };

    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        // Add timezone offset correction if necessary, but usually YYYY-MM-DD is parsed as UTC midnight
        // and displayed in local time, which might shift it back a day.
        // For simplicity and to match commonly expected "database date", let's treat it as UTC components.
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    return `${day}/${month}/${year}`;
}

    // --- Status Updates ---

    window.updateProjectStatus = async function (projectId, newStatus) {
        try {
            // Fetch current project data first to avoid overwriting other fields
            const getResponse = await fetch(`${API_BASE_URL}/api/proyectos/${projectId}`);
            if (!getResponse.ok) throw new Error('Failed to fetch project');
            const project = await getResponse.json();

            project.estatus = newStatus;

            const updateResponse = await fetch(`${API_BASE_URL}/api/proyectos/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
            });

            if (updateResponse.ok) {
                // Determine API URL (re-declared here or accessible from closure if renderProjects is refreshed)
                // Ideally reload projects grid if visible, but we are in the panel.
                // Maybe just show notification?
                // Reloading everything to be safe and update UI colors if needed
                const gridResponse = await fetch(`${API_BASE_URL}/api/proyectos`);
                if (gridResponse.ok) renderProjects(await gridResponse.json());
            } else {
                alert('Error al actualizar estado del proyecto');
            }
        } catch (error) {
            console.error('Error updating project status:', error);
            alert('Error al actualizar estado');
        }
    };

window.updateTaskStatus = async function (taskId, newStatus) {
    try {
        const getResponse = await fetch(`${API_BASE_URL}/api/tareas/${taskId}`);
        if (!getResponse.ok) throw new Error('Failed to fetch task');
        const task = await getResponse.json();

        task.estatus = newStatus;

        const updateResponse = await fetch(`${API_BASE_URL}/api/tareas/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        if (updateResponse.ok) {
            // Refresh tasks panel
            const currentProjectId = document.getElementById('currentProjectId').value;
            if (currentProjectId) loadTasks(currentProjectId);
        } else {
            alert('Error al actualizar estado de la tarea');
        }
    } catch (error) {
        console.error('Error updating task status:', error);
        alert('Error al actualizar estado');
    }
};

// Initialize Flatpickr for Task creation
flatpickr("#newTaskDueDate", {
    locale: "es",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d/m/Y",
    allowInput: true
});
});
