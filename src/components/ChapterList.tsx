import React from 'react'; import '../App.css'

interface ChapterListProps {
    chapters: number[];
    onSelectChapter: (chapter: number) => void;
    selectedChapter: number | null;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, onSelectChapter, selectedChapter }) => {
    return (
        <div>
            <h3>Chapters</h3>
            <div className="chapter-list">
                {chapters.map((chapter) => (
                    <button
                        key={chapter}
                        className={`chapter-button ${selectedChapter === chapter ? 'active' : ''}`}
                        onClick={() => onSelectChapter(chapter)}
                    >
                        Chapter {chapter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChapterList;
