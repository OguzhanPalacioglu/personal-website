// Loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.classList.add('hidden');
    }
  }, 800);
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Existing functionality
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved) {
  root.setAttribute('data-theme', saved);
}

const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

const dlPdfBtn = document.getElementById('dlPdf');
if (dlPdfBtn) {
  dlPdfBtn.addEventListener('click', (e) => {
    // Open CV PDF page in new tab
    window.open('cv-pdf.html', '_blank');
  });
}

// Profile photo loading
const profileImg = document.getElementById('profileImg');
const photoPlaceholder = document.getElementById('photoPlaceholder');

if (profileImg && photoPlaceholder) {
  console.log('Profile image and placeholder found');
  
  // Force CSS sizing
  function enforcePhotoSize() {
    const photoContainer = profileImg.parentElement;
    if (photoContainer) {
      // Force container size based on screen width
      const screenWidth = window.innerWidth;
      let targetSize = 140; // Default desktop size
      
      if (screenWidth <= 360) targetSize = 60;
      else if (screenWidth <= 480) targetSize = 70;
      else if (screenWidth <= 768) targetSize = 80;
      else if (screenWidth <= 880) targetSize = 90;
      
      photoContainer.style.width = targetSize + 'px';
      photoContainer.style.height = targetSize + 'px';
      
      // Force image sizing
      profileImg.style.width = '100%';
      profileImg.style.height = '100%';
      profileImg.style.objectFit = 'cover';
      profileImg.style.objectPosition = 'center';
      
      console.log('Enforced photo size:', targetSize + 'px');
    }
  }
  
  // Simple load handler
  profileImg.onload = function() {
    console.log('Image loaded successfully!');
    photoPlaceholder.style.display = 'none';
    enforcePhotoSize();
  };
  
  profileImg.onerror = function() {
    console.log('Image failed to load');
    photoPlaceholder.style.display = 'flex';
  };
  
  // Check if already loaded
  if (profileImg.complete && profileImg.naturalWidth > 0) {
    console.log('Image already loaded');
    photoPlaceholder.style.display = 'none';
    enforcePhotoSize();
  }
  
  // Enforce size on window resize
  window.addEventListener('resize', enforcePhotoSize);
  
  // Initial enforcement
  setTimeout(enforcePhotoSize, 100);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});



const btn = document.getElementById('mode-toggle');

btn.addEventListener('click', () => {
    document.body.classList.toggle('terminal-mode');
    
    if (document.body.classList.contains('terminal-mode')) {
        btn.innerText = "🌐 GUI Mode";
    } else {
        btn.innerText = "📟 CLI Mode";
    }
});
