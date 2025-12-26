import React, { useState, useEffect, useCallback } from 'react';
import CodeView from './components/CodeView';
import WordView from './components/WordView';
import ControlPanel from './components/ControlPanel';
import FloatingWindow from './components/FloatingWindow';
import LandingPage from './components/LandingPage';
import { ViewMode, DocumentState, Book, Settings } from './types';
import { extractTextFromFile } from './services/pdfService';
import { t } from './utils/translations';

const DEFAULT_SETTINGS: Settings = {
  language: 'zh',
  fontSize: 14,
  fontColor: '#ce9178', // VS Code string color default
  windowOpacity: 0.9,
  windowScale: 1.0,
};

// Fake content for "Work Mode"
const FAKE_CODE = `import React, { useMemo, useCallback } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

// Enterprise-grade state management configuration
const configureStore = (initialState) => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};

export const DataProvider = ({ children }) => {
  const store = useMemo(() => configureStore({}), []);
  
  const handleSystemEvent = useCallback((event) => {
     console.log('System event received:', event.type);
     // TODO: Implement WebSocket reconnection strategy
     // Critical path for data synchronization
  }, []);

  return (
    <Provider store={store}>
       {children}
    </Provider>
  );
};`;

const FAKE_WORD_CONTENT = `Annual Strategic Review 2024
Confidential - Internal Use Only

1. Executive Summary
The past fiscal quarter has highlighted the resilience of our core infrastructure. While market volatility remains a concern, our diversified portfolio has mitigated significant risks. The leadership team remains committed to the "Vision 2025" roadmap, emphasizing operational efficiency and digital transformation.

2. Operational Metrics
Key Performance Indicators (KPIs) indicate a 12% improvement in supply chain velocity. However, customer acquisition costs (CAC) have seen a marginal increase due to competitive ad-spend in the APAC region. 

3. Risk Assessment
Cybersecurity threats continue to evolve. The IT department has initiated a zero-trust architecture rollout. Compliance with GDPR and CCPA remains a top priority for the legal team.

4. Next Steps
- Finalize Q3 budget allocation.
- Complete the migration to the new cloud provider.
- Conduct quarterly performance reviews for all departments.
`;

const App: React.FC = () => {
  // New State for Landing Page
  const [showLanding, setShowLanding] = useState(true);

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.CODE);
  
  // Library State
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);

  const [docState, setDocState] = useState<DocumentState>({
    currentBookId: null,
    isHidden: false,
    isSplitMode: false,
    webUrl: 'https://www.google.com/search?igu=1', // Revert to Google Iframe-friendly URL
    showWeb: false
  });
  
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(false);

  // Load settings from local storage on mount
  useEffect(() => {
     const savedSettings = localStorage.getItem('moyu_settings');
     if (savedSettings) {
         setSettings(JSON.parse(savedSettings));
     }
  }, []);

  // Save settings when changed
  useEffect(() => {
     localStorage.setItem('moyu_settings', JSON.stringify(settings));
  }, [settings]);

  const getCurrentBook = () => books.find(b => b.id === currentBookId);

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const text = await extractTextFromFile(file);
      const newBook: Book = {
        id: Date.now().toString(),
        name: file.name,
        content: text,
        progressIndex: 0,
        type: file.name.endsWith('.pdf') ? 'pdf' : 'txt'
      };

      setBooks(prev => [...prev, newBook]);
      setCurrentBookId(newBook.id);
    } catch (error) {
      alert('Error reading file: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBook = (id: string) => {
      if (confirm(t('delete_confirm', settings.language))) {
          setBooks(prev => prev.filter(b => b.id !== id));
          if (currentBookId === id) {
              setCurrentBookId(null);
          }
      }
  };

  const handleManualProgress = (percent: number) => {
      const book = getCurrentBook();
      if (!book) return;

      const newIndex = Math.floor((percent / 100) * book.content.length);
      setBooks(prev => prev.map(b => b.id === book.id ? { ...b, progressIndex: newIndex } : b));
  };

  // The core typing logic
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // If showing landing page, ignore keys
    if (showLanding) return;

    // If loading, ignore
    if (isLoading) return;

    // Toggle Split Mode (Enter) - Feature 6
    if (e.key === 'Enter') {
        e.preventDefault();
        setDocState(prev => ({ ...prev, isSplitMode: !prev.isSplitMode }));
        return;
    }

    // Boss Key (Space)
    if (e.code === 'Space') {
      e.preventDefault();
      setDocState(prev => ({ ...prev, isHidden: !prev.isHidden }));
      return;
    }

    if (docState.isHidden) return;

    // Standard modifiers ignore
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    const isModifier = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key);

    // If NOT in split mode, typing advances text
    // If IN split mode, we assume user is "working" (showing fake text), so typing does nothing to the novel
    if (!docState.isSplitMode && !isModifier && currentBookId) {
      setBooks(prev => prev.map(book => {
        if (book.id !== currentBookId) return book;
        
        const increment = Math.floor(Math.random() * 3) + 1;
        const newLength = Math.min(book.progressIndex + increment, book.content.length);
        return { ...book, progressIndex: newLength };
      }));
    }
  }, [docState.isHidden, docState.isSplitMode, isLoading, currentBookId, showLanding]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (showLanding) {
      return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  const currentBook = getCurrentBook();
  
  // LOGIC for Main Window Content:
  // 1. If Hidden (Boss Key): Handled inside views (usually blank or simple fake)
  // 2. If Split Mode: ALWAYS show Fake Content to look like work
  // 3. Normal Mode: Show the novel text incrementally
  let mainContent = '';
  if (docState.isSplitMode) {
      mainContent = viewMode === ViewMode.CODE ? FAKE_CODE : FAKE_WORD_CONTENT;
  } else {
      mainContent = currentBook 
        ? currentBook.content.slice(0, currentBook.progressIndex) 
        : (books.length === 0 ? t('no_books', settings.language) : 'Select a book...');
  }
    
  const progressPercent = currentBook && currentBook.content.length > 0 
    ? (currentBook.progressIndex / currentBook.content.length) * 100 
    : 0;
  
  // Floating window gets the FULL content so user can scroll freely
  const floatingContent = currentBook ? currentBook.content : '';

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {viewMode === ViewMode.CODE ? (
        <CodeView 
          content={mainContent} 
          fileName={currentBook?.name || ''}
          isHidden={docState.isHidden}
          books={books}
          currentBookId={currentBookId}
          onSelectBook={setCurrentBookId}
          onDeleteBook={handleDeleteBook}
          settings={settings}
        />
      ) : (
        <WordView 
          content={mainContent} 
          fileName={currentBook?.name || ''}
          isHidden={docState.isHidden}
          settings={settings}
        />
      )}

      {/* Floating Window for Feature 6 & 7 */}
      {/* We keep it mounted (by not conditionally rendering) but use CSS to hide it in FloatingWindow component */}
      <FloatingWindow 
         content={floatingContent}
         isWebMode={docState.showWeb}
         webUrl={docState.webUrl}
         settings={settings}
         visible={docState.isSplitMode && !docState.isHidden}
         onClose={() => setDocState(prev => ({ ...prev, isSplitMode: false }))}
         onUrlChange={(url) => setDocState(prev => ({ ...prev, webUrl: url }))}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="text-white font-bold text-xl">Processing File...</div>
        </div>
      )}

      {/* Controls */}
      <ControlPanel 
        currentView={viewMode}
        onViewChange={setViewMode}
        onFileUpload={handleFileUpload}
        fileName={currentBook?.name || null}
        progress={progressPercent}
        onProgressChange={handleManualProgress}
        settings={settings}
        onSettingsChange={setSettings}
        webUrl={docState.webUrl}
        onWebUrlChange={(url) => setDocState(prev => ({...prev, webUrl: url}))}
        toggleWebMode={() => setDocState(prev => ({...prev, showWeb: !prev.showWeb}))}
        isWebMode={docState.showWeb}
      />
    </div>
  );
};

export default App;