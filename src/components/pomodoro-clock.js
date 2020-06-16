import React from 'react'

class Clock extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            session: 25,
            break: 5,
            minutes: 25,
            seconds: 0,
            running: false,
            sessionTime: true
        }

        this.times = this.times.bind(this);
        this.startStop = this.startStop.bind(this);
    }

    times(event) {

        let modified = 0;

        let beep = new Audio('http://soundbible.com/mp3/service-bell_daniel_simion.mp3');

        switch (event.target.id) {

            case 'break-decrement':

                if (this.state.break === 1) {
                    return;
                }

                modified += this.state.break - 1

                this.setState({
                    break: modified,
                })

                break;

            case 'break-increment':

                if (this.state.break === 60) {
                    return;
                }

                modified += this.state.break + 1

                this.setState({
                    break: modified,
                })

                break;

            case 'session-decrement':

                if (this.state.session === 1) {
                    return;
                }

                modified += this.state.session - 1

                this.setState({
                    session: modified,
                    minutes: modified,
                    decimals: 0,
                    seconds: 0
                })

                break;

            case 'session-increment':

                if (this.state.session === 60) {
                    return;
                }

                modified += this.state.session + 1

                this.setState({
                    session: modified,
                    minutes: modified,
                    decimals: 0,
                    seconds: 0
                })

                break;

            default:

                this.setState({
                    session: 25,
                    break: 5,
                    minutes: 25,
                    seconds: 0,
                    running: false,
                    sessionTime: true
                })

                beep.load()

                break;
        }
    }

    startStop() {

        let run = !this.state.running

        let sec = 0;

        let min = 0;

        let beep = new Audio('http://soundbible.com/mp3/service-bell_daniel_simion.mp3')

        this.setState({
            running: run
        })

        let interval = setInterval(() => {

            if (this.state.running) {

                if (this.state.minutes <= 0 && this.state.seconds <= 0) {

                    let sesTim = !this.state.sessionTime

                    if (this.state.sessionTime) {

                        this.setState({
                            minutes: this.state.break,
                            seconds: 0,
                            sessionTime: sesTim
                        })

                        beep.load()

                        beep.play()

                        return;

                    } else {

                        this.setState({
                            minutes: this.state.session,
                            seconds: 0,
                            sessionTime: sesTim
                        })

                        beep.load()

                        beep.play()

                        return;
                    }
                }

                if (this.state.seconds <= 0) {

                    min = this.state.minutes - 1

                    this.setState({
                        minutes: min,
                        seconds: 59
                    })

                } else {

                    sec = this.state.seconds - 1

                    this.setState({
                        seconds: sec
                    })
                }
            } else {

                clearInterval(interval)
            }
        }, 1000);
    }

    componentDidMount() {

        document.getElementsByTagName('footer').item(0).classList.add('clock-footer')
    }
    
    componentWillUnmount() {
        
        document.getElementsByTagName('footer').item(0).classList.remove('clock-footer')
    }

    render() {

        return (

            <div>

                <div className='title clock-title'>Temporizador pomodoro</div>

                <div className='clock-row'>

                    <button className='btn-floating btn-large' disabled={this.state.running} onClick={this.times}><i className='fas fa-minus' id="break-decrement"></i></button>

                    <div className='clock-text'>Descanso: {this.state.break}</div>

                    <button className='btn-floating btn-large' disabled={this.state.running} onClick={this.times}><i className='fas fa-plus' id="break-increment"></i></button>


                </div>

                <div className='clock-row'>

                    <button className='btn-floating btn-large' disabled={this.state.running} onClick={this.times}><i className='fas fa-minus' id="session-decrement"></i></button>

                    <div className='clock-text'>Sesion: {this.state.session}</div>

                    <button className='btn-floating btn-large' disabled={this.state.running} onClick={this.times}><i className='fas fa-plus' id="session-increment"></i></button>

                </div>

                <div className='clock-text' style={(this.state.sessionTime)? {color: 'black'} : {color: 'red'}}>{(this.state.running)? (this.state.sessionTime) ? 'Sesion' : 'Descanso' : 'En pausa'}</div>

                <div className='clock-text'>{(this.state.minutes <= 9) ? '0' : ''}{this.state.minutes}:{(this.state.seconds <= 9) ? '0' : ''}{this.state.seconds}</div>

                <div className='clock-row'>

                    <button className='btn-floating btn-large clock-play' onClick={this.startStop}><i className={(this.state.running) ? 'fas fa-pause' : 'fas fa-play'}></i></button>

                    <button className='btn-floating btn-large' onClick={this.times}><i className='fas fa-stop'></i></button>

                </div>

            </div>
        )
    }
}

export default Clock