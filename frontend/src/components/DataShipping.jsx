// src/pages/DataShipping.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DataShipping() {
  const [shippings, setShippings] = useState([]);

  useEffect(() => {
    getShippings();
  }, []);

  const getShippings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/shipping');
      setShippings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Shipping</h3>
        {/* ✅ Tombol Tambah Data Shipping */}
        <Link to="/AddShipping" className="btn btn-success">
          + Tambah Data Shipping
        </Link>
      </div>

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>No</th>
            <th>Region</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {shippings.length > 0 ? (
            shippings.map((ship, index) => (
              <tr key={ship.id}>
                <td>{index + 1}</td>
                <td>{ship.region}</td>
                <td>Rp {parseInt(ship.cost).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Belum ada data shipping
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
