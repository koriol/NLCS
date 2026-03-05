document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('header nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('active');
        });
    }

    // Optional: Close mobile menu when a link is clicked
    const navLinks = navUl.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submitBtn');
            const responseMessage = document.getElementById('responseMessage');
            const confirmationModal = document.getElementById('confirmationModal');
            const modalContent = confirmationModal.querySelector('div');
            const closeModalBtn = document.getElementById('closeModalBtn');
            const commentTextArea = document.getElementById('comment');
            const charCountSpan = document.getElementById('charCount');

            // Character count for comments
            commentTextArea.addEventListener('input', () => {
                charCountSpan.textContent = commentTextArea.value.length;
            });

            // Handle form submission
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                responseMessage.classList.add('hidden');

                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                try {
                    // The URL is changed back to a relative path.
                    // This will only work correctly when hosted on a web server.
                    // Accessing this file via 'file://' will result in a network error.
                    const response = await fetch('process_form.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });

                    const result = await response.json();

                    if (result.success) {
                        showModal();
                        form.reset();
                    } else {
                        responseMessage.classList.remove('hidden');
                        responseMessage.classList.remove('bg-green-100', 'text-green-800');
                        responseMessage.classList.add('bg-red-100', 'text-red-800');
                        responseMessage.textContent = result.message || 'An error occurred. Please try again.';
                    }
                } catch (error) {
                    responseMessage.classList.remove('hidden');
                    responseMessage.classList.remove('bg-green-100', 'text-green-800');
                    responseMessage.classList.add('bg-red-100', 'text-red-800');
                    responseMessage.textContent = 'Network error. Please try again later.';
                    console.error('Error:', error);
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit';
                }
            });

            // Show and hide modal
            const showModal = () => {
                confirmationModal.classList.remove('hidden');
                setTimeout(() => {
                    modalContent.classList.remove('scale-95', 'opacity-0');
                    modalContent.classList.add('scale-100', 'opacity-100');
                }, 10);
            };

            const hideModal = () => {
                modalContent.classList.remove('scale-100', 'opacity-100');
                modalContent.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    confirmationModal.classList.add('hidden');
                }, 300);
            };

            closeModalBtn.addEventListener('click', hideModal);

            // Hide modal if user clicks outside of it
            confirmationModal.addEventListener('click', (e) => {
                if (e.target === confirmationModal) {
                    hideModal();
                }
            });
        });