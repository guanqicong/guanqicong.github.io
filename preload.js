// 预加载优化脚本 - 插入到 index.html 的 <head> 中
const PRELOAD_CONFIG = {
  // 关键资源优先加载
  critical: [
    'assets/img_0.jpg',      // 游戏背景
    'assets/img_3.webp',     // 新郎精灵图
    'assets/img_4.webp'      // 新娘精灵图
  ],
  // 视频按需加载
  videos: {
    start: 'assets/start.mp4',
    select: 'assets/select.mp4',
    map: 'assets/map.mp4',
    thanks: 'assets/thanks.mp4'
  }
};

// 资源加载器
class ResourceLoader {
  constructor() {
    this.loaded = 0;
    this.total = 0;
    this.resources = {};
  }

  async loadImages(urls) {
    this.total = urls.length;
    const promises = urls.map(url => this.loadImage(url));
    return Promise.all(promises);
  }

  loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loaded++;
        this.updateProgress();
        this.resources[url] = img;
        resolve(img);
      };
      img.onerror = () => {
        this.loaded++;
        this.updateProgress();
        resolve(null); // 不阻塞
      };
      img.src = url;
    });
  }

  async preloadVideo(url, silent = false) {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata'; // 只加载元数据，不加载全部内容
      video.onloadedmetadata = () => {
        if (!silent) {
          this.loaded++;
          this.updateProgress();
        }
        resolve(video);
      };
      video.onerror = () => resolve(null);
      video.src = url;
    });
  }

  updateProgress() {
    const tip = document.getElementById('loadTip');
    if (tip) {
      tip.textContent = `加载中 ${this.loaded}/${this.total}`;
    }
  }
}

// 提前初始化
window.resourceLoader = new ResourceLoader();