export class WebAPIError extends Error {
  constructor(status, response) {
    super('API error occurred');

    this.name = 'WebAPIError';
    this.status = status;
    this.response = response;
  }
}

const stub = () => new Promise((resolve) => (
  setTimeout(() => resolve('stub'), 200)));

function queryString(object) {
  const query = Object.keys(object).reduce((acc, key) => {
    const item = object[key];
    if (key === 'filter' && typeof object[key] === 'object' && object[key] !== null) {
      Object.keys(item).forEach((itemKey) => {
        acc.push([`${itemKey}`, item[itemKey]].join('='));
      });
    } else {
      acc.push([key, item].map(encodeURIComponent).join('='));
    }
    return acc;
  }, []);
  return query.length > 0 ? `?${query.join('&')}` : '';
}

export default async function(data = {}, url = '', method = 'GET') {
  if (!url) return stub();

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  let body = null;

  if ((method.toUpperCase() === 'GET') || (method.toUpperCase() === 'HEAD')) {
    url += queryString(data);
  } else {
    headers.append('Content-Type', 'application/json');
    body = JSON.stringify(data);
  }

  const requestParams = { method, headers };
  if (body) requestParams.body = body;

  try {
    const response = await fetch(url, requestParams);
    if (response.status === 404) {
      throw new WebAPIError(response.status, { error: 'Page not found', type: 'ERROR' });
    } else if (!response.ok) {
      throw new WebAPIError(response.status, JSON.parse(await response.text()));
    }

    // don't use response.json(). There are problems with responses without body
    const responseText = await response.text();

    if (responseText.length > 0) {
      return JSON.parse(responseText);
    }
  } catch (err) {
    let error = '';
    Object.keys(err).forEach((key) => {
      error += `${err[key]}`;
    });
    throw new WebAPIError(null, { error, type: 'ERROR' });
  }

  return null;
}
