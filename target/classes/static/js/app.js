document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createProjectForm');

    // Set default dates
    const today = new Date().toISOString().split('T')[0];

    // Initialize Flatpickr
    flatpickr("#fechaInicio", {
        locale: "es",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        defaultDate: today,
        allowInput: true
    });

    flatpickr("#fechaFin", {
        locale: "es",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        allowInput: true
    });

    // document.getElementById('fechaInicio').value = today; // Handled by defaultDate

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Creando...';
        submitBtn.disabled = true;

        const formData = {
            nombre: document.getElementById('nombre').value,
            descripcion: document.getElementById('descripcion').value,
            fechaInicio: document.getElementById('fechaInicio').value,
            fechaFin: document.getElementById('fechaFin').value,
            estatus: document.getElementById('estatus').value
        };

        // Determine API URL based on where the file is served from
        const API_BASE_URL = window.location.protocol === 'file:' || window.location.hostname === ''
            ? 'http://localhost:8080'
            : '';

        try {
            const response = await fetch(`${API_BASE_URL}/api/proyectos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                showNotification('Proyecto creado exitosamente', 'success');
                form.reset();
                // Reset date to today after reset
                form.reset();
                // Reset date to today after reset (re-init or update flatpickr if needed, but form reset clears inputs)
                // Flatpickr instances need to be cleared or reset manually if not bound to form reset entirely
                const fechaInicioInstance = document.querySelector("#fechaInicio")._flatpickr;
                if (fechaInicioInstance) {
                    fechaInicioInstance.setDate(today);
                }
                const fechaFinInstance = document.querySelector("#fechaFin")._flatpickr;
                if (fechaFinInstance) {
                    fechaFinInstance.clear();
                }
            } else {
                showNotification('Error al crear el proyecto', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error de conexión', 'error');
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const messageEl = document.getElementById('notificationMessage');
    const iconEl = document.getElementById('notificationIcon');

    notification.className = `notification ${type}`;
    messageEl.textContent = message;
    iconEl.textContent = type === 'success' ? '✓' : '✕';

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
