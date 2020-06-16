import React from 'react';
import a from '../assets/piano-sounds/c3-1.wav';
import s from '../assets/piano-sounds/c3-2.wav';
import d from '../assets/piano-sounds/c3-3.wav';
import f from '../assets/piano-sounds/c3-4.wav';
import g from '../assets/piano-sounds/c3-5.wav';
import h from '../assets/piano-sounds/c3-6.wav';
import j from '../assets/piano-sounds/c3-7.wav';
import k from '../assets/piano-sounds/c3-8.wav'


class Piano extends React.Component {

    constructor(props) {

        super(props);

        this.playPiano = this.playPiano.bind(this);
    }

    playPiano(event) {

        let eventValue = ''

        if (event.key === undefined) {

            eventValue = event.target.id

        } else {

            eventValue = event.key

        }

        if (!['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'].includes(eventValue)) {
            return;
        }

        document.getElementById(eventValue).classList.add('piano-touched')

        setTimeout(() => {

            document.getElementById(eventValue).classList.remove('piano-touched')

        }, 500);

        let sound = new Audio()

        switch (eventValue) {

            case 'a':

                sound.src = a

                break;

            case 's':

                sound.src = s

                break;

            case 'd':

                sound.src = d

                break;

            case 'f':

                sound.src = f

                break;

            case 'g':

                sound.src = g

                break;

            case 'h':

                sound.src = h

                break;

            case 'j':

                sound.src = j

                break;

            case 'k':

                sound.src = k

                break;

            default:

                return;
        }

        sound.load()

        sound.play();

    }

    componentDidMount() {

        window.addEventListener('keydown', this.playPiano , false)

    }

    componentWillUnmount() {
        window.removeEventListener('keydown' , this.playPiano , false)
    }

    render() {

        const PIANOKEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k']

        return (

            <div id='piano'>

                <div className='title'>Mini piano</div>

                <div className='piano'>

                    {PIANOKEYS.map(pianoKey =>

                        <div id={pianoKey} className='piano-key' key={pianoKey} onClick={this.playPiano}>
                            {window.innerWidth >= 600 && pianoKey.toUpperCase()}
                        </div>)}

                </div>
            </div>
        )
    }
}

export default Piano