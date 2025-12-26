import React, { useRef, useState } from 'react';
import { ViewMode, Settings } from '../types';
import { Upload, FileText, Code, X, Settings as SettingsIcon, Globe, BookOpen, MonitorPlay, AlignCenter } from 'lucide-react';
import { t } from '../utils/translations';

interface ControlPanelProps {
  currentView: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  onFileUpload: (file: File) => void;
  fileName: string | null;
  progress: number;
  onProgressChange: (newProgress: number) => void;
  settings: Settings;
  onSettingsChange: (s: Settings) => void;
  webUrl: string;
  onWebUrlChange: (url: string) => void;
  toggleWebMode: () => void;
  isWebMode: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  currentView, 
  onViewChange, 
  onFileUpload,
  fileName,
  progress,
  onProgressChange,
  settings,
  onSettingsChange,
  webUrl,
  onWebUrlChange,
  toggleWebMode,
  isWebMode
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [minimized, setMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'settings'>('main');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const updateSetting = (key: keyof Settings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  if (minimized) {
      return (
          <div 
            className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full cursor-pointer shadow-lg z-50 hover:bg-gray-700 transition-all opacity-50 hover:opacity-100"
            onClick={() => setMinimized(false)}
            title="Open Controls"
          >
              <FileText size={20} />
          </div>
      )
  }

  const lang = settings.language;

  return (
    <div className="fixed bottom-10 right-10 bg-white/95 backdrop-blur-md border border-gray-200 p-4 rounded-xl shadow-2xl z-50 w-80 transition-all duration-300">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('main')}
                className={`text-sm font-bold ${activeTab === 'main' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                  Main
              </button>
              <button 
                 onClick={() => setActiveTab('settings')}
                 className={`text-sm font-bold ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              >
                  {t('settings', lang)}
              </button>
          </div>
          <button onClick={() => setMinimized(true)} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
          </button>
      </div>

      {activeTab === 'main' && (
      <div className="space-y-4">
        {/* View Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onViewChange(ViewMode.CODE)}
            className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === ViewMode.CODE
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Code size={16} className="mr-2" />
            Code
          </button>
          <button
            onClick={() => onViewChange(ViewMode.WORD)}
            className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-colors ${
              currentView === ViewMode.WORD
                ? 'bg-white text-blue-800 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText size={16} className="mr-2" />
            Word
          </button>
        </div>

        {/* File Upload */}
        <div>
           <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".txt,.pdf"
              className="hidden"
           />
           <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors text-sm"
           >
              <Upload size={16} className="mr-2" />
              {t(fileName ? 'change_file' : 'upload_btn', lang)}
           </button>
        </div>

        {/* Web Mode Toggle */}
        <div className="flex items-center space-x-2">
            <input 
                type="text" 
                value={webUrl}
                onChange={(e) => onWebUrlChange(e.target.value)}
                placeholder={t('enter_url', lang)}
                className="flex-1 border rounded px-2 py-1 text-xs"
            />
            <button 
                onClick={toggleWebMode}
                className={`p-1 rounded ${isWebMode ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                title={t('web_mode', lang)}
            >
                <Globe size={16} />
            </button>
        </div>

        {/* Progress & Control */}
        {fileName && (
            <div className="bg-gray-50 p-2 rounded border border-gray-200">
                <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                    <span className="font-bold">{t('progress', lang)}</span>
                    <div className="flex items-center space-x-1">
                        <input 
                            type="number" 
                            min="0" max="100" 
                            value={progress.toFixed(1)} 
                            onChange={(e) => onProgressChange(Number(e.target.value))}
                            className="w-12 border rounded px-1 text-right"
                        />
                        <span>%</span>
                    </div>
                </div>
                <input 
                    type="range" 
                    min="0" max="100" step="0.1"
                    value={progress}
                    onChange={(e) => onProgressChange(Number(e.target.value))}
                    className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        )}
        
        <div className="bg-blue-50 p-2 rounded border border-blue-100 text-[10px] text-blue-800 space-y-1">
            <div className="flex items-center gap-1"><AlignCenter size={10}/> {t('typing_hint', lang)}</div>
            <div className="flex items-center gap-1"><MonitorPlay size={10}/> {t('boss_hint', lang)}</div>
            <div className="flex items-center gap-1"><BookOpen size={10}/> {t('split_hint', lang)}</div>
        </div>
      </div>
      )}

      {activeTab === 'settings' && (
          <div className="space-y-4">
              {/* Language */}
              <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Language / 语言</span>
                  <div className="flex rounded bg-gray-200 p-0.5">
                      <button 
                        onClick={() => updateSetting('language', 'en')}
                        className={`px-2 py-0.5 text-xs rounded ${settings.language === 'en' ? 'bg-white shadow' : 'text-gray-500'}`}
                      >EN</button>
                      <button 
                        onClick={() => updateSetting('language', 'zh')}
                        className={`px-2 py-0.5 text-xs rounded ${settings.language === 'zh' ? 'bg-white shadow' : 'text-gray-500'}`}
                      >中文</button>
                  </div>
              </div>

              {/* Font Size */}
              <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{t('font_size', lang)}</span>
                      <span>{settings.fontSize}px</span>
                  </div>
                  <input 
                    type="range" min="10" max="32" 
                    value={settings.fontSize}
                    onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />
              </div>

              {/* Font Color */}
              <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('font_color', lang)}</span>
                  <input 
                    type="color" 
                    value={settings.fontColor}
                    onChange={(e) => updateSetting('fontColor', e.target.value)}
                    className="w-8 h-8 rounded border-0 cursor-pointer"
                  />
              </div>

              <hr className="border-gray-200" />
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Split Window Config</div>

              {/* Opacity */}
              <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{t('opacity', lang)}</span>
                      <span>{Math.round(settings.windowOpacity * 100)}%</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="1" step="0.05"
                    value={settings.windowOpacity}
                    onChange={(e) => updateSetting('windowOpacity', Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />
              </div>

              {/* Scale */}
               <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{t('scale', lang)}</span>
                      <span>{settings.windowScale.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="1.5" step="0.1"
                    value={settings.windowScale}
                    onChange={(e) => updateSetting('windowScale', Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer"
                  />
              </div>
          </div>
      )}
    </div>
  );
};

export default ControlPanel;