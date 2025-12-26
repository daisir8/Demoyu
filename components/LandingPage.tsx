import React, { useState, useRef } from 'react';
import { Terminal, Code, FileText, EyeOff, Shield, Coffee, ChevronRight, Zap, ExternalLink, Keyboard, Globe, X, Heart, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

type LangType = 'zh' | 'en';

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [lang, setLang] = useState<LangType>('zh');
  const [showDonate, setShowDonate] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const scrollToVideo = () => {
    document.getElementById('demo-video')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
    
    // 自动播放视频
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 500);
  };

  const content = {
    zh: {
      nav: {
        github: 'GitHub',
        launch: '启动 Demoyu'
      },
      hero: {
        tag: 'v1.2.0 防风控模式已上线',
        titleMain: '表面努力工作？',
        titleSub: '实则疯狂摸鱼。',
        desc: '呆摸鱼 伪装成 VS Code 和 Word 的沉浸式阅读神器。在老板眼皮底下看小说、刷网页，不仅安全，而且看起来非常"专业"。就算你没有摸鱼需求，打字式阅读亦成为当今阅读新风向，体验交互感极强的阅读方式。',
        startBtn: '立即开始摸鱼',
        demoBtn: '查看演示视频',
        codeComment: '// 你看到的是代码，我看到的是屠龙少年。',
        typingMode: '打字模式已激活：随意敲击键盘来阅读'
      },
      features: {
        title: '将"隐身"做到极致',
        subtitle: '专为职场生存设计的高级伪装功能。',
        cards: [
          { title: 'VS Code 完美伪装', desc: '像素级复刻 VS Code 界面。语法高亮的颜色其实是你的小说内容。' },
          { title: 'Word 文档模式', desc: '看起来像一份枯燥的年度报告，读起来却是惊心动魄的小说。适合非技术岗。' },
          { title: '沉浸式打字阅读', desc: '别光盯着屏幕看。随意敲击键盘来推动小说进度，让你的双手看起来很忙碌。' },
          { title: '老板键 (Space)', desc: '紧急情况？按下空格键瞬间隐藏所有内容，显示极其复杂的企业级伪造代码。' },
          { title: '防拦截浏览器', desc: '内置防风控弹窗技术，突破 Bilibili 或阅读网站的 iframe 限制。' },
          { title: '本地文件解析', desc: '支持 PDF 和 TXT 文件拖拽读取。所有解析在本地完成，绝不上传服务器。' }
        ]
      },
      demo: {
        title: '观看演示视频',
        subtitle: '3分钟快速了解 Demoyu 的强大功能',
        playBtn: '播放',
        pauseBtn: '暂停',
        muteBtn: '静音',
        unmuteBtn: '取消静音',
        fullscreenBtn: '全屏',
        exitFullscreenBtn: '退出全屏'
      },
      footer: {
        madeWith: '为每一位"摸鱼人"用爱发电 ⚡️',
        disclaimer: '免责声明：使用风险自负。如果被开除，开发者概不负责。'
      },
      donation: {
        title: '开发者能量补给站',
        subtitle: '如果 Demoyu 让你度过了愉快的摸鱼时光，不妨请作者喝杯冰美式，助力头发再生。',
        scan: '微信扫一扫',
        thanks: '感谢你的支持！(点击任意处关闭)'
      }
    },
    en: {
      nav: {
        github: 'GitHub',
        launch: 'Launch Demoyu'
      },
      hero: {
        tag: 'v1.2.0 Anti-Detection Update Live',
        titleMain: 'Work Hard?',
        titleSub: 'No, Play Harder.',
        desc: 'The ultimate stealth reading tool disguised as VS Code and Microsoft Word. Read novels, browse the web, and look like the most productive employee in the office.',
        startBtn: 'Start Slacking',
        demoBtn: 'Watch Demo Video',
        codeComment: '// You see code, but I see a dragon slaying story.',
        typingMode: 'Typing Mode Active: Mash keys to read'
      },
      features: {
        title: 'Master the Art of Invisibility',
        subtitle: 'Advanced features designed to keep you safe from prying eyes.',
        cards: [
          { title: 'VS Code Camouflage', desc: 'Perfect pixel-replica of VS Code. Syntax highlighting colors are actually your novel text.' },
          { title: 'Word Document Mode', desc: 'Looks exactly like a boring annual report. Reads like a thriller. Great for non-dev environments.' },
          { title: 'Stealth Typing', desc: 'Don\'t just stare. Type randomly on your keyboard to advance the story. Look busy, stay entertained.' },
          { title: 'Boss Key (Space)', desc: 'Panic mode. Press Spacebar to instantly hide everything and show fake, complex enterprise code.' },
          { title: 'Anti-Block Browser', desc: 'Bypass iframe restrictions on Bilibili or Reading sites using our popup window technology.' },
          { title: 'PDF & TXT Support', desc: 'Drag and drop your local files. We parse them locally. Nothing is uploaded to a server.' }
        ]
      },
      demo: {
        title: 'Watch Demo Video',
        subtitle: 'See Demoyu in action - 3 minute showcase',
        playBtn: 'Play',
        pauseBtn: 'Pause',
        muteBtn: 'Mute',
        unmuteBtn: 'Unmute',
        fullscreenBtn: 'Fullscreen',
        exitFullscreenBtn: 'Exit Fullscreen'
      },
      footer: {
        madeWith: 'Powered by caffeine and code ⚡️',
        disclaimer: 'Disclaimer: Use at your own risk. The developer is not responsible if you get fired.'
      },
      donation: {
        title: 'Developer Fuel Station',
        subtitle: 'If this tool saved your sanity, consider buying me a coffee to keep the updates coming.',
        scan: 'Scan with WeChat',
        thanks: 'Thanks for your support! (Click anywhere to close)'
      }
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#161b22]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="text-blue-500" size={24} />
            <span className="font-bold text-xl text-white tracking-tight">Demoyu</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#demo-video" className="hover:text-white transition-colors">{t.nav.demo}</a>
            <a href="https://github.com/daisir8/Demoyu" target="_blank" rel="noreferrer" className="flex items-center hover:text-white transition-colors">
              {t.nav.github} <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLang}
              className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
            >
              <Globe size={16} className="mr-1"/> {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button 
              onClick={onStart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              {t.nav.launch}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            {t.hero.tag}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
            {t.hero.titleMain} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t.hero.titleSub}</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10 leading-relaxed">
            {t.hero.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center group"
            >
              {t.hero.startBtn}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={scrollToVideo}
              className="w-full sm:w-auto px-8 py-4 border border-gray-700 text-gray-300 rounded-lg font-bold text-lg hover:border-gray-500 hover:text-white transition-all flex items-center justify-center group"
            >
              {t.hero.demoBtn}
              <Play className="ml-2 group-hover:scale-110 transition-transform" size={20} />
            </button>
          </div>

          {/* Mockup Preview */}
          <div className="mt-20 relative mx-auto max-w-5xl rounded-xl border border-gray-800 bg-[#1e1e1e] shadow-2xl shadow-black/50 overflow-hidden">
            <div className="h-8 bg-[#252526] flex items-center px-4 space-x-2 border-b border-black">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              <div className="ml-4 text-xs text-gray-500 font-mono">App.tsx — Demoyu</div>
            </div>
            <div className="flex h-[400px]">
              <div className="w-12 bg-[#333333] border-r border-black flex flex-col items-center py-4 space-y-6">
                <Code className="text-white opacity-100" size={24}/>
                <div className="w-6 h-6 border-2 border-gray-500 rounded"></div>
              </div>
              <div className="flex-1 p-6 font-mono text-sm text-gray-400 text-left">
                <div className="mb-4">
                  <span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> <span className="text-orange-300">'react'</span>;
                </div>
                <div className="pl-4 border-l-2 border-blue-500/50">
                  <span className="text-green-600">{t.hero.codeComment}</span><br/>
                  <span className="text-blue-400">const</span> <span className="text-yellow-200">HiddenStory</span> = () <span className="text-blue-400">=&gt;</span> {'{'}<br/>
                  &nbsp;&nbsp;<span className="text-white">"The dark knight rose from the ashes..."</span><br/>
                  {'}'}
                </div>
                <div className="mt-8 text-center">
                  <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded text-xs animate-pulse">
                    {t.hero.typingMode}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div id="features" className="py-24 bg-[#0d1117] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.features.title}</h2>
            <p className="text-gray-400">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Code className="text-blue-400" size={32} />}
              title={t.features.cards[0].title}
              desc={t.features.cards[0].desc}
            />
            <FeatureCard 
              icon={<FileText className="text-blue-600" size={32} />}
              title={t.features.cards[1].title}
              desc={t.features.cards[1].desc}
            />
            <FeatureCard 
              icon={<Keyboard className="text-green-400" size={32} />}
              title={t.features.cards[2].title}
              desc={t.features.cards[2].desc}
            />
            <FeatureCard 
              icon={<EyeOff className="text-red-400" size={32} />}
              title={t.features.cards[3].title}
              desc={t.features.cards[3].desc}
            />
            <FeatureCard 
              icon={<Shield className="text-purple-400" size={32} />}
              title={t.features.cards[4].title}
              desc={t.features.cards[4].desc}
            />
            <FeatureCard 
              icon={<Zap className="text-yellow-400" size={32} />}
              title={t.features.cards[5].title}
              desc={t.features.cards[5].desc}
            />
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div id="demo-video" className="py-24 bg-[#161b22] border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.demo.title}</h2>
            <p className="text-gray-400">{t.demo.subtitle}</p>
          </div>

          {/* Video Player */}
          <div 
            ref={videoContainerRef}
            className="relative rounded-2xl overflow-hidden border border-gray-700 bg-black shadow-2xl shadow-black/50"
          >
            <video
              ref={videoRef}
              className="w-full aspect-video"
              poster="/placeholder-poster.jpg" // 你可以添加一个视频封面图
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            >
              {/* 这里替换为你的本地视频文件路径 */}
              <source src="/demo.mp4" type="video/mp4" />
              <source src="/demo-video.webm" type="video/webm" />
              您的浏览器不支持视频播放。
            </video>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
              
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="text-white hover:text-blue-400 transition-colors"
                    title={isPlaying ? t.demo.pauseBtn : t.demo.playBtn}
                  >
                    {isPlaying ? (
                      <Pause size={24} />
                    ) : (
                      <Play size={24} />
                    )}
                  </button>
                  
                  <button
                    onClick={handleMuteToggle}
                    className="text-white hover:text-blue-400 transition-colors"
                    title={isMuted ? t.demo.unmuteBtn : t.demo.muteBtn}
                  >
                    {isMuted ? (
                      <VolumeX size={20} />
                    ) : (
                      <Volume2 size={20} />
                    )}
                  </button>
                  
                  <span className="text-sm text-gray-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <button
                  onClick={handleFullscreenToggle}
                  className="text-white hover:text-blue-400 transition-colors"
                  title={isFullscreen ? t.demo.exitFullscreenBtn : t.demo.fullscreenBtn}
                >
                  {isFullscreen ? (
                    <Minimize size={20} />
                  ) : (
                    <Maximize size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handlePlayPause}
              >
                <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/20 hover:border-blue-400/50 transition-colors">
                  <Play size={40} className="text-white ml-2" />
                </div>
              </div>
            )}
          </div>

          {/* Video Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#1c2128] p-6 rounded-xl border border-gray-800">
              <div className="text-blue-400 font-bold text-lg mb-2">🎬 完整演示</div>
              <p className="text-gray-400 text-sm">
                {lang === 'zh' 
                  ? '从安装到高级功能的完整使用流程展示' 
                  : 'Complete workflow from installation to advanced features'}
              </p>
            </div>
            <div className="bg-[#1c2128] p-6 rounded-xl border border-gray-800">
              <div className="text-green-400 font-bold text-lg mb-2">⚡️ 快速上手</div>
              <p className="text-gray-400 text-sm">
                {lang === 'zh'
                  ? '3分钟学会所有核心功能，立即开始摸鱼'
                  : 'Learn all core features in 3 minutes, start slacking immediately'}
              </p>
            </div>
            <div className="bg-[#1c2128] p-6 rounded-xl border border-gray-800">
              <div className="text-purple-400 font-bold text-lg mb-2">🛡️ 安全演示</div>
              <p className="text-gray-400 text-sm">
                {lang === 'zh'
                  ? '展示如何在真实工作环境中安全使用'
                  : 'See how to use it safely in real work environments'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#161b22] py-12 border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div 
            className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer group hover:bg-gray-800/50 px-4 py-2 rounded-full transition-all"
            onClick={() => setShowDonate(true)}
            title={lang === 'zh' ? '点击打赏' : 'Click to donate'}
          >
            <div className="relative">
              <Coffee className="text-gray-500 group-hover:text-yellow-500 transition-colors" size={20} />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
            </div>
            <span className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors border-b border-transparent group-hover:border-gray-500">
              {t.footer.madeWith}
            </span>
          </div>
          <div className="text-gray-600 text-xs text-center md:text-right">
            <p>{t.footer.disclaimer}</p>
          </div>
        </div>
      </footer>

      {/* Donation Modal */}
      {showDonate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowDonate(false)}
          ></div>
          <div className="relative bg-[#1c2128] border border-gray-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowDonate(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="bg-yellow-500/10 p-4 rounded-full">
                <Coffee size={48} className="text-yellow-500" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">{t.donation.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t.donation.subtitle}
                </p>
              </div>

              {/* QR Code Placeholder */}
              <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-inner flex items-center justify-center relative overflow-hidden group">
                <img src="./components/We.png" alt="QR Code" className="w-full h-full object-contain" />
              </div>

              <div className="text-xs text-gray-500">
                {t.donation.thanks}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-[#161b22] p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-colors group">
    <div className="mb-4 bg-gray-800/50 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;