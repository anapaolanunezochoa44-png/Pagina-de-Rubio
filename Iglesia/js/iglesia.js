// Simple interactivity for feedback when editing
        document.querySelectorAll('[contenteditable="true"]').forEach(element => {
            element.addEventListener('focus', function() {
                this.classList.add('bg-yellow-50/50', 'rounded', 'p-1');
            });
            element.addEventListener('blur', function() {
                this.classList.remove('bg-yellow-50/50', 'rounded', 'p-1');
            });
        });