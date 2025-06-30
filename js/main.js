// 主脚本文件
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNavigation = document.querySelector('.site-navigation');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            siteNavigation.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // 搜索框切换
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');
    const searchIcon = document.querySelector('.search-icon');
    
    if (searchToggle) {
        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            searchBox.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
                searchBox.classList.remove('active');
            }
        });
    }
    
    // 滚动效果 - 头部阴影
    window.addEventListener('scroll', function() {
        const siteHeader = document.querySelector('.site-header');
        if (window.scrollY > 20) {
            siteHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            siteHeader.style.boxShadow = 'none';
        }
    });
    
    // 分类菜单悬停效果
    const menuCategories = document.querySelector('.menu-categories');
    if (menuCategories) {
        menuCategories.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        menuCategories.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    }
    
    // 滚动动画
    const animatedElements = document.querySelectorAll('.post, .widget, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});