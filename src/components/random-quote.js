import React from 'react'

class RandomQuote extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            quote: '',
            author: ''
        };

        this.getQuote = this.getQuote.bind(this);
    }

    async getQuote() {

        let http = new XMLHttpRequest();

        let random = Math.floor(Math.random() * 102);

        let fadeIn = document.getElementsByClassName('fadeIn').item(0).classList;

        await new Promise(done => {

            fadeIn.add('fadeOut')

            let fadeOut = document.getElementsByClassName('fadeOut').item(0).classList;

            fadeOut.remove('fadeIn')

            setTimeout(() => {

                fadeOut.add('fadeIn')

                fadeIn.remove('fadeOut')

                done()

            }, 500);
        })


        http.open('GET', 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', false);

        http.send()

        let quotes = JSON.parse(http.response).quotes;

        this.setState({
            quote: quotes[random].quote,
            author: quotes[random].author
        })
    }

    componentDidMount() {

        this.getQuote();

        document.getElementsByTagName('footer').item(0).classList.add('quote-footer')

    }

    componentWillUnmount() {

        document.getElementsByTagName('footer').item(0).classList.remove('quote-footer')
    }

    render() {

        let quoteClass = (this.state.quote.length >= 110) ? 'mini-quote-text' : 'quote-text';

        return (<div className='quote-component'>

            <h1 className='title'>Quotes</h1>

            <div className='fadeIn'>

                <div className={quoteClass}>"{this.state.quote}"</div>

                <div className='quote-flex'>

                    <button className='btn' onClick={this.getQuote}><i className='fas fa-sync'></i></button>

                    <div className='author'>- {this.state.author}</div>

                </div>

            </div>

        </div>
        )
    }

}

export default RandomQuote