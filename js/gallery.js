// 画廊脚本
document.addEventListener('DOMContentLoaded', function() {
    // 画廊筛选
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // 更新激活状态
            galleryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // 获取筛选器
            const filterValue = this.getAttribute('data-filter');
            
            // 筛选项目
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 灯箱功能
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // 收集所有画廊图片
    const galleryImages = [];
    document.querySelectorAll('.gallery-item').forEach(item => {
        const img = item.querySelector('img');
        galleryImages.push({
            src: img.src,
            title: img.alt,
            category: item.getAttribute('data-category')
        });
    });
    
    let currentIndex = 0;
    
    // 打开灯箱
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = img.alt;
            lightbox.classList.add('active');
            document.body.classList.add('no-scroll');
            currentIndex = index;
        });
    });
    
    // 关闭灯箱
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    // 导航功能
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    });
    
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        updateLightbox();
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightbox();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateLightbox();
        } else if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
    
    function updateLightbox() {
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = galleryImages[currentIndex].src;
            lightboxCaption.textContent = galleryImages[currentIndex].title;
            lightboxImg.style.opacity = 1;
        }, 300);
    }
});