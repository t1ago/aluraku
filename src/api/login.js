export const authentication = async (githubUser) => {
  const serverData = await fetch('https://alurakut.vercel.app/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ githubUser: githubUser })
  });

  return await serverData.json();
}

export const verify = async (token) => {
  const serverData = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      'Authorization': token
    }
  });

  return await serverData.json();
}