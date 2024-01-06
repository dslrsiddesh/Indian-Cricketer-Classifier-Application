import './App.css'
import Cards from './components/Cards'
import ImageUpload from './components/ImageUpload'
import ClassesTable from './components/ClassesTable'

function App() {

  return (
    <>
      <div className='heading'>
        <p>Indian Cricketer Classifier</p>
      </div>
      <Cards />
      <div className='classification'>
        <ImageUpload />
        {/* <ClassesTable /> */}
      </div>
    </>
  )
}

export default App