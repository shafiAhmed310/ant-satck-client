import axios from 'axios';

const http = axios.create({
   //  baseURL:'http://localhost:5000',
    baseURL:'https://ant-stack.herokuapp.com'

});

export default http;