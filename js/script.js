// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-bs-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }

    // Toggle theme on switch change
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // 3D Logo Animation
    const canvas = document.getElementById('logoCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
        
    // Create animated 3D text
    const textGeometry = new THREE.TextGeometry('S', {
        size: 3,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5
    });
            
    const textMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x007bff,
        specular: 0x555555,
        shininess: 30 
    });
            
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);
            
    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        textMesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
        
    animate();

    // Footer Logo Animation
    const footerCanvas = document.getElementById('footerLogoCanvas');
    if (footerCanvas) {
        const footerRenderer = new THREE.WebGLRenderer({ canvas: footerCanvas, alpha: true });
        const footerScene = new THREE.Scene();
        const footerCamera = new THREE.PerspectiveCamera(75, footerCanvas.width / footerCanvas.height, 0.1, 1000);
        
        // Create animated 3D text for footer
        const footerTextGeometry = new THREE.TextGeometry('S', {
            size: 2,
            height: 0.5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.025,
            bevelOffset: 0,
            bevelSegments: 5
        });
                
        const footerTextMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf77518, // Using the accent color
            specular: 0x555555,
            shininess: 30 
        });
                
        const footerTextMesh = new THREE.Mesh(footerTextGeometry, footerTextMaterial);
        footerScene.add(footerTextMesh);
                
        // Add lighting to footer logo
        const footerLight = new THREE.DirectionalLight(0xffffff, 1);
        footerLight.position.set(5, 5, 5);
        footerScene.add(footerLight);
        footerScene.add(new THREE.AmbientLight(0x404040));

        footerCamera.position.z = 4;

        // Footer logo animation loop
        function animateFooterLogo() {
            requestAnimationFrame(animateFooterLogo);
            footerTextMesh.rotation.y += 0.01;
            footerRenderer.render(footerScene, footerCamera);
        }
            
        animateFooterLogo();

        // Handle footer logo resize
        window.addEventListener('resize', () => {
            const width = footerCanvas.clientWidth;
            const height = footerCanvas.clientHeight;
            if (footerCanvas.width !== width || footerCanvas.height !== height) {
                footerRenderer.setSize(width, height, false);
                footerCamera.aspect = width / height;
                footerCamera.updateProjectionMatrix();
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
    }
    });

    // Typing Animation
    const typedTextSpan = document.querySelector('.typed-text');
    const texts = ['Full Stack Developer', 'Engineer', 'Problem Solver','Frontend Developer','Backend Developer','Quick Learner'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Wait at complete word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500); // Wait before typing next word
            } else {
                setTimeout(type, isDeleting ? 100 : 200);
            }
        }

    // Start the typing animation
        type();

    // Section Title Animation
    const sectionTitles = document.querySelectorAll('.section-title');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const titleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
    }
        });
    }, observerOptions);

    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });

    // Add particles to hero section
    function createParticles() {
    const hero = document.querySelector('.hero');
        const numberOfParticles = 50;

        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float-particle ${duration}s linear infinite`;
            
            // Random delay
            particle.style.animationDelay = -Math.random() * duration + 's';
            
            hero.appendChild(particle);
        }
    }

    // Call the function when the page loads
    document.addEventListener('DOMContentLoaded', createParticles);

    // Initialize recommendations
    initializeRecommendations();
    setupRatingSystem();

    // Setup keyboard shortcut for developer mode (Shift + Q)
    document.addEventListener('keydown', function(event) {
        if (event.shiftKey && event.key.toLowerCase() === 'q') {
            const newDevMode = localStorage.getItem('devMode') !== 'true';
            localStorage.setItem('devMode', newDevMode);
            showNotification(
                newDevMode 
                    ? '🔓 Developer Mode Activated' 
                    : '🔒 Developer Mode Deactivated',
                'info'
            );
            loadRecommendations();
        }
    });

    // Footer Newsletter Form
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Here you would typically send this to your backend
                // For now, we'll just show a success message
                showNewsletterMessage('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNewsletterMessage('Please enter a valid email address.', 'error');
            }
        });
    }

    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formStatus = document.getElementById('formStatus');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            try {
                // Disable submit button and show loading state
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Get form data
                const formData = new FormData(contactForm);
                
                // Send form data to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    formStatus.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
                    contactForm.reset();
                } else {
                    // Show error message
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                // Show error message
                formStatus.innerHTML = '<div class="alert alert-danger">Failed to send message. Please try again.</div>';
            } finally {
                // Re-enable submit button and restore original text
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Clear status message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }
        });
    }
});

function initializeRecommendations() {
    loadRecommendations();
    const modal = document.getElementById('recommendationModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', resetForm);
    }
}

function setupRatingSystem() {
    const ratingStars = document.querySelectorAll('.rating-input i');
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            updateStars(rating, 'hover');
        });

        star.addEventListener('mouseout', function() {
            const currentRating = document.getElementById('rating').value;
            updateStars(currentRating, 'active');
        });

        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            document.getElementById('rating').value = rating;
            updateStars(rating, 'active');
        });
    });
}

function updateStars(rating, action) {
    const stars = document.querySelectorAll('.rating-input i');
    stars.forEach(star => {
        const starRating = star.dataset.rating;
        star.className = starRating <= rating 
            ? (action === 'hover' ? 'fas fa-star text-warning' : 'fas fa-star active')
            : 'far fa-star';
    });
}

function openRecommendationModal() {
    const modal = new bootstrap.Modal(document.getElementById('recommendationModal'));
    modal.show();
}

function submitRecommendation() {
    const form = document.getElementById('recommendationForm');
    const formData = {
        id: form.dataset.editId || Date.now(),
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        company: document.getElementById('company').value,
        text: document.getElementById('recommendationText').value,
        rating: document.getElementById('rating').value,
        date: new Date().toISOString()
    };

    if (!validateForm(formData)) return;

    saveRecommendation(formData);
    const modal = bootstrap.Modal.getInstance(document.getElementById('recommendationModal'));
    modal.hide();
    showNotification('Recommendation submitted successfully!');
    resetForm();
    loadRecommendations();
}

function validateForm(data) {
    if (!data.name || !data.position || !data.company || !data.text || !data.rating || data.rating === '0') {
        showNotification('Please fill in all fields and provide a rating.', 'error');
        return false;
    }
    return true;
}

function saveRecommendation(recommendation) {
    let recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
    const index = recommendations.findIndex(r => r.id === recommendation.id);
    
    if (index !== -1) {
        recommendations[index] = recommendation;
    } else {
        recommendations.push(recommendation);
    }
    
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
}

function loadRecommendations() {
    const container = document.getElementById('recommendationsContainer');
    let recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
    const isDevMode = localStorage.getItem('devMode') === 'true';

    // Filter out any invalid recommendations
    recommendations = recommendations.filter(rec => 
        rec && rec.name && rec.position && rec.company && rec.text && rec.rating
    );
    
    // Save the filtered recommendations back to localStorage
    localStorage.setItem('recommendations', JSON.stringify(recommendations));

    if (!container) return;

    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted my-5">
                <i class="fas fa-quote-right fa-3x mb-3" style="color: var(--light-accent);"></i>
                <p class="lead">Share your experience and be the first to recommend!</p>
                <p class="small text-muted">Your feedback helps others learn about our work.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = recommendations.map((rec, index) => `
        <div class="recommendation-card" data-aos="fade-${index % 2 === 0 ? 'right' : 'left'}">
            <div class="recommendation-content">
                ${isDevMode ? `
                    <div class="dev-controls">
                        <button class="btn btn-sm btn-outline-primary" onclick="editRecommendation(${rec.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteRecommendation(${rec.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                ` : ''}
                <div class="rating-display mb-3">
                    ${Array(5).fill(0).map((_, i) => `
                        <i class="${i < rec.rating ? 'fas' : 'far'} fa-star" style="color: #ffc107;"></i>
                    `).join('')}
                </div>
                <p class="recommendation-text mb-4">
                    <i class="fas fa-quote-left me-2" style="color: var(--light-accent); opacity: 0.7;"></i>
                    ${rec.text}
                    <i class="fas fa-quote-right ms-2" style="color: var(--light-accent); opacity: 0.7;"></i>
                </p>
                <div class="recommender-info">
                    <h5 class="mb-1" style="color: var(--light-accent);">${rec.name}</h5>
                    <p class="mb-0 fw-bold" style="color: var(--light-text);">${rec.position}</p>
                    <small class="text-muted">${rec.company}</small>
                </div>
            </div>
        </div>
    `).join('');
}

function editRecommendation(id) {
    // Check if developer mode is active
    const isDevMode = localStorage.getItem('devMode') === 'true';
    if (!isDevMode) {
        showNotification('Edit access denied. Developer mode required.', 'warning');
        return;
    }

    const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
    const recommendation = recommendations.find(r => r.id === parseInt(id));
    
    if (!recommendation) return;

    const form = document.getElementById('recommendationForm');
    form.dataset.editId = id;
    
    document.getElementById('name').value = recommendation.name;
    document.getElementById('position').value = recommendation.position;
    document.getElementById('company').value = recommendation.company;
    document.getElementById('recommendationText').value = recommendation.text;
    document.getElementById('rating').value = recommendation.rating;
    
    updateStars(recommendation.rating, 'active');
    
    const modal = new bootstrap.Modal(document.getElementById('recommendationModal'));
    modal.show();
}

function deleteRecommendation(id) {
    if (!confirm('Are you sure you want to delete this recommendation?')) return;
    
    let recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
    recommendations = recommendations.filter(r => r.id !== parseInt(id));
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
    
    loadRecommendations();
    showNotification('Recommendation deleted successfully.');
}

function resetForm() {
    const form = document.getElementById('recommendationForm');
    if (form) {
        form.reset();
        form.dataset.editId = '';
        document.getElementById('rating').value = '0';
        updateStars(0, 'active');
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed bottom-0 end-0 m-3`;
    notification.style.zIndex = '1050';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show newsletter message
function showNewsletterMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.querySelector('.footer-newsletter form');
    const existingMessage = form.querySelector('.newsletter-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    form.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Smooth scroll for footer links
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});