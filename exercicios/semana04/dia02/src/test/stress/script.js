import { check } from 'k6';
import http from 'k6/http';

const timing = 1000
export const options = {
  vus: 1000,
  duration: '30s',
};
export default function () {
  // const res = http.get(url);
  const req1 = {
    method: 'GET',
    url: 'http://localhost:3000/user',
  }

 /*  const req2 = {
    method: 'GET',
    url: 'http://localhost:3000/user/6269223784d0b5ab84c87c0f',
  } */

   /* const req3 = {
     method: 'POST',
     url: 'http://localhost:3000/user',
     body: JSON.stringify({
         name: "Gustavo Prado-expresss 1",
         email: "contato@contato.com.br"
     }),
     params: {
       headers: { 'Content-Type': 'application/json' },
     },
   } */

  const responses = http.batch([req1])

  for (let index = 0; index < responses.length; index++) {
    const element = responses[index];
    check(element, {
      'is status 200 || 201': (r) => r.status === 200 || 201,
      'is timings request duration': (r) => r.timings.duration <= timing,
    })
  }

}