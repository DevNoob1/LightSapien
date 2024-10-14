import React from 'react';
import '../App.css'

import { MangaData } from '../data/mangaData';

interface BookListProps {
    mangaData: MangaData;
    onSelectBook: (book: string) => void;
    selectedBook: string | null;
}

const BookList: React.FC<BookListProps> = ({ mangaData, onSelectBook, selectedBook }) => {
    return (
        <div>
            <h2>Select a Book</h2>
            <ul>
                {Object.keys(mangaData).map((book) => (

                    <button key={book}
                        onClick={() => onSelectBook(book)}
                        style={{
                            backgroundColor: selectedBook === book ? 'lightblue' : 'white',
                            border: '1px solid #ccc',
                            padding: '10px',
                            margin: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {book.replace(/_/g, ' ')}
                    </button>

                ))}
            </ul>
        </div>
    );
};

export default BookList;
