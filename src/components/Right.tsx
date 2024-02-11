import RightCSS from './Right.module.css'
import Worksheet from './Worksheet';

function Right() {
  return (
    <>
      <main className={RightCSS.main}>
        <Worksheet/>
      </main>
    </>
  )
}

export default Right;