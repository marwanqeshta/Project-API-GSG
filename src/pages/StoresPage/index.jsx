import React, { useState ,useEffect } from 'react';
import './style.css'
import Table from '../../component/Table';
import { Navigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import { STORES_COLUMNS } from '../../constants/stores';
import { Container } from './../../component/Container/index';
import axios from "axios";

const StoresPage = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowId, setRowId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetch('https://some-data.onrender.com/stores')
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    console.log(id, 'is deleted');
    try {
      await axios.delete(`https://some-data.onrender.com/stores/${id}`);
      setStores(prevStores => prevStores.filter(data => data.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => {
    console.log(id, 'is edited');
    setEditId(id);
  };

  const handleView = (row) => {
    console.log(row.id, 'is viewed');
    setRowId(row.id);
  };

  return (
    <Container>
      <h1>Stores</h1>

      <button onClick={() => setIsCreating(true)}>
        Create Store
      </button>

      <Table
        columns={STORES_COLUMNS(handleDelete, handleEdit)}
        data={stores}
        onRowClick={handleView}
        isLoading={isLoading}
      />

      {rowId && <Navigate to={`${rowId}`} replace />}
      {editId && (
        <Navigate
          to={PATHS.STORES.EDIT.replace(':id', editId)}
          replace
        />
      )}
      {isCreating && <Navigate to={PATHS.STORES.CREATE} replace />}
    </Container>
  );
}

export default StoresPage;
