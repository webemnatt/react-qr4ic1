const PERIOD_URL =
  'https://globorural-api-gcp-dev.apps.tsuru.dev.gcp.i.globo/api/v1/series';
const QUOTE_URL =
  'https://globorural-api-gcp-dev.apps.tsuru.dev.gcp.i.globo/api/v1/quotes?symbols[]=';

function total(arr) {
  return arr.reduce((acc, actual) => acc + actual.value, 0).toFixed(2);
}

function convertUnixTimestampToDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return {
    minutes,
    hours,
    day,
    month,
    year,
  };
}

function convertToUnixTimestamp(date) {
  const isoDateString = new Date(date).toISOString();
  const unixTimestamp = new Date(isoDateString).getTime() / 1000;

  return unixTimestamp;
}

function sortAndFormattedData(data) {
  return data
    .sort((a, b) => a.timepoint - b.timepoint)
    .map((item) => ({
      time: convertToUnixTimestamp(item.timepoint),
      value: item.sessionLast,
    }));
}

export async function getPeriodLastThirtyDays({ symbol, origin }) {
  try {
    if (symbol) {
      const response = await fetch(`${PERIOD_URL}/${origin}/${symbol}/1-month`);
      const data = await response.json();

      const formattedData = sortAndFormattedData(data);
      const sessionLastTotal = total(formattedData);
      const lastUpdateTime = convertUnixTimestampToDate(
        formattedData.pop().time
      );

      return {
        formattedData,
        sessionLastTotal,
        lastUpdateTime,
      };
    }
  } catch (err) {
    console.info(err);
  }
}
