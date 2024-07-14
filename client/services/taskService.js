import axios from "./axiosConfig";

export const getAllTask = async () => {
  try {
    const response = await axios.get('/tasks');
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Something went wrong")
    }
  } catch (error) {
    throw new Error(error?.message || error)
  }
}

export const getTask = async (id) => {
  try {
    const response = await axios.get(`/tasks/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Something went wrong")
    }
  } catch (error) {
    throw new Error(error?.message || error)
  }
}

export const createTask = async (data) => {
  const response = await axios.post('/tasks', data);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Something went wrong")
  }
}

export const updateTask = async (id, data) => {
  try {
    const response = await axios.put(`/tasks/${id}`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Something went wrong")
    }
  } catch (error) {
    throw new Error(error?.message || error)
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`/tasks/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Something went wrong")
    }
  } catch (error) {
    throw new Error(error?.message || error)
  }
}