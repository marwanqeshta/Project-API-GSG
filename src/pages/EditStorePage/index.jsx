import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { H1 } from '../../component/Typography';
import Container from '../../component/Container';
import { PATHS } from '../../router/paths';
import { Navigate } from 'react-router-dom';
import StoreForm from '../../component/StoreForm';
import axios from "axios";


const EditStorePage = () => {
  const { id } = useParams(); 
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGotToListPage, setIsGotToListPage] = useState(false);

  useEffect(() => {
    fetch(`https://some-data.onrender.com/stores/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStore(data);
        setIsLoading(false);
      });
  }, [id]);

  const handleEditStore = async (body) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `https://some-data.onrender.com/stores/${id}`,
        body
      );
      console.log(res.data);
      setStore(res.data);
      setIsLoading(false);
      setIsGotToListPage(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <H1>Edit Store {id}</H1>

        <StoreForm
          store={store}
          handleSubmit={handleEditStore}
          isLoading={isLoading}
        />
      </Container>

      {isGotToListPage && (
        <Navigate to={PATHS.STORES.ROOT} replace />
      )}
    </div>
  );
}

export default EditStorePage;
