import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    repositoryList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getItemList()
  }

  getItemList = async () => {
    const {activeTabId} = this.state
    this.setState({apiStatus: apiStatusConstants.progress})
    const query = languageFiltersData.filter(e => e.id === activeTabId)
    const queryValue = query[0].id

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${queryValue}`,
    )
    if (response.ok) {
      const fetchedData = await response.json()
      const resVal = fetchedData.popular_repos
      const updatedData = resVal.map(e => ({
        avatarUrl: e.avatar_url,
        forksCount: e.forks_count,
        id: e.id,
        name: e.name,
        issuesCount: e.issues_count,
        starsCount: e.stars_count,
      }))
      this.setState({repositoryList: updatedData})
      this.setState({apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  buttonClick = id => {
    this.setState({activeTabId: id}, this.getItemList)
  }

  getSuccess = () => {
    const {repositoryList} = this.state
    return (
      <ul className="list-cont">
        {repositoryList.map(e => (
          <RepositoryItem key={e.id} listItem={e} />
        ))}
      </ul>
    )
  }

  isInProgress = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  getFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="f-img"
      />
      <h1 className="m-head">Something Went Wrong</h1>
    </div>
  )

  reposList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getSuccess()
      case apiStatusConstants.failure:
        return this.getFailure()
      case apiStatusConstants.progress:
        return this.isInProgress()
      default:
        return null
    }
  }

  render() {
    const {activeTabId} = this.state

    return (
      <div className="bg-container">
        <h1 className="head-1">Popular</h1>
        <ul className="list-cont">
          {languageFiltersData.map(e => (
            <LanguageFilterItem
              key={e.id}
              item={e}
              buttonClick={this.buttonClick}
              isActive={e.id === activeTabId}
            />
          ))}
        </ul>
        {this.reposList()}
      </div>
    )
  }
}

export default GithubPopularRepos
