 document.addEventListener('DOMContentLoaded', function() {
            // =============================
            // Typing Animation
            // =============================
            const typingText = document.getElementById('typingText');
            const texts = [
                "Building the future of web...",
                "Creating amazing experiences...",
                "Crafting digital solutions..."
            ];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function typeText() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    typingText.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingText.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeText, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(typeText, 500);
                } else {
                    setTimeout(typeText, isDeleting ? 50 : 100);
                }
            }

            // Start typing animation
            setTimeout(typeText, 1000);

            // =============================
            // Mobile Menu Toggle
            // =============================
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navLinks = document.getElementById('navLinks');

            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });

            // =============================
            // Header Scroll Effect
            // =============================
            window.addEventListener('scroll', () => {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // =============================
            // Skill Category Selection
            // =============================
            const skillCards = document.querySelectorAll('.skill-category-card');
            const progressContainers = document.querySelectorAll('.skill-progress-container');
            
            skillCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Remove active class from all cards
                    skillCards.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked card
                    this.classList.add('active');
                    
                    // Show corresponding progress container
                    const category = this.dataset.category;
                    progressContainers.forEach(container => {
                        container.classList.remove('active');
                        if (container.id === `${category}-progress`) {
                            container.classList.add('active');
                        }
                    });
                });
            });

            // =============================
            // Animate Skill Levels
            // =============================
            const skillLevels = document.querySelectorAll('.skill-level');
            skillLevels.forEach(level => {
                level.addEventListener('mouseenter', function() {
                    this.style.transform = 'translate(-50%, -50%) scale(1.3)';
                });
                
                level.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });

            // =============================
            // Animate Progress Bars
            // =============================
            const progressBars = document.querySelectorAll('.progress-fill');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressFill = entry.target;
                        const width = progressFill.style.width;
                        progressFill.style.width = '0';
                        
                        setTimeout(() => {
                            progressFill.style.width = width;
                        }, 300);
                        
                        observer.unobserve(progressFill);
                    }
                });
            }, { threshold: 0.5 });

            progressBars.forEach(bar => observer.observe(bar));

            // =============================
            // Project Filtering
            // =============================
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    // Get filter value
                    const filterValue = btn.getAttribute('data-filter');
                    
                    // Show/hide projects
                    projectCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 100);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });

            // =============================
            // Timeline Scroll Animation
            // =============================
            const timelineItems = document.querySelectorAll('.timeline-item');
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            timelineItems.forEach(item => timelineObserver.observe(item));

            // =============================
            // Floating Orbs Animation
            // =============================
            const orbs = document.querySelectorAll('.orb');
            let mouseX = 0;
            let mouseY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX / window.innerWidth;
                mouseY = e.clientY / window.innerHeight;
                
                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 0.5;
                    const x = (mouseX * 20 * speed) - (10 * speed);
                    const y = (mouseY * 20 * speed) - (10 * speed);
                    
                    orb.style.transform = `translate(${x}px, ${y}px) scale(${1 + speed * 0.1})`;
                });
            });

            // =============================
            // Radar Animation
            // =============================
            const skillRadar = document.querySelector('.skill-radar');
            const radarObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const rings = document.querySelectorAll('.radar-ring');
                        rings.forEach((ring, index) => {
                            ring.style.animationDelay = `${index * 0.5}s`;
                            ring.style.animationPlayState = 'running';
                        });
                        
                        radarObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            radarObserver.observe(skillRadar);

            // =============================
            // Contact Form Submission
            // =============================
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                };
                
                // Show success animation
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalContent = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 3000);
                
                console.log('Form submitted:', formData);
            });

            // =============================
            // Smooth Scrolling for Anchor Links
            // =============================
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });

        // Animate timeline line on scroll
        const timelineLine = document.querySelector('.timeline-line');
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const sectionTop = document.querySelector('.experience').offsetTop;
            const sectionHeight = document.querySelector('.experience').offsetHeight;
            
            if (scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const progress = (scrollPosition - sectionTop) / sectionHeight;
                timelineLine.style.background = `linear-gradient(to bottom, 
                    var(--primary) ${progress * 100}%, 
                    transparent ${progress * 100}%)`;
            }
        });