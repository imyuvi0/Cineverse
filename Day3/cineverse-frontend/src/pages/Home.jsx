import { useEffect } from "react";
import api from "../services/api";

function Home() {

  useEffect(() => {
    api.get("/posts/1")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>🎬 Cineverse</h1>

      <p>
        Welcome to the Movie Portal
      </p>
    </div>
  );
}

export default Home;