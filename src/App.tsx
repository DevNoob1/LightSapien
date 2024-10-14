// src/App.tsx
import React, { useState } from 'react';
import BookList from './components/BookList';
import './App.css';
import mangaData from './data/mangaData';

const App: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSelectBook = (book: string) => {
    setSelectedBook(book);
    setSelectedChapter(null);
    setCurrentImageIndex(0);
  };

  const handleSelectChapter = (chapterIndex: number) => {
    if (selectedBook) {
      setSelectedChapter(chapterIndex);
      const imagesPerChapter = 5;
      setCurrentImageIndex(chapterIndex * imagesPerChapter); // First page of selected chapter
    }
  };

  const handleNextPage = () => {
    if (selectedBook && selectedChapter !== null) {
      const imagesPerChapter = 5;
      const totalChapters = mangaData[selectedBook].chapter_ids.length;

      if (currentImageIndex < (selectedChapter + 1) * imagesPerChapter - 1) {
        setCurrentImageIndex(prevIndex => prevIndex + 1);
      } else if (selectedChapter < totalChapters - 1) {
        setSelectedChapter(prevChapter => prevChapter! + 1);
        setCurrentImageIndex((selectedChapter + 1) * imagesPerChapter);
      }
    }
  };

  const handlePrevPage = () => {
    if (selectedBook && selectedChapter !== null) {
      const imagesPerChapter = 5;

      if (currentImageIndex > selectedChapter * imagesPerChapter) {
        setCurrentImageIndex(prevIndex => prevIndex - 1);
      } else if (selectedChapter > 0) {
        setSelectedChapter(prevChapter => prevChapter! - 1);
        const previousChapterEndIndex = (selectedChapter - 1) * imagesPerChapter + (imagesPerChapter - 1);
        setCurrentImageIndex(previousChapterEndIndex);
      }
    }
  };

  const imagesPerChapter = 5;
  const totalPages = selectedBook && selectedChapter !== null ?
    (mangaData[selectedBook].chapter_ids.length * imagesPerChapter) : 0;

  return (
    <div>
      <BookList
        mangaData={mangaData}
        onSelectBook={handleSelectBook}
        selectedBook={selectedBook}
      />
      {selectedBook && (
        <div>
          <h2>Chapters</h2>
          <ul>
            {mangaData[selectedBook].chapter_ids.map((chapterId, index) => (
              <button key={chapterId}
                onClick={() => handleSelectChapter(index)}
                style={{
                  backgroundColor: selectedChapter === index ? 'lightgreen' : 'white',
                  border: '1px solid #ccc',
                  padding: '10px',
                  margin: '5px',
                  cursor: 'pointer'
                }}
              >
                Chapter {chapterId}
              </button>
            ))}
          </ul>

          {selectedChapter !== null && (
            <div>
              <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                <button
                  className='prev-button'
                  onClick={handlePrevPage}
                  disabled={currentImageIndex === 0 && selectedChapter === 0}
                >
                  Previous
                </button>

                <span style={{ alignSelf: 'center' }}>
                  Page {currentImageIndex + 1} / {totalPages}
                </span>

                <button
                  className='next-button'
                  onClick={handleNextPage}
                  disabled={currentImageIndex >= (selectedChapter + 1) * imagesPerChapter - 1 && selectedChapter === mangaData[selectedBook].chapter_ids.length - 1}
                >
                  Next
                </button>
              </div>
              <img src={mangaData[selectedBook].totalImages[currentImageIndex]} alt={`Page ${currentImageIndex}`} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
