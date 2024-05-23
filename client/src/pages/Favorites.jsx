import React, { useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_DATA } from '../utils/queries'; 
import { REMOVE_ART } from "../utils/mutations";

const Favorites = () => {
    const { loading, error, data, refetch } = useQuery(GET_USER_DATA); 

    const [removeArt] = useMutation(REMOVE_ART, {
        refetchQueries: [{ query: GET_USER_DATA }] 
    });

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8">Error: {error.message}</p>;

  const favorites = data.me.savedArt;
  const username = data.me.username;

  const handleRemoveArt = async (artId) => {
    try {
      await removeArt({
        variables: { artId },
      });
      refetch();
    } catch (error) {
      console.error("Error removing artwork:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-44 pb-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Favorites</h2>
      <p>Hello, {username }!</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {favorites.map((art) => (
          <li
            key={art.id}
            className="flex flex-col justify-between p-4 border border-gray-300 rounded-lg shadow-lg bg-white h-full"
          >
            <div>
              <div className="mb-2">
                {art.artist_titles && (
                  <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-md mr-2 mb-1">
                    {art.artist_titles}
                  </span>
                )}
              </div>
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-center">
                {art.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {art.description}
              </p>
            </div>
            <button
              onClick={() => handleRemoveArt(art.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 self-center"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
