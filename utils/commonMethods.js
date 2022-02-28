const arrayUrlParameters = (array, key) => {
  return array.map(function (el, index) {
    return `${key}[${index}]=${el}`;
  }).join('&');
}
