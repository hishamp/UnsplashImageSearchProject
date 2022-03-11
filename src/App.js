import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Progress from "./components/progress";
import { ImageContext } from "./context/image-context";
import Router from "./routes/routes";

function App() {
  console.log("app");
  const params = useParams();
  const client_id = "EBLn2NletWFQdv0J5EBJlBJh0cGMH70ugfgrU2qOe1E";
  const [loading, setLoading] = useState(false);
  const [imageList, setImageList] = useState({
    total_pages: 0,
    results: [],
    total: 0,
  });
  const searchImage = useCallback(
    async (query, pageno = 1) => {
      setLoading(true);
      axios
        .get(
          `https://api.unsplash.com/search/photos?page=${pageno}&per_page=20&query=${query}&client_id=${client_id}`
        )
        .then((res) => {
          setImageList(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error", err);
        });
    },
    []
  );
  return (
    <ImageContext.Provider
      value={{
        imageList: imageList,
        searchImage: searchImage,
        loading: loading,
      }}
    >
      <Router />
      <Progress />
    </ImageContext.Provider>
  );
}

export default App;
