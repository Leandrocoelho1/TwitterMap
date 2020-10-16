import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888/',
});

export function fetchRules() {
  return api.get('/rules');
}

export function fetchConnections() {
  return api.get('/connections');
}

export function createRule(ruleValue) {
  return api.post('/rules', { value: ruleValue });
}

export function deleteRule(id) {
  return api.delete(`/rules/${id}`);
}
