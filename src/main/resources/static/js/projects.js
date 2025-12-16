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
                document.getElementById('panelProjectTitle').textContent = project.nombre;
                const statusSpan = document.getElementById('panelProjectStatus');
                statusSpan.textContent = project.estatus;
                statusSpan.style.display = 'inline-block';

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
                <span class="project-status" style="font-size: 0.7rem;">${escapeHtml(task.estatus)}</span>
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
                document.getElementById('newTaskDueDate').value = '';
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
        return new Date(dateString).toLocaleDateString();
    }
});
