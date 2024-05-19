import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzBmMWE5Yjc3ZGNhMTA0YTA2YTcyNmQxNzY0ZThhNiIsInN1YiI6IjY2M2RkNGExNTY2MTI4MGQ3ZGZiMDNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uaUIdeHUM4UfM_NYuYDYJXWvDw9hOA43SqfCHU8mQFQ'
      }
})

export default instance;