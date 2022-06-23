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
          <input className='test-input' placeholder='Должность' />
          <input className='test-input' placeholder='Сложность' />
          <input className='test-input' placeholder='Количество вопросов' />
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
