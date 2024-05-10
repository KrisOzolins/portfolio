import client from '../utils/api/client';
import config from '../../config';

const BASE_URL = `/comments`;

const getComments = async () => {
  try {
    const response = await client.get(BASE_URL);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching comments:', error);
    throw error;
  }
};

const createComment = async (commentContent) => {
  try {
    const response = await client.post(BASE_URL, commentContent);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

const updateComment = async (id, newContent) => {
  try {
    const response = await client.put(`${BASE_URL}/${id}`, newContent);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

const deleteComment = async (id) => {
  try {
    const response = await client.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export { getComments, createComment, updateComment, deleteComment };
