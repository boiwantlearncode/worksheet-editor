import TagCSS from './Tag.module.css'
import TagProps from '../utilities/Types';

function Tag(props: TagProps) {
  const { questionType, currentSelectedQuestionTag } = props;

  return (
      <div className={` ${currentSelectedQuestionTag === questionType ? TagCSS.selectedTag : TagCSS.tag } `}>
        <p>{props.questionType}</p>
      </div>
  )
}

export default Tag;