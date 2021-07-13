
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import { ProfileRelationsBoxWarpper } from "../src/components/ProfileRelations";
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";

const ProfileSideBar = (props) => {
  return (
    <Box>
      <img src={`https://github.com/${props.userName}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  );
}

export default function Home() {

  const githubUser = 't1ago';
  const peopleFavorite = ['t1ago', 'juunegreiros', 'peas', 'omariosouto', 'lazanharaphael', 'felipefialho']

  return (
    <>
      <AlurakutMenu />
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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWarpper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({peopleFavorite.length})
            </h2>

            <ul>
              {peopleFavorite.map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`} >
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWarpper>
        </div>
      </MainGrid>
    </>
  )
}
