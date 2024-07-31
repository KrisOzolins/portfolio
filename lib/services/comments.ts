// Comments service, non-class based example.
import client from '../utils/api/client';
import config from '../../config';

const BASE_URL = `/comments`;

const getComments = async () => {
  try {
    const response = await client.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

const createComment = async (postId: number, commentContent: any, cookie = '') => {
  try {
    const response = await client.post(`/posts/${postId}/comments`, commentContent, {
      withCredentials: true,
      headers: {
        Cookie: cookie ? cookie : null,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

const updateComment = async (id: number, newContent: string) => {
  try {
    const response = await client.put(`${BASE_URL}/${id}`, newContent);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

const deleteComment = async (id: number) => {
  try {
    const response = await client.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export { getComments, createComment, updateComment, deleteComment };
