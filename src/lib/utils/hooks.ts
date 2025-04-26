export async function useFetch() {
  const apiKey = "AIzaSyDt8lur7UCIe5QA_WFlEZkMG0hm5cPJTsE";
  const spreadsheetId = "1n9Bp5-CfU7-U_B10s3nYq3WUfUbyV-UgdAgjFkJ-XlA";

  let header: string[] | undefined = [];
  let featuredList: string[][] = [];

  function handleResponse(restaurantsObject: object) {
    // eslint-disable-next-line
    const tempArray: [][] = Object.values(restaurantsObject)[2];
    header = tempArray.shift();

    featuredList = tempArray.slice(0, 4);
  }

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E?key=${apiKey}`,
  )
    .then((response) => response.json())
    .then(
      (restaurantsObject: object) =>
        (featuredList = Object.values(restaurantsObject)[2]),
    )
    .catch((err) => {
      console.error(err);
    });

  return featuredList;
}
