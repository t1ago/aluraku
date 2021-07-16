
import React from 'react';
import Box from "../src/components/Box";
import BoxLinkItem from '../src/components/BoxLinkItem';
import MainGrid from "../src/components/MainGrid";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

const ProfileSideBar = (props) => {
  return (
    <Box>
      <img src={`https://github.com/${props.userName}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" target="_blank" href={`https://github.com/${props.userName}`}>
          @{props.userName}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const handleNewCommunity = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const newCommunity = {
      link: `/community/${data.get('title')}`,
      name: data.get('title'),
      image: data.get('image')
    }

    const savedCommunity = await fetch('/api/createCommunity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCommunity)
    });

    newCommunity.id = savedCommunity.id;
    setCommunity([...communities, newCommunity]);
    event.target.reset();
  }

  const githubUser = 't1ago';
  const [communities, setCommunity] = React.useState([]);
  const [peopleFavorite, setPeopleFavorite] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);


  React.useEffect(async () => {
    let data = await fetch('/api/listAllFollowers')
    data = await data.json();
    setFollowers(data.map((value) => {
      return {
        id: value.id,
        link: value.html_url,
        image: `${value.html_url}.png`,
        name: value.login
      }
    }))

    console.log(data);
    data = await fetch('/api/listAllCommunities');
    data = await data.json();
    setCommunity(data.map((value) => {
      return {
        id: value.id,
        link: value.link,
        image: value.imageUrl,
        name: value.title
      }
    }))

    data = await fetch('/api/listAllPeopleFromCommunities');
    data = await data.json();
    setPeopleFavorite(data.map((value) => {
      return {
        id: value.id,
        link: value.link,
        image: value.imageUrl,
        name: value.title
      }
    }));
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar userName={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo, {githubUser}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que deseja fazer?</h2>
            <form onSubmit={(e) => handleNewCommunity(e)}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="" />
              </div>
              <div>
                <input
                  placeholder="Coloque uma imagem para a capa"
                  name="image"
                  aria-label="" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <BoxLinkItem title={`Meu${followers.length > 1 ? 's' : ''} seguidore${followers.length > 1 ? 's' : ''}`} items={followers} />

          <BoxLinkItem title={`Meus amigo${peopleFavorite.length > 1 ? 's' : ''}`} items={peopleFavorite} />

          <BoxLinkItem title={`Minha${communities.length > 1 ? 's' : ''} comunidade${communities.length > 1 ? 's' : ''}`} items={communities} />

        </div>
      </MainGrid>
    </>
  )
}
