import React, { useState, useEffect } from 'react';


const GetAllAudioAlbums = () => {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState({ AlbumName: '', ablum_banner: '' });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        // 'http://ec2-15-207-196-141.ap-south-1.compute.amazonaws.com:8080/v1/album/getall'
        `${apiUrl}/album/getall`
        );
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://ec2-15-207-196-141.ap-south-1.compute.amazonaws.com:8080/v1/album/createalbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Album created successfully');
        fetchAlbums();
      } else {
        alert('Error creating album');
      }
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(
        `${'http://ec2-15-207-196-141.ap-south-1.compute.amazonaws.com:8080/v1/album/update'}/${id}`
        
        , {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Album updated successfully');
        fetchAlbums();
      } else {
        alert('Error updating album');
      }
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        // `http://ec2-15-207-196-141.ap-south-1.compute.amazonaws.com:8080/v1/album/delete/${id}`
        `${apiUrl}/album/delete/${id}`
        , {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Album deleted successfully');
        fetchAlbums();
      } else {
        alert('Error deleting album');
      }
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };                                                                                
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`http://ec2-15-207-196-141.ap-south-1.compute.amazonaws.com:8080/v1/album/delete/${id}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (response.status === 204) {
  //       alert('Album deleted successfully');
  //       fetchAlbums();
  //     } else if (response.status === 404) {
  //       alert('Album not found'); // Handle other status codes as needed
  //     } else {
  //       alert('Error deleting album');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting album:', error);
  //   }
  // };
  

  return (
    <div>
      <h1>Albums</h1>
      <table>
        <thead>
          <tr>
            
            <th>Album Name</th>
            <th>Album Banner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.AlbumName}</td>
              <td>
                <img src={album.album_banner} alt={album.AlbumName} style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>
                <button onClick={() => handleUpdate(album.id)}>Update</button>
                <button onClick={() => handleDelete(album.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllAudioAlbums;

