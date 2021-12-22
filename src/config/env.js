import {DEV_BACKEND_URL, PROD_BACKENED_URL} from '@env';

const devEnvironmentVariables = { 
    DEV_BACKEND_URL,
}
const prodEnvironmentVariables = {
    PROD_BACKENED_URL,
}

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;