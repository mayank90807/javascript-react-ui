import axios from 'axios';

const callApi = async ({
  path,
  method,
  data = {},
  headers = {},
  params = {},
}) => {
  const BaseUrl = process.env.REACT_APP_DOMAIN;
  const Prefix = '/api';
  const url = BaseUrl + Prefix + path;
  const response = await axios({
    url,
    method,
    data,
    headers,
    params,
  });
  return response;
};

export const getApiRequest = ({ path, params }) => callApi({ path, method: 'get', params });

export const postApiRequest = ({ path, data, params = {} }) => callApi({
  path,
  method: 'post',
  params,
  data,
});

export const putApiRequest = ({ path, data }) => callApi({ path, method: 'put', data });

export const deleteApiRequest = ({ path, data }) => {
  const { id } = data;
  const url = `${path}/${id}`;
  return callApi({ path: url, method: 'delete' });
};

export default callApi;
