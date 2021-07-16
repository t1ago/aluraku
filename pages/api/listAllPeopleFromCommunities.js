
const TOKEN_READONLY = '6b0f248d2420b75ab997904148783e';



export default async (request, response) => {
  const serverData = await fetch('https://graphql.datocms.com', {
    method: 'POST',
    headers: {
      'Authorization': TOKEN_READONLY,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'query': `{
        allPeople {
          id,
          name,
          link,
          imageUrl
        }
      } `})
  });

  const result = await serverData.json();
  response.json(result?.data?.allPeople || []);
}


