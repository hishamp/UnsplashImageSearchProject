import { useTabContext } from "@mui/base";
import { Search } from "@mui/icons-material";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../context/image-context";

const HomePage = () => {
  const inputRef = useRef();
  let navigate = useNavigate();
  let { searchImage } = useContext(ImageContext);
  const searchHandler = () => {
    if (inputRef.current.value.trim() === "") {
      return;
    } else {
      searchImage(inputRef.current.value).then(() => {
        navigate(`/query=${inputRef.current.value}&page=1`);
      });
    }
  };
  return (
    <Grid
      spacing={0}
      container
      display="table"
      alignContent="center"
      justifyContent="center"
    >
      <Grid item xs={12} textAlign="center" marginTop={10}>
        <Typography variant="h2">Seach Images</Typography>
      </Grid>
      <Grid item xs={12} paddingLeft={70} marginTop={20}>
        <TextField
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHandler();
            }
          }}
          inputRef={inputRef}
          variant="outlined"
          label="search"
          sx={{ width: 400 }}
        />
        <IconButton
          sx={{ background: "lightblue", height: 50, width: 50, ml: 2 }}
          onClick={() => {
            searchHandler();
          }}
        >
          <Search />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default HomePage;
