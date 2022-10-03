// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {listItem} = props
  const {avatarUrl, name, starsCount, issuesCount, forksCount} = listItem
  return (
    <li className="list-item-1">
      <img src={avatarUrl} alt={name} className="img-1-r" />
      <h1 className="para-r">{name}</h1>
      <div className="card">
        <div className="card-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
            alt="stars"
            className="img-c-1"
          />
          <p className="par-card-1">{starsCount} stars</p>
        </div>
        <div className="card-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
            alt="forks"
            className="img-c-1"
          />
          <p className="par-card-1">{forksCount} forks</p>
        </div>
        <div className="card-1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
            alt="open issues"
            className="img-c-1"
          />
          <p className="par-card-1">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
