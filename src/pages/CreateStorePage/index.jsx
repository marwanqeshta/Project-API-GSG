import React, { useState } from 'react';
import { H1 } from '../../component/Typography';
import Container from '../../component/Container';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import StoreForm from '../../component/StoreForm';
import axios from "axios";

const CreateStorePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoToListPage, setIsGoToListPage] = useState(false);

  const handleCreateStore = async (body) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        'https://some-data.onrender.com/stores',
        body
      );
      setIsLoading(false);
      setIsGoToListPage(true);

      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Container>
        <H1>Create Store</H1>

        <StoreForm
          handleSubmit={handleCreateStore}
          isLoading={isLoading}
        />
      </Container>
      {isGoToListPage && <Navigate to={PATHS.STORES.ROOT} />}
    </div>
  );
}

export default CreateStorePage;
