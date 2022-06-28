//import modules
import React, { useState, useEffect } from 'react';

//import components
import './App.css';

function App() {
  const [questions, setQuestions] = useState([])

  const formSubmit = (result) => {
    setQuestions(JSON.stringify(result))
  }

  return (
    <div className="App">

      <header className="App-header">
        <p className='logo'>IQG ?</p>
      </header>

      <div className="mainContainer">

        <InputsForm callback={formSubmit} />
        <Questions data={questions} />

      </div>
    </div>
  );
}

const InputsForm = (props) => {
  const [formData, setFormData] = useState({
    job: {
      id: "default",
      name: ""
    },
    level: {
      id: "default",
      name: ""
    },
    count: null
  })

  function generateUniqueRandomRange(Max) {
    var randomArray = [];
    var available = [];

    for (let i=0; i < Max; i++) {
      available.push(i);
    }

    for (let i=0; i < formData.count; i++) {
      var randomIndex = available[Math.floor(Math.random() * available.length)];

      for (let i=0; i < available.length; i++) {
        if (randomIndex == available[i])  {
          available.splice(i, 1);
        }
      }
      randomArray.push(randomIndex);
    }

    return randomArray;
  }


  function getRandomQuestions(questions) {
    var randomArray = generateUniqueRandomRange(questions.length);
    // console.log(randomArray)
    var resultQuestions = [];

    for (var i = 0; i < questions.length; i++) {
      for (var j = 0; j < randomArray.length; j++) {
        if (i == randomArray[j]) {
          resultQuestions.push(questions[i]);
        }
      }
    }
    // console.log(randomQuestions);
    // console.log(randomArray)
    return resultQuestions;
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:5000/iqg/api/jobs/" + String(formData.job.id) + "/levels/" + String(formData.level.id) + "/questions")
      .then(res => res.json())
      .then(
        (result) => {
          var randomQuestions = getRandomQuestions(result.data)
          console.log(result);
          props.callback(randomQuestions)
        },
        (error) => {
          console.log(error);
        }
      )

    console.log(formData)
  }

  const handleChangeJob = (e) => {
    setFormData({ ...formData, job: { id: e.target.selectedOptions[0].id, name: e.target.value } });
  }

  const handleChangeLevel = (e) => {
    setFormData({ ...formData, level: { id: e.target.selectedOptions[0].id, name: e.target.value } });
  }

  const handleChangeCount = (e) => {
    setFormData({ ...formData, count: e.target.value });
  }

  useEffect(() => {
    var level = document.getElementById("level");
    var count = document.getElementById("count");

    if (formData.level.name == "Сложность" || formData.level.name == "") {
      count.disabled = true;
      count.selectedIndex = 0;
    }
    else {
      count.disabled = false;
    }

    if (formData.job.id == null || formData.job.id == "default") {
      level.disabled = true;
      level.selectedIndex = 0;

      count.disabled = true;
      count.selectedIndex = 0;
    }
    else {
      level.disabled = false;
    }
  })

  return (
    <form className="inputs" onSubmit={handleSubmit}>

      <SelectJob callback={handleChangeJob} />
      <SelectLevel job={formData.job.id} callback={handleChangeLevel} />
      <SelectCount callback={handleChangeCount} />

      <div className="generate">
        <input className="btn" value="Сгенерировать" type="submit" />
      </div>
    </form>

  )
}

const SelectJob = (props) => {

  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/iqg/api/jobs")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result.data);
        },
        (error) => {
          setError(error);
        }
      )
  }, [])

  const handleChange = (event) => {
    props.callback(event)
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
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

const SelectLevel = (props) => {

  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (props.job != "default") {

      fetch("http://localhost:5000/iqg/api/jobs/" + String(props.job) + "/levels")
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result.data);
          },
          (error) => {
            setError(error);
          }
        )
    }
  }, [props.job])

  const handleChange = (event) => {
    props.callback(event)
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else {
    return (
      <div className="selectLevel">
        <select className="test-input" id="level" onChange={handleChange}>
          <option key={"default"} id="default">
            Сложность
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

const SelectCount = (props) => {

  const handleChange = (event) => {
    props.callback(event)
  }

  return (
    <div className="selectCount">
      <select className='test-input' id="count" onChange={handleChange} disabled>
        <option value="default">Количество вопросов</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
}

const Questions = (props) => {

  if (props.data.length > 0) {
    var resultQuestions = JSON.parse(props.data);
    const final = [];

    var counter = 0;

    for (var i = 0; i < resultQuestions.length; i++) {
      counter = counter + 1;
      final.push(
        <div className="questionItem">
          <h1 className='questionTitle'>{counter}.</h1>
          <p className='questionText'>
            {resultQuestions[i].question}
          </p>
        </div>
      );
    }
    return <div className="questions">{final}</div>;
  }
}

export default App;
