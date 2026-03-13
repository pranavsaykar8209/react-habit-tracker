import React, { useState, useRef } from 'react';
import Calendar from './components/Calendar';
import initialProgress from './progress.json';
import html2canvas from 'html2canvas';
import './styles.css';

function App() {
  const [progress, setProgress] = useState(initialProgress || {});
  const [isExporting, setIsExporting] = useState(false);
  const calendarRef = useRef(null);

  const year = 2026;
  
  // Calculate today based on current system time
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const handleToggleClick = (dateStr, currentStatus) => {
    setProgress(prev => {
      const newProg = { ...prev };
      if (currentStatus === 'completed') {
        delete newProg[dateStr];
      } else {
        newProg[dateStr] = 'completed';
      }
      return newProg;
    });
  };

  const markTodayComplete = () => {
    setProgress(prev => {
      return { ...prev, [todayStr]: 'completed' };
    });
  };

  const resetToday = () => {
    setProgress(prev => {
      const newProg = { ...prev };
      delete newProg[todayStr];
      return newProg;
    });
  };

  const downloadImageHelper = (dataUrl, promptText = "habit_calendar") => {
    // 1. Generate Timestamp (YYYY-MM-DD-HH-MM)
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    
    const timestamp = `${yyyy}-${mm}-${dd}-${hh}-${min}`;
    
    // 2. Sanitize prompt text for filename
    const safePrompt = promptText.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const fileName = `${safePrompt}_${timestamp}.png`;
    
    // 3. Trigger Download
    // Note: Browsers run in a sandbox for security. They cannot write directly to absolute 
    // paths like /Users/... silently. It will download to your default 'Downloads' folder.
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportWallpaper = async () => {
    if (!calendarRef.current) return;
    setIsExporting(true);
    
    setTimeout(async () => {
      try {
        const elem = calendarRef.current;
        // Apply temporary styles for 4K export
        elem.style.width = '3840px';
        elem.style.height = '2160px';
        elem.style.position = 'fixed';
        elem.style.top = '0';
        elem.style.left = '0';
        elem.style.backgroundColor = '#000000';
        elem.style.fontSize = '32px'; // Scale up the calendar via em units
        elem.style.zIndex = '-1'; // Prevent flickering over screen
        elem.style.paddingTop = '250px'; // Add margin/padding from the top solely for the wallpaper
        
        const canvas = await html2canvas(elem, {
          width: 3840,
          height: 2160,
          scale: 1, // Final image native 3840x2160
          backgroundColor: '#000000',
          logging: false
        });
        
        // Restore styles
        elem.style.width = '';
        elem.style.height = '';
        elem.style.position = '';
        elem.style.top = '';
        elem.style.left = '';
        elem.style.backgroundColor = '';
        elem.style.fontSize = '';
        elem.style.zIndex = '';
        elem.style.paddingTop = '';
        
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        downloadImageHelper(dataUrl, "habit_calendar");
        
      } catch (err) {
        console.error('Failed to export wallpaper', err);
      } finally {
        setIsExporting(false);
      }
    }, 150);
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(progress, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `progress-${year}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setProgress(parsed);
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  return (
    <div className="app-container">
      {!isExporting && (
        <div className="controls">
          <button onClick={markTodayComplete}>Mark Today Complete</button>
          <button onClick={resetToday}>Reset Today</button>
          <button onClick={exportWallpaper}>Export Wallpaper</button>
          <button onClick={exportJSON}>Export JSON</button>
          <label className="button">
            Import JSON
            <input 
              type="file" 
              accept=".json" 
              onChange={importJSON} 
              style={{ display: 'none' }} 
            />
          </label>
        </div>
      )}
      
      <div 
        className="wallpaper-canvas" 
        ref={calendarRef} 
      >
        <Calendar 
          year={year} 
          progress={progress} 
          onToggleClick={handleToggleClick} 
          todayStr={todayStr} 
        />
      </div>
    </div>
  );
}

export default App;
