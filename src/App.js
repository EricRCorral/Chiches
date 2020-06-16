import React from 'react';
import Calculator from './components/calculator';
import Piano from './components/piano';
import Clock from './components/pomodoro-clock';
import RandomQuote from './components/random-quote';
import Translator from './components/roman-translator';
import './css/app.css'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      component: 0
    };

    this.navigate = this.navigate.bind(this);

    this.M = window.M;
  }

  componentDidMount() {
    this.M.AutoInit();
  }

  navigate(i) {

    const componentClass = document.getElementsByClassName('component').item(0).classList;

    if (this.state.component === i) {
      return;
    }

    componentClass.remove('entrance');

    componentClass.add('exit');

    setTimeout(() => {

      this.setState({
        component: i
      });

      componentClass.add('entrance');

    }, 500);

  }

  render() {

    const icons = ['comment-alt', 'keyboard', 'hourglass-half', 'calculator', 'exchange-alt']

    return (

      <div className="row">

        <div className="col s12 m2 nav z-depth-3">

          {icons.map((item, i) =>

            <button key={i} className={(this.state.component === i)? 'btn-floating btn-large waves-effect waves-light teal darken-4' : 'btn-floating btn-large waves-effect waves-light teal darken-2'} onClick={() => this.navigate(i)}>

              <i className={`fas fa-${item} fa-2x`}></i>

            </button>)}

        </div>

        <div className="col s12 m10 component entrance">

          {this.state.component === 0 && <RandomQuote />}
          {this.state.component === 1 && <Piano component={this.state.component}/>}
          {this.state.component === 2 && <Clock />}
          {this.state.component === 3 && <Calculator />}
          {this.state.component === 4 && <Translator />}

          <footer><code>Hecho con <i className='fas fa-heart'></i> & <i className='fas fa-code'></i> por Eric Corral</code></footer>

        </div>
      </div>
    )
  }
}

export default App;
