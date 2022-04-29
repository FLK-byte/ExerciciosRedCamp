import { check } from 'k6';
import http from 'k6/http';

const timing = 5000
export const options = {
  stages: [
    { duration: '10s', target: 100 },
    /* { duration: '40s', target: 150 },
    { duration: '10s', target: 50 }, */
  ],
};
export default function () {0
  // const res = http.get(url);
  const req1 = {
    method: 'GET',
    url: 'http://localhost:3000/user',
  }

  const req2 = {
    method: 'GET',
    url: 'http://localhost:3000/user/626920587dd3a8e058dc4440',
  }

   /* const req3 = JSON.stringify({
     method: 'POST',
     url: 'http://localhost:3000/user',
     body: JSON.stringify({
         name: "Gustavo Prado-expresss 1",
         email: "contato@contato.com.br"
     }),
     params: {
       headers: { 'Content-Type': 'application/json' },
     },
   }) */

  const responses = http.batch([req1, req2])

  for (let index = 0; index < responses.length; index++) {
    const element = responses[index];
    check(element, {
      'is status 200 || 201': (r) => r.status === 200 || 201,
      'is timings request duration': (r) => r.timings.duration <= timing,
    })
  }

}