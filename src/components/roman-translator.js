import React from 'react'

class Translator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: '',
            romanNumber: ''
        };

        this.convertToRoman = this.convertToRoman.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    convertToRoman(num) {

        let roms = [
            ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
            ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
            ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
            ['', 'M', 'MM', 'MMM', 'MV̅', 'V̅', 'V̅M', 'V̅MM', 'V̅MMM', 'MX̅'],
            ['', 'X̅', 'X̅X̅', 'X̅X̅X̅', 'X̅L̅', 'L̅', 'L̅X̅', 'L̅X̅X̅', 'L̅X̅X̅X̅', 'X̅C̅'],
            ['', 'C̅', 'C̅C̅', 'C̅C̅C̅', 'C̅D̅', 'D̅', 'D̅C̅', 'D̅C̅C̅', 'D̅C̅C̅C̅', 'C̅M̅'],
            ['', 'M̅', 'M̅M̅', 'M̅M̅M̅']
        ];

        let str = num.toString();

        let strRev = str.match(/\d/g).reverse().join('');

        let roman = '';

        for (let i = str.length; i > 0; i--) {

            roman += roms[i - 1][Number(strRev[i - 1])];

        }

        this.setState({
            romanNumber: roman
        })

    }

    async handleInput(event) {

        event.persist()

        console.log(event.target.value[event.target.value.length - 1]);

        if (event.target.value[event.target.value.length - 1] === undefined && event.target.value.length > 1 || event.target.value >= 3999999) {
            return;
        }

        await new Promise(done => {

            this.setState({
                number: event.target.value
            })

            done()

        })

        if (event.target.value.length === 0) {
            return;
        }

        this.convertToRoman(this.state.number)
    }

    componentDidMount() {

        document.getElementsByTagName('footer').item(0).classList.add('roman-footer')
    }

    componentWillUnmount() {

        document.getElementsByTagName('footer').item(0).classList.remove('roman-footer')
        
    }


    render() {


        return (

            <div>

                <div className='title roman-title'>Números romanos</div>

                <div className='row roman-row'>

                    <input className='input-field col s5 input-roman' type="number" name="Translator" onChange={this.handleInput} value={this.state.number} />

                    <i className='fas fa-equals col s2'></i>

                    <div className='col s5'>
                        {this.state.romanNumber}
                    </div>

                </div>

            </div>
        )
    }

}

export default Translator