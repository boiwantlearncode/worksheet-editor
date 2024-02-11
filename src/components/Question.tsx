import QuestionCSS from './Question.module.css';
import Tag from './Tag';
import useStore from '../utilities/Store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { QuestionType } from '../utilities/Types';
import MoveSVG from '../assets/move.svg';
import DeleteDefaultSVG from '../assets/delete-default.svg';

function Question(props: QuestionType) {
  const { id, index, question, questionType, options } = props;
  const { selected, setSelected, questions, setQuestions } = useStore();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const setSelectedQuestion = () => {
    setSelected(id);
  }

  const checkDeselect = (e: React.MouseEvent<HTMLInputElement>) => {
    if (selected === e.currentTarget.value) {
      setSelected(null);
    }
  }

  const deleteQuestion = () => {
    if (selected === id) setSelected(null);
    setQuestions(questions.filter((question) => question.id !== id));
  }

  return (
    <main className={QuestionCSS.row}>
      <h2 className={QuestionCSS.number}>{index}</h2>
      <div className={QuestionCSS.notNumberSection}>
        <label
        ref={setNodeRef} 
        style={style}
        htmlFor={id} className={QuestionCSS.label}>
          <input className={QuestionCSS.radio} type="radio" name="question" id={id} value={id} checked={id === selected} onClick={checkDeselect} onChange={setSelectedQuestion}/>
          <div className={`${QuestionCSS.button} ${id === selected ? `${QuestionCSS.selected}` : ''}`}>
            <div className={QuestionCSS.questionWrapper}>
              <p>{question}</p>
            </div>
            <div className={QuestionCSS.rightSide}>
              <Tag questionType={questionType}/>
              <div 
              className={QuestionCSS.move}
              {...attributes} 
              {...listeners}>
                <img src={MoveSVG} alt="Drag to reorder" />
              </div>
            </div>
          </div>
        </label>
        <img onClick={deleteQuestion} className={QuestionCSS.deleteSVG} src={DeleteDefaultSVG} alt="Delete" />
      </div>
    </main>
  )
}

export default Question;