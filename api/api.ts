import { ImagesResponseType } from '@/types';
import axios from 'axios';

const API_KEY = '43414397-299d6c7d54318d7997dab011d';

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formateUrl = (params: any) => {
  let url = apiUrl + '&per_page=25&safesearch=true&editors_choice=true';
  if (!params) {
    return url;
  }
  let paramKeys = Object.keys(params);
  paramKeys.map(key => {
    let value = key === 'q' ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  return url;
};

export const apiCall = async (params: any) => {
  try {
    const response = await axios.get<ImagesResponseType>(
      formateUrl(params),
    );
    const { data } = response;

    return { success: true, data };
  } catch (err) {
    console.log('got error: ', err);
  }
};
