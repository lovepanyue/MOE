// 搜索脚本
document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchForm = document.querySelector('.search-box form');
    const searchInput = document.querySelector('.search-box input[type="search"]');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // 获取URL中的搜索参数
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    if (searchQuery) {
        const searchTitle = document.querySelector('.page-header h1');
        if (searchTitle) {
            searchTitle.innerHTML = `搜索 "${searchQuery}"`;
        }
        
        // 在实际应用中，这里应该有AJAX请求或预加载的搜索数据
        // 这里只是模拟搜索结果
        console.log(`执行搜索: ${searchQuery}`);
    }
});