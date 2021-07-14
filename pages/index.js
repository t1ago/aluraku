
import React from 'react';
import Box from "../src/components/Box";
import BoxLinkItem from '../src/components/BoxLinkItem';
import MainGrid from "../src/components/MainGrid";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import communitiesMock from "../src/mock/communitiesMock.json";
import peopleMock from "../src/mock/peopleMock.json";

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
  const handleNewCommunity = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const newCommunity = {
      id: new Date().toISOString(),
      link: `/community/${data.get('title')}`,
      name: data.get('title'),
      image: data.get('image')
    }

    setNewCommunity([...communities, newCommunity]);
    event.target.reset();
  }

  const githubUser = 't1ago';
  const [communities, setNewCommunity] = React.useState(Array.from(communitiesMock));
  const peopleFavorite = Array.from(peopleMock);


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

          <BoxLinkItem title={`Meus amigo${peopleFavorite.length > 1 ? 's' : ''}`} items={peopleFavorite} />

          <BoxLinkItem title={`Minha${communities.length > 1 ? 's' : ''} comunidade${communities.length > 1 ? 's' : ''}`} items={communities} />

        </div>
      </MainGrid>
    </>
  )
}
