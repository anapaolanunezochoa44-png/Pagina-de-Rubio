const modal = document.getElementById('modal');
        const modalContent = document.getElementById('modal-content');
        const modalTitulo = document.getElementById('modal-titulo');
        const modalTexto = document.getElementById('modal-texto');
        
        const toast = document.getElementById('toast');
        const toastTexto = document.getElementById('toast-texto');

        function abrirModal(titulo, texto) {
            modalTitulo.innerText = titulo;
            modalTexto.innerText = texto;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            setTimeout(() => {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }, 10);
        }

        function cerrarModal() {
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
            }, 150);
        }

        function mostrarInfoSimple(elemento, descripcion) {
            toastTexto.innerHTML = `<strong>${elemento}:</strong> ${descripcion}`;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 4000);
        }

        // Cerrar modal haciendo clic fuera del contenido
        window.onclick = function(event) {
            if (event.target == modal) {
                cerrarModal();
            }
        }