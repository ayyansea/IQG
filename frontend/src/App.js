//import modules
import React, { useState, useEffect } from 'react';

//import components
import './App.css';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <p className='logo'>IQG ?</p>
      </header>

      <div className='mainContainer'>
        <InputsForm />


        <div className='questions'>
          <QuestionItem />
          <QuestionItem />
          <QuestionItem />
        </div>

      </div>

    </div>
  );
}

const InputsForm = () => {
  const [formData, setFormData] = useState({
    job: {
      id: null,
      name: ""
    },
    level: "",
    count: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
}


  return(
    <form className="inputs" onSubmit={handleSubmit}>

          <SelectJob callback={(e) => setFormData({...formData, job: {id: e.target.selectedOptions[0].id, name: e.target.value}})}/>

          <div className="selectLevel">
            <select className="test-input" onChange={(e) => setFormData({...formData, level: e.target.value})}>
              <option value="default">Сложность</option>
              <option value="junior">Junior</option>
              <option value="middle">Middle</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className="selectCount">
            <select className='test-input' onChange={(e) => setFormData({...formData, count: e.target.value})} disabled>
              <option value="default">Количество вопросов</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>

          <div className="generate">
            <input className="btn" value="Сгенерировать" type="submit" />
          </div>
        </form>

  )
}

const SelectJob = (props) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/iqg/api/jobs")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleChange = (event) => {
    console.log(event)
    props.callback(event)
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="selectJob">
        <select className='test-input' onChange={handleChange}>
          <option key={"default"} id="default">
            Должность
          </option>
          {items.map(data => (
            <option key={data.id} id={data.id} value={data.name}>
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const QuestionItem = () => {
  return (
    <div className='questionItem'>
      <h1 className='questionTitle'>Question item</h1>
      <p className='questionText'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Suspendisse bibendum mollis placerat.
        Sed bibendum tristique risus in rutrum.
        Donec sit amet maximus nunc. Ut fringilla ipsum ut enim lacinia, eu rutrum ex feugiat.
        Quisque ut justo eros. Duis at dignissim massa, at porttitor libero.
        Praesent vel velit consequat, sollicitudin ante sit amet, maximus dui.
      </p>
    </div>);
}

export default App;
