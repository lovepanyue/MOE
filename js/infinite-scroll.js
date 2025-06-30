// 无限滚动
document.addEventListener('DOMContentLoaded', function() {
    // 配置
    const container = document.querySelector('.site-main');
    const items = document.querySelectorAll('.post');
    const pagination = document.querySelector('.pagination');
    const loader = document.createElement('div');
    loader.className = 'infinite-scroll-loader';
    loader.innerHTML = '<div class="loader"></div><p>正在加载更多内容...</p>';
    
    // 只有文章列表页面启用无限滚动
    if (!container || !items.length || !pagination) return;
    
    // 隐藏传统分页
    pagination.style.display = 'none';
    
    // 添加加载指示器
    container.appendChild(loader);
    
    // 观察器配置
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 显示加载中
                loader.style.display = 'block';
                
                // 模拟加载延迟
                setTimeout(() => {
                    loadMorePosts();
                }, 1000);
            }
        });
    }, observerOptions);
    
    // 开始观察
    observer.observe(loader);
    
    // 加载更多文章
    function loadMorePosts() {
        // 在实际应用中，这里应该有AJAX请求
        // 这里只是模拟加载新内容
        
        // 创建新文章元素
        const newPost = document.createElement('article');
        newPost.className = 'post';
        newPost.innerHTML = `
            <a href="post.html" class="post-thumbnail">
                <img src="images/posts/new${Math.floor(Math.random() * 5) + 1}.jpg" alt="新文章">
            </a>
            <div class="post-content">
                <div class="post-category">新内容</div>
                <h3 class="post-title"><a href="post.html">新加载的文章标题</a></h3>
                <div class="post-meta">
                    <time datetime="${new Date().toISOString().split('T')[0]}">${new Date().toLocaleDateString()}</time>
                    <span>·</span>
                    <span>10 min read</span>
                </div>
                <p class="post-excerpt">这是通过无限滚动加载的新文章内容...</p>
                <a href="post.html" class="read-more">继续阅读</a>
            </div>
        `;
        
        // 在加载指示器前插入新内容
        container.insertBefore(newPost, loader);
        
        // 隐藏加载指示器
        loader.style.display = 'none';
        
        // 重新观察加载指示器
        observer.unobserve(loader);
        observer.observe(loader);
    }
});