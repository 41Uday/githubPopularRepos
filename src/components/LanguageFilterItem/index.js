// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {item, isActive, buttonClick} = props
  const {language, id} = item
  const classValue = isActive ? 'butt-2' : ''
  const clickTab = () => {
    buttonClick(id)
  }
  return (
    <li>
      <button
        type="button"
        className={`butt-1 ${classValue}`}
        onClick={clickTab}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
