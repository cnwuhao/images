function handleDownload() {
    const urlInput = document.getElementById('tiktok-url');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter a TikTok video URL');
        return;
    }
    
    // Send GA event
    gtag('event', 'download_attempt', {
        'event_category': 'User Interaction',
        'event_label': url
    });
    
    // 调用 Cloudflare Worker API
    fetch('/api/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            // 处理下载逻辑
            window.location.href = data.downloadUrl;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to process the video. Please try again.');
    });
    
    urlInput.value = '';
}
