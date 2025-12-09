// Create sparkles effect
function createSparkles() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 10 + 's';
        sparkle.style.animationDuration = (Math.random() * 5 + 8) + 's';
        fragment.appendChild(sparkle);
    }
    document.body.appendChild(fragment);
}

// Initialize sparkles
document.addEventListener('DOMContentLoaded', () => {
    createSparkles();
});

// Cursor trail effect with requestAnimationFrame for better performance
const trail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 10;
    mouseY = e.clientY - 10;
});

function animateTrail() {
    // Use linear interpolation for smooth movement
    trailX += (mouseX - trailX) / 8;
    trailY += (mouseY - trailY) / 8;
    
    trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
    requestAnimationFrame(animateTrail);
}

// Start the animation loop
animateTrail();

// Teapot pet interaction
let messageTimeout;
const messageEl = document.getElementById('teapotMessage');

function showTeapotMessage(msg, x, y) {
    messageEl.textContent = msg;
    messageEl.style.transform = `translate3d(${x + 10}px, ${y - 60}px, 0)`;
    messageEl.classList.add('show');
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        messageEl.classList.remove('show');
    }, 2000);
}

const teapot = document.getElementById('teapotPet');
let isDragging = false;
let hasDragged = false;
let currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Use passive event listeners for better scroll performance
    teapot.addEventListener('mousedown', dragStart, {passive: true});
    teapot.addEventListener('touchstart', dragStart, {passive: true});
    document.addEventListener('mousemove', drag, {passive: true});
    document.addEventListener('touchmove', drag, {passive: true});
    document.addEventListener('mouseup', dragEnd, {passive: true});
    document.addEventListener('touchend', dragEnd, {passive: true});
    
    // Show initial message after a delay
    setTimeout(() => {
        const rect = teapot.getBoundingClientRect();
        const messages = [
            "Protecting your site",
            "Scanning for threats",
            "Bot detection active",
            "Security protocols engaged",
            "Monitoring network",
            "System secure"
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        showTeapotMessage(randomMsg, rect.left + rect.width / 2, rect.top);
    }, 2000);
});

function dragStart(e) {
    if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    if (e.target === teapot || teapot.contains(e.target)) {
        isDragging = true;
        teapot.classList.add('dragging');
        teapot.classList.add('pouring');
        setTimeout(() => {
            teapot.classList.remove('pouring');
        }, 1500);
        const rect = teapot.getBoundingClientRect();
        const randomMsg = dragMessages[Math.floor(Math.random() * dragMessages.length)];
        showTeapotMessage(randomMsg, rect.left + rect.width / 2, rect.top);
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        hasDragged = true;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, teapot);
    }
}

function dragEnd(e) {
    if (isDragging) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
        teapot.classList.remove('dragging');
        setTimeout(() => {
            const rect = teapot.getBoundingClientRect();
            showTeapotMessage("Protection restored", rect.left + rect.width / 2, rect.top);
        }, 200);
    }
}

function setTranslate(xPos, yPos, el) {
    // Use transform3d for hardware acceleration
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Tab switching in info modal
function switchTab(event, tabName) {
    // Handle case where event is not properly passed
    if (!event || !event.target) {
        console.error('Invalid event passed to switchTab');
        return;
    }
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Update the tab click handlers to pass the event parameter
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            switchTab(this.getAttribute('data-tab'), e);
        });
    });
});

// Modal controls
function openSocials() {
    document.getElementById('socialsModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSocials() {
    document.getElementById('socialsModal').classList.remove('active');
    document.body.style.overflow = '';
}

function openInfo() {
    document.getElementById('infoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInfo() {
    document.getElementById('infoModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Download functionality
function downloadFile() {
    showToast('Initializing security protocols...');
    setTimeout(() => {
        const downloadUrl = 'https://cdn.discordapp.com/attachments/1428256192458919967/1432070718576787476/NOT_FINISHED.txt?ex=68ffb749&is=68fe65c9&hm=1f8f81d3881ba86b99578d9b88d4e70db7e9ccfe0f832ee24f32c3a6cfa28f2a&';
        window.location.href = downloadUrl;
    }, 500);
}


// Close modals with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSocials();
        closeInfo();
    }
}, {passive: true});

// Close modals when clicking outside content
window.onclick = function(event) {
    if (event.target.id === 'socialsModal') closeSocials();
    if (event.target.id === 'infoModal') closeInfo();
}