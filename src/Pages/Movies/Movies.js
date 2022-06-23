import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Movies = () => {

   const [genres, setGenres] = useState([]);
   const [selectedGenres, setSelectedGenres] = useState([]);
   const [page, setPage] = useState(1);
   const genreforURL = useGenre(selectedGenres);
   const [content, setContent] = useState([]);
   const [numOfPages, setNumOfPages] = useState();

   const fetchMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      ); 
      
      setContent(data.results);
      setNumOfPages(data.total_pages);
      //console.log(data);
    };

    useEffect(() => {
      window.scroll(0, 0);
      fetchMovies();
    }, [page, genreforURL]);
    
   return( 
      <div>
         <span className="pageTitle">Discover Movies</span>
         <Genres
            type="movie"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
         />
         <div className="trending">
            {content &&
               content.map((c) => (
                  <SingleContent
                  key={c.id}
                  id={c.id}
                  poster={c.poster_path}
                  title={c.title || c.name}
                  date={c.first_air_date || c.release_date}
                  media_type="movie"
                  vote_average={c.vote_average}
                  />
               ))}
         </div>

         {numOfPages > 1 && (
         <CustomPagination setPage={setPage} />
         )}
    </div>
   );
}

export default Movies;