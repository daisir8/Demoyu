import { Language } from '../types';

export const t = (key: string, lang: Language): string => {
  const dict: Record<string, { en: string; zh: string }> = {
    'upload_btn': { en: 'Upload Novel', zh: '上传小说' },
    'change_file': { en: 'Change File', zh: '切换文件' },
    'progress': { en: 'Progress', zh: '阅读进度' },
    'settings': { en: 'Settings', zh: '设置' },
    'font_size': { en: 'Font Size', zh: '字体大小' },
    'font_color': { en: 'Font Color', zh: '字体颜色' },
    'opacity': { en: 'Win Opacity', zh: '窗口透明度' },
    'scale': { en: 'Win Size', zh: '窗口大小' },
    'web_mode': { en: 'Web Mode', zh: '网页模式' },
    'enter_url': { en: 'Enter URL', zh: '输入网址' },
    'go': { en: 'Go', zh: '前往' },
    'boss_hint': { en: 'SPACE: Boss Key', zh: '空格键: 老板键' },
    'split_hint': { en: 'ENTER: Toggle Win', zh: '回车键: 切换小窗' },
    'library': { en: 'Library', zh: '书库' },
    'no_books': { en: 'No books loaded', zh: '暂无书籍' },
    'delete_confirm': { en: 'Delete this book?', zh: '确认删除这本书吗？' },
    'typing_hint': { en: 'Type anything to read...', zh: '随意敲击键盘开始摸鱼阅读...' },
    'jump_to': { en: 'Jump', zh: '跳转' },
  };

  return dict[key]?.[lang] || key;
};