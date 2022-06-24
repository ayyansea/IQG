import './App.css';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <p className='logo'>IQG ?</p>
        {/* <p>Interview Questions Generator</p> */}
      </header>

      <div className='mainContainer'>
        <div className='inputs'>

          <div class="selectJob">
            <select className='test-input' id="cars" name="cars">
              <option value="1" disabled>Должность</option>
              <option value="2">Dev-ops</option>
              <option value="3">Frontend</option>
              <option value="4">Barista</option>
            </select>
          </div>

          <div class="selectLevel">
            <select className='test-input' id="cars" name="cars">
              <option value="1" disabled>Сложность</option>
              <option value="2">Junior</option>
              <option value="3">Middle</option>
              <option value="4">Senior</option>
            </select>
          </div>

          <div class="selectCount">
            <select className='test-input' id="cars" name="cars">
              <option value="1" disabled>Количество вопросов</option>
              <option value="2">5</option>
              <option value="3">10</option>
              <option value="4">15</option>
            </select>
          </div>
        </div>

        <div className='generate'>
          <button className='btn'>Сгенерировать</button>
        </div>

        <div className='questions'>
          <div className='questionItem'>
            <h1 className='questionTitle'>Question first</h1>
            <p className='questionText'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse bibendum mollis placerat. 
              Sed bibendum tristique risus in rutrum. 
              Donec sit amet maximus nunc. Ut fringilla ipsum ut enim lacinia, eu rutrum ex feugiat. 
              Quisque ut justo eros. Duis at dignissim massa, at porttitor libero. 
              Praesent vel velit consequat, sollicitudin ante sit amet, maximus dui. 
            </p>
          </div>

          <div className='questionItem'>
            <h1 className='questionTitle'>Question second</h1>
            <p className='questionText'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse bibendum mollis placerat. 
              Sed bibendum tristique risus in rutrum. 
              Donec sit amet maximus nunc. Ut fringilla ipsum ut enim lacinia, eu rutrum ex feugiat. 
              Quisque ut justo eros. Duis at dignissim massa, at porttitor libero. 
              Praesent vel velit consequat, sollicitudin ante sit amet, maximus dui. 
            </p>
          </div> 

          <div className='questionItem'>
            <h1 className='questionTitle'>Question thirth</h1>
            <p className='questionText'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Suspendisse bibendum mollis placerat. 
              Sed bibendum tristique risus in rutrum. 
              Donec sit amet maximus nunc. Ut fringilla ipsum ut enim lacinia, eu rutrum ex feugiat. 
              Quisque ut justo eros. Duis at dignissim massa, at porttitor libero. 
              Praesent vel velit consequat, sollicitudin ante sit amet, maximus dui. 
            </p>
          </div> 

        </div>
        
      </div>

    </div>
  );
}

export default App;
