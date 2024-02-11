import Question from './Question';
import ColumnCSS from './Column.module.css';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { QuestionType } from '../utilities/Types';

function Column(props: { questions: QuestionType[] }) {
  return (
    <div className={ColumnCSS.column}>
      <SortableContext items={props.questions} strategy={verticalListSortingStrategy}>
        {props.questions.map((question, i) => {
          return <Question 
            key={question.id} 
            id={question.id} 
            index={(i+1).toString()} 
            question={question.question} 
            questionType={question.questionType}
            options={question.options}
          />
        })}
      </SortableContext>
    </div>
  )
}

export default Column;