import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import { api } from '../services/api';

interface Genre {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  }

interface GenresContext {
    genres: Genre[];
    selectedGenre: Genre;
    selectedGenreId: number;
    updateSelectedGenreId: (id: number) => void;
}

interface GenreProviderProps {
    children: ReactNode
}

const GenresContext = createContext<GenresContext>({} as GenresContext);

export const GenreContextProvider = ({children}: GenreProviderProps) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    useEffect(() => {
        api.get<Genre[]>('genres').then(response => {
          setGenres(response.data);
        });
      }, []);

    useEffect(() => {
        api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        });
    }, [selectedGenreId]);

    const updateSelectedGenreId = (id: number) => setSelectedGenreId(id);

    return (
        <GenresContext.Provider 
            value={{
                genres, 
                selectedGenre, 
                selectedGenreId, 
                updateSelectedGenreId
            }}
        >
            {children}
        </GenresContext.Provider>
    );
}

export const useGenres = () => {
    return useContext(GenresContext);
}