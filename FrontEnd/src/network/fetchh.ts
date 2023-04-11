export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  //   console.log(response);
  if (response.ok) {
    return response;
  } else {
    throw Error("something went wrong while fetching the data");
  }
};
