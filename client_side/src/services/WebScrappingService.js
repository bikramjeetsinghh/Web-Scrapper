import axios from 'axios';

import {apiEndPoint} from '../ApiEndPoint';
import {urls} from '../constants/urls';

const getWebScrappedData = (websiteAddress) => {
    const url = `${apiEndPoint}${urls.getWebScrappedData}`
    return axios.get(url, {params:{websiteAddress}});
}

export const WebScrappingService =  {
    getWebScrappedData
} 