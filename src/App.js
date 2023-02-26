import { Spinner, Container, Row, Button, Input, Alert } from "reactstrap";
import { GoSearch } from "react-icons/go";
import { useState, useEffect } from "react";
import Photo from "./Photo";

const api_key = "HFk_BSMCeBcMuq_zwrLPkwn_elCslj1zUnugWpo2ZHU";
const urlBase = `https://api.unsplash.com/photos/?client_id=${api_key}`;
const urlQuery = `https://api.unsplash.com/search/photos/?client_id=${api_key}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(false);

  const handlerForm = (e) => {
    e.preventDefault();
    fetchDat();
  };

  const fetchDat = async () => {
    setLoading(true);
    let url;
    if (searchTerm) url = `${urlQuery}&page=${page}&query=${searchTerm}`;
    if (!searchTerm) url = `${urlBase}&page=${page}`;
    try {
      const resp = await fetch(`${url}`);
      const data = await resp.json();

      setPhotos(() => {
        if (searchTerm) {
          if (scroll) {
            setScroll(false);
            return [...photos, ...data.results];
          }
          if (!scroll) return [...data.results];
        }

        return [...photos, ...data];
      });

      setScroll(false);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!scroll) return;
    if (loading) return;
    setPage((page) => page + 1);
  }, [scroll]);

  useEffect(() => {
    fetchDat();
  }, [page]);

  const event = () => {
    const scrollDown =
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 2;
    if (scrollDown) return setScroll(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", event);
    return () => document.removeEventListener("scroll", event);
  }, []);

  return (
    <>
      <Container className=" text-center">
        <h1 className="text-center mt-5 mb-5">Tars Image Gallery</h1>
        <form className="mb-5" onSubmit={handlerForm}>
          <Input
            type="text"
            placeholder="Search images"
            className="input"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button color="primary" className="search">
            <GoSearch />
          </Button>
        </form>

        <Row md="3" sm="2" xs="1">
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
          {loading && (
            <Spinner className="spinner loading" color="primary">
              Loading....!
            </Spinner>
          )}
        </Row>

        {error && <Alert color="danger">Error while fetching data from API..!</Alert>}
      </Container>
    </>
  );
}

export default App;
