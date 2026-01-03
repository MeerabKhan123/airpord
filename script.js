      window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .spec-item, .testimonial').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
        
        // --- Modal/Prompt Type Script Logic ---
        const modal = document.getElementById('order-modal');
        const heroBuyBtn = document.getElementById('hero-buy-btn');
        const ctaOrderBtn = document.getElementById('cta-order-btn');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalCheckoutBtn = document.getElementById('modal-checkout-btn'); // NEW
        const loadingScreen = document.getElementById('loading-screen'); // NEW

        function openModal() {
            modal.classList.add('visible');
        }

        function closeModal() {
            modal.classList.remove('visible');
        }

        // NEW: Function to simulate Checkout Process
        function startCheckout() {
            closeModal();
            loadingScreen.classList.add('visible');
            
            // Simulate a delay for processing (e.g., 3 seconds)
            setTimeout(() => {
                loadingScreen.classList.remove('visible');
                alert("🎉 Success! Redirecting to Payment Gateway...");
                // In a real application, you would redirect here: 
                // window.location.href = '/checkout/payment';
            }, 3000); 
        }

        // Attach the openModal function to both initial 'Buy Now' buttons
        heroBuyBtn.addEventListener('click', openModal);
        ctaOrderBtn.addEventListener('click', openModal);

        // Attach the closeModal function to the 'Continue Browsing' button
        modalCloseBtn.addEventListener('click', closeModal);
        
        // Attach the startCheckout function to the 'Proceed to Checkout' button
        modalCheckoutBtn.addEventListener('click', startCheckout); // NEW

        // Close modal on outside click (Advanced Aesthetic Touch)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    