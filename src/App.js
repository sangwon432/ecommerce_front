import React, {useState} from 'react';

const App = () => {

    const [name, setName] = useState('Sangwon')
    return (
        <div>
            <h1>Hello World {name}</h1>
            <button onClick={() => setName('teddy')}>change name</button>
        </div>
    );
};

export default App;