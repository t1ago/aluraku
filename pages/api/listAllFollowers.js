export default async (request, response) => {
  const serverData = await fetch('https://api.github.com/users/peas/followers');
  const result = await serverData.json();
  response.json(result);
}