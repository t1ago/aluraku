import { ProfileRelationsBoxWarpper } from "../ProfileRelations";

const BoxLinkItem = (props) => {
  return (
    <ProfileRelationsBoxWarpper>
      <h2 className="smallTitle">
        {props.title} <label className="boxLink">({props.items?.length})</label>
      </h2>

      <ul>
        {props.items?.slice(0, 6).map((item) => {
          return (
            <li key={item.id}>
              <a href={item.link} >
                <img src={item.image} />
                <span>{item.name}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWarpper>
  )
}

export default BoxLinkItem;