import React, { useEffect, useRef } from 'react';
import { AlignLeft, Bold, Italic, Underline, Search, ChevronDown, Minus, Square, X as CloseIcon } from 'lucide-react';
import { Settings } from '../types';

interface WordViewProps {
  content: string;
  fileName: string;
  isHidden: boolean;
  settings: Settings;
}

const WordView: React.FC<WordViewProps> = ({ content, fileName, isHidden, settings }) => {
    // We use a ref to track the end of the text content specifically
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto scroll
    useEffect(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      }
    }, [content, isHidden]);

  return (
    <div className="flex flex-col h-full w-full bg-word-bg text-black font-sans overflow-hidden">
      {/* Top Bar (Title) */}
      <div className="h-10 bg-word-blue flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-4">
           <div className="grid grid-cols-3 gap-[2px]">
              {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full opacity-80"></div>)}
           </div>
           <span className="text-white text-sm font-medium pl-4">{isHidden ? 'Annual_Report_2024.docx' : (fileName || 'Document1')} - Word</span>
        </div>
        
        {/* Search Box */}
        <div className="hidden md:flex bg-[#466eae] h-7 w-96 rounded items-center px-2">
            <Search size={14} className="text-white opacity-70 mr-2"/>
            <span className="text-white text-xs opacity-70">Search</span>
        </div>

        <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2">
                <span className="text-xs">John Doe</span>
                <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs">JD</div>
            </div>
            <div className="flex items-center space-x-3 pl-4">
                <Minus size={16} />
                <Square size={14} />
                <CloseIcon size={18} />
            </div>
        </div>
      </div>

      {/* Ribbon */}
      <div className="bg-word-ribbon border-b border-gray-300 flex flex-col shrink-0">
          <div className="flex px-4 pt-2 space-x-6 text-sm text-gray-700">
              <span className="border-b-2 border-word-blue pb-1 text-word-blue font-semibold">Home</span>
              <span>Insert</span>
              <span>Draw</span>
              <span>Layout</span>
              <span>References</span>
              <span>Review</span>
              <span>View</span>
              <span>Help</span>
          </div>
          <div className="h-24 bg-[#f3f2f1] flex items-center px-4 space-x-4 py-2 overflow-hidden">
             {/* Clipboard Group */}
             <div className="flex flex-col items-center justify-between h-full border-r border-gray-300 pr-4">
                 <div className="flex items-center space-x-1 mb-1">
                    <div className="bg-white border border-gray-300 p-1 rounded"><span className="text-xs">Paste</span></div>
                 </div>
                 <span className="text-xs text-gray-500 mt-auto">Clipboard</span>
             </div>
             
             {/* Font Group */}
             <div className="flex flex-col h-full border-r border-gray-300 pr-4 w-48">
                 <div className="flex space-x-2 mb-2">
                     <div className="bg-white border border-gray-300 px-2 py-[2px] w-28 text-xs flex justify-between items-center">Calibri (Body) <ChevronDown size={10}/></div>
                     <div className="bg-white border border-gray-300 px-2 py-[2px] w-12 text-xs flex justify-between items-center">11 <ChevronDown size={10}/></div>
                 </div>
                 <div className="flex space-x-1">
                    <div className="p-1 hover:bg-gray-200 rounded"><Bold size={14}/></div>
                    <div className="p-1 hover:bg-gray-200 rounded"><Italic size={14}/></div>
                    <div className="p-1 hover:bg-gray-200 rounded"><Underline size={14}/></div>
                 </div>
                 <span className="text-xs text-gray-500 mt-auto text-center">Font</span>
             </div>

             {/* Paragraph Group */}
             <div className="flex flex-col h-full border-r border-gray-300 pr-4 w-40 hidden sm:flex">
                 <div className="flex space-x-2 mb-2 mt-1">
                     <div className="p-1 hover:bg-gray-200 rounded"><AlignLeft size={14}/></div>
                 </div>
                 <span className="text-xs text-gray-500 mt-auto text-center">Paragraph</span>
             </div>
          </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 bg-[#e3e3e3] overflow-y-auto p-4 md:p-8 flex justify-center">
         {/* Fix: Added h-fit and allow height to expand naturally beyond min-height */}
         <div className="bg-white shadow-lg w-full max-w-[850px] min-h-[1000px] h-fit p-12 md:p-16 relative mb-8">
            {isHidden ? (
                <div className="text-gray-900">
                    <h1 className="text-3xl font-bold mb-6 text-word-blue">Annual Performance Review 2024</h1>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Executive Summary</h2>
                    <p className="mb-4 text-justify leading-relaxed">
                        The fiscal year 2024 has demonstrated significant growth across all primary sectors. 
                        Our strategic initiatives in Q1 and Q2 provided a robust foundation for market expansion. 
                        Revenue streams have diversified, reducing our reliance on legacy products while simultaneously 
                        boosting engagement in emerging markets.
                    </p>
                    <p className="mb-4 text-justify leading-relaxed">
                        Key performance indicators (KPIs) suggest a 15% increase in operational efficiency due to the 
                        implementation of the new automation framework. Employee satisfaction scores have also seen 
                        a positive trajectory, aligning with our internal cultural shifts.
                    </p>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 mt-8">2. Financial Overview</h2>
                    <p className="mb-4 text-justify leading-relaxed">
                        EBITDA margins have improved by 230 basis points year-over-year. 
                        Cost reduction strategies in the supply chain vertical have yielded unexpected savings, 
                        which are being reinvested into R&D.
                    </p>
                </div>
            ) : (
                <div 
                    className="leading-loose whitespace-pre-wrap font-serif blinking-cursor"
                    style={{ 
                        fontSize: `${settings.fontSize}px`,
                        color: settings.fontColor 
                    }}
                >
                    {content}
                    {/* Invisible marker for auto-scrolling to the end of text */}
                    <div ref={bottomRef} style={{ float: 'left', clear: 'both' }} />
                </div>
            )}
         </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-word-blue flex items-center justify-between px-2 text-white text-xs shrink-0">
         <div className="flex space-x-4">
             <span>Page 1 of {isHidden ? 5 : Math.floor(content.length / 500) + 1}</span>
             <span>{isHidden ? '450' : content.split(' ').length} words</span>
             <span>English (U.S.)</span>
         </div>
         <div className="flex space-x-4">
             <span>Focus</span>
             <div className="flex items-center space-x-2">
                 <span>-</span>
                 <div className="w-20 h-1 bg-white/50 rounded-full relative">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-white"></div>
                 </div>
                 <span>+</span>
                 <span>100%</span>
             </div>
         </div>
      </div>
    </div>
  );
};

export default WordView;