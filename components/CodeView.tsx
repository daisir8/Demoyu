import React, { useEffect, useRef } from 'react';
import { Search, GitGraph, Box, Bug, Files, Settings as SettingsIcon, ChevronRight, X, FileText, Trash2 } from 'lucide-react';
import { Book, Settings } from '../types';

interface CodeViewProps {
  content: string;
  fileName: string;
  isHidden: boolean;
  books: Book[];
  currentBookId: string | null;
  onSelectBook: (id: string) => void;
  onDeleteBook: (id: string) => void;
  settings: Settings;
}

const CodeView: React.FC<CodeViewProps> = ({ 
  content, 
  fileName, 
  isHidden, 
  books, 
  currentBookId, 
  onSelectBook, 
  onDeleteBook,
  settings
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when content changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content, isHidden]);

  const handleContextMenu = (e: React.MouseEvent, bookId: string) => {
    e.preventDefault();
    onDeleteBook(bookId);
  };

  // Syntax highlighting simulation
  const renderHighlightedText = (text: string) => {
    if (!text) return null;
    
    // If Boss Key is active (isHidden), show fake code
    if (isHidden) {
      return (
        <span className="text-gray-400">
          <span className="text-pink-400">import</span> React <span className="text-pink-400">from</span> <span className="text-orange-300">'react'</span>;<br/>
          <span className="text-pink-400">import</span> {'{ useState, useEffect }'} <span className="text-pink-400">from</span> <span className="text-orange-300">'react'</span>;<br/>
          <br/>
          <span className="text-blue-400">const</span> <span className="text-yellow-200">AppContainer</span> = () <span className="text-blue-400">=&gt;</span> {'{'}<br/>
          &nbsp;&nbsp;<span className="text-blue-400">const</span> [data, setData] = <span className="text-yellow-200">useState</span>(<span className="text-blue-400">null</span>);<br/>
          &nbsp;&nbsp;<span className="text-green-600">// TODO: Refactor legacy controller logic</span><br/>
          &nbsp;&nbsp;<span className="text-yellow-200">useEffect</span>(() <span className="text-blue-400">=&gt;</span> {'{'}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-yellow-200">initSystem</span>();<br/>
          &nbsp;&nbsp;{'}'}, []);<br/>
          <br/>
          &nbsp;&nbsp;<span className="text-pink-400">return</span> (<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-300">div</span> className=<span className="text-orange-300">"container"</span>&gt;<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loading modules...<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-300">div</span>&gt;<br/>
          &nbsp;&nbsp;);<br/>
          {'}'};<br/>
          <br/>
          <span className="text-pink-400">export default</span> AppContainer;
        </span>
      );
    }

    // Normal Novel Mode with Custom Settings
    return (
        <span 
          className="whitespace-pre-wrap font-mono leading-6 transition-colors duration-200"
          style={{ 
            fontSize: `${settings.fontSize}px`,
            color: settings.fontColor 
          }}
        >
            {text}
        </span>
    );
  };

  return (
    <div className="flex h-full w-full bg-vs-bg text-vs-text font-mono overflow-hidden">
      {/* Activity Bar */}
      <div className="w-12 bg-vs-activity flex flex-col items-center py-4 space-y-6 shrink-0 z-10">
        <Files size={24} className="text-white cursor-pointer opacity-100" />
        <Search size={24} className="text-gray-500 cursor-pointer hover:text-white" />
        <GitGraph size={24} className="text-gray-500 cursor-pointer hover:text-white" />
        <Bug size={24} className="text-gray-500 cursor-pointer hover:text-white" />
        <Box size={24} className="text-gray-500 cursor-pointer hover:text-white" />
        <div className="flex-grow" />
        <SettingsIcon size={24} className="text-gray-500 cursor-pointer hover:text-white" />
      </div>

      {/* Sidebar (Explorer) */}
      <div className="w-60 bg-vs-sidebar flex flex-col border-r border-black hidden md:flex shrink-0">
        <div className="h-8 px-4 flex items-center text-xs font-bold tracking-wide uppercase text-gray-400">Explorer</div>
        <div className="px-2">
          <div className="flex items-center py-1 cursor-pointer bg-[#37373d]">
            <ChevronRight size={16} className="rotate-90 mr-1" />
            <span className="text-xs font-bold text-white">MOYU-LIBRARY</span>
          </div>
          <div className="pl-4 mt-1">
             {books.length === 0 && <div className="text-xs text-gray-500 px-2 italic">Empty</div>}
             
             {books.map(book => (
               <div 
                  key={book.id}
                  onClick={() => onSelectBook(book.id)}
                  onContextMenu={(e) => handleContextMenu(e, book.id)}
                  className={`flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] px-2 group ${currentBookId === book.id ? 'bg-[#37373d]' : ''}`}
                  title="Right click to delete"
               >
                  <FileText size={12} className={`mr-2 ${currentBookId === book.id ? 'text-yellow-400' : 'text-blue-400'}`} />
                  <span className={`text-sm truncate flex-1 ${currentBookId === book.id ? 'text-white' : 'text-gray-400'}`}>
                    {book.name}
                  </span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="h-9 bg-vs-bg flex items-center overflow-x-auto border-b border-black">
          <div className="h-full px-3 bg-[#1e1e1e] flex items-center border-t border-vs-blue border-r border-black min-w-fit">
            <span className="text-yellow-400 text-xs mr-2">JS</span>
            <span className="text-sm text-white italic mr-2 truncate max-w-[150px]">{fileName || 'Untitled'}</span>
            <X size={14} className="text-gray-400 hover:bg-gray-700 rounded-sm cursor-pointer" />
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="h-6 bg-vs-bg flex items-center px-4 text-xs text-gray-500 border-b border-[#2b2b2b]">
            src &gt; components &gt; {fileName || 'Untitled'}
        </div>

        {/* Code Content */}
        <div 
            ref={scrollRef}
            className="flex-1 overflow-auto vscode-scroll relative pt-2"
        >
            <div className="flex min-h-full">
                {/* Line Numbers */}
                <div className="w-12 flex flex-col items-end pr-4 text-vs-line text-xs leading-6 select-none shrink-0">
                    {Array.from({ length: isHidden ? 20 : Math.max(20, content.split('\n').length + 1) }).map((_, i) => (
                        <div key={i} style={{ lineHeight: '1.5rem' }}>{i + 1}</div>
                    ))}
                </div>
                {/* Text Area */}
                <div className="flex-1 pl-2 pr-4 pb-10">
                    <div className="blinking-cursor outline-none">
                        {renderHighlightedText(content)}
                    </div>
                </div>
            </div>
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-vs-blue flex items-center px-3 text-white text-xs justify-between shrink-0">
            <div className="flex items-center gap-4">
                <div className="flex items-center"><GitGraph size={12} className="mr-1"/> main*</div>
                <div className="flex items-center"><X size={12} className="mr-1"/> 0 <div className="ml-2 flex items-center"><Bug size={12} className="mr-1"/> 0</div></div>
            </div>
            <div className="flex items-center gap-4">
                <span>Ln {isHidden ? 25 : content.split('\n').length}, Col {isHidden ? 1 : content.length}</span>
                <span>UTF-8</span>
                <span>JavaScript</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CodeView;