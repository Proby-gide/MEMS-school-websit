document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle menu open/close
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Apply fixed/static position
            if (navMenu.classList.contains('active')) {
                navbar.style.position = 'fixed';
                document.body.style.overflow = 'hidden'; // Optional: prevent background scroll
            } else {
                navbar.style.position = 'static';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when any nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            navbar.style.position = 'static';
            document.body.style.overflow = 'auto'; // Re-enable background scroll
        });
    });
});


// Contact Form Validation
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim()
            };

            // Validate form
            let isValid = true;

            // Name validation
            if (formData.name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters long');
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Phone validation
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
                showError('phoneError', 'Please enter a valid 10-digit phone number');
                isValid = false;
            }

            // Subject validation
            if (!formData.subject) {
                showError('subjectError', 'Please select a subject');
                isValid = false;
            }

            // Message validation
            if (formData.message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                document.getElementById('formSuccess').style.display = 'block';
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function () {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Gallery Filtering
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });
});

// Lightbox Functionality
let currentImageIndex = 0;
let visibleImages = [];

function openLightbox(imageId) {
    const lightbox = document.getElementById('lightbox');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    // Get all visible gallery items
    visibleImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));

    // Find current image index
    const currentItem = document.querySelector(`[onclick="openLightbox('${imageId}')"]`).closest('.gallery-item');
    currentImageIndex = visibleImages.indexOf(currentItem);

    // Set image data
    const imageData = getImageData(imageId);
    lightboxTitle.textContent = imageData.title;
    lightboxDescription.textContent = imageData.description;

    // Show lightbox
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    updateLightboxImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const currentItem = visibleImages[currentImageIndex];
    const imageButton = currentItem.querySelector('.view-btn');
    const onclick = imageButton.getAttribute('onclick');
    const imageId = onclick.match(/'([^']+)'/)[1];

    const imageData = getImageData(imageId);
    document.getElementById('lightbox-title').textContent = imageData.title;
    document.getElementById('lightbox-description').textContent = imageData.description;
}

function getImageData(imageId) {
    const imageMap = {
        'school-building': { title: 'School Building', description: 'Main school building with modern architecture' },
        'campus-entrance': { title: 'Campus Entrance', description: 'Welcoming entrance to our school' },
        'school-garden': { title: 'School Garden', description: 'Beautiful garden area for students' },
        'primary-classroom': { title: 'Primary Classroom', description: 'Well-equipped primary classroom' },
        'smart-classroom': { title: 'Smart Classroom', description: 'Interactive smart classroom with digital boards' },
        'science-lab': { title: 'Science Laboratory', description: 'Well-equipped science lab for experiments' },
        'annual-day': { title: 'Annual Day Celebration', description: 'Students performing during annual day' },
        'independence-day': { title: 'Independence Day', description: 'Independence Day celebration at school' },
        'prize-distribution': { title: 'Prize Distribution', description: 'Students receiving awards and prizes' },
        'sports-day': { title: 'Sports Day', description: 'Annual sports day celebrations' },
        'volleyball-match': { title: 'Volleyball Match', description: 'Students playing volleyball' },
        'sports-winners': { title: 'Sports Winners', description: 'Winners of various sports competitions' },
        'art-craft': { title: 'Art & Craft', description: 'Students engaged in art and craft activities' },
        'music-class': { title: 'Music Class', description: 'Students learning music and instruments' },
        'library-session': { title: 'Library Session', description: 'Students reading in the library' }
    };

    return imageMap[imageId] || { title: 'Image', description: 'Image description' };
}

// Close lightbox with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Close lightbox when clicking outside
document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});

// News & Events Tab Functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Show/hide tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
});

// Download File Functionality
function downloadFile(fileName) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `downloads/${fileName}`;
    link.download = fileName;

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show download notification
    showNotification(`Starting download of ${fileName}...`);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth Scrolling for Internal Links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function () {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;

    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollButton.addEventListener('mouseenter', function () {
        this.style.background = '#2980b9';
        this.style.transform = 'translateY(-5px)';
    });

    scrollButton.addEventListener('mouseleave', function () {
        this.style.background = '#3498db';
        this.style.transform = 'translateY(0)';
    });
});

// Animate on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.info-card, .link-card, .facility-card, .achievement-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations on scroll
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.info-card, .link-card, .facility-card, .achievement-card');

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Form Input Enhancements
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');

            // Add validation styling
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
});


// Search Functionality (if needed)
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();

            if (query.length > 2) {
                performSearch(query);
            } else {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
            }
        });
    }
}

function performSearch(query) {
    // This would typically search through page content
    // For now, we'll just show a placeholder
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = `
        <div class="search-result">
            <h3>Search Results for "${query}"</h3>
            <p>Search functionality would be implemented here.</p>
        </div>
    `;
    searchResults.style.display = 'block';
}

// Print Functionality
function printPage() {
    window.print();
}

// Share Functionality
function shareLink(platform, url, title) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
    };

    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function () {
    console.log('Shree Malatesh English Medium School Website Loaded');

    // Initialize search if elements exist
    initializeSearch();

    // Add any additional initialization here
});
window.addEventListener('pageshow', function () {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        overlay.remove(); // Optional but better to fully remove
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero');

    const images = [
        'images/school_photo.jpeg',
        'images/studentsInClassRoom.jpeg',
        'images/studentsInClassRoom1.jpeg',
        'images/WhatsApp Image 2025-07-12 at 10.18.47 AM.jpeg'
    ];

    let currentIndex = 0;

    function changeHeroBackground() {
        if (heroSection) {
            heroSection.style.background = `url('${images[currentIndex]}') no-repeat center center / cover`;
            currentIndex = (currentIndex + 1) % images.length;
        }
    }

    // Initial load
    changeHeroBackground();

    // Change every 5 seconds
    setInterval(changeHeroBackground, 5000);
});
