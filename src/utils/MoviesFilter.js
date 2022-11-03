import { DURATION } from "../constants/config";

function _findAllShortMovies(list) {
  return list.filter((item) => item.duration <= DURATION);
}

function _filterByShortMoviesCheckbox(list, isShort) {
  if (isShort) {
    return _findAllShortMovies(list);
  } else {
    return list;
  }
}

function _filterByName(list, name) {
  return list.filter(
    (item) =>
      (item.nameRU !== null && item.nameRU.toLowerCase().includes(name.toLowerCase())) ||
      (item.nameEN !== null && item.nameEN.toLowerCase().includes(name.toLowerCase()))
  );
}

export default function findAllRightMovies(list, isShort, name) {
  return _filterByName(_filterByShortMoviesCheckbox(list, isShort), name);
}
