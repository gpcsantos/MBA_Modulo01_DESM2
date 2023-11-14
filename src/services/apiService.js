import { read } from "./httpService";

export async function apiGetCities() {
  const allCities = await read("/cities");
  return allCities;
}
export async function apiGetCandidates() {
  const allCandidates = await read("/candidates");
  return allCandidates;
}
export async function apiGetElection() {
  const allElection = await read("/election");
  return allElection;
}
