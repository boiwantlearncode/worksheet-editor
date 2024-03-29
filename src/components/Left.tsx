import LeftCSS from './Left.module.css';

import Column from './Column';
import QuestionForm from './QuestionForm';

import useStore from '../utilities/Store';
import { QuestionType } from '../utilities/Types';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { getRandomID } from '../utilities/Tools';

function Left() {
  const { title, setTitle, selected, questions, setQuestions } = useStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const getQuestionPos = (id: string) => {
    return questions.findIndex(question => question.id === id);
  }

  const reorderItems = (questions: QuestionType[], activeID: string, overID: string): QuestionType[] => {
    const originalPos = getQuestionPos(activeID)
    const newPos = getQuestionPos(overID)

    return arrayMove(questions, originalPos, newPos)
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id === over!.id) return;
    
    const activeID = active.id as string;
    const overID = over!.id as string;

    setQuestions(reorderItems(questions, activeID, overID))
  }

  const createNewQuestion = () => {
    const newQuestion: QuestionType = {
      "id": getRandomID(),
      "index": (questions.length - 1).toString(),
      "question": "",
      "questionType": "MCQ",
      "options": [
        {
          "content": "",
          "index": 1
        },
      ]
    };
    setQuestions([...questions, newQuestion]);
  }

  return (
    <main className={LeftCSS.main}>
      <input type="text" name="title" className={LeftCSS.title} value={title} onChange={handleTitleChange}/>
      <h2 className={LeftCSS.sectionHeader}>Questions</h2>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <Column questions={questions}/>
      </DndContext>
      <button onClick={createNewQuestion} className={LeftCSS.addQuestionBtn}>
        <p>Add question</p>
      </button>
      {selected &&
      <QuestionForm/>
      }
    </main>
  )
}

export default Left;