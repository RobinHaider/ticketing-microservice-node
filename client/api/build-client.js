import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are in server
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local:81',
      headers: req.headers,
    });
  } else {
    //we are in browser
    return axios.create({
      baseURL: '/',
    });
  }
};
