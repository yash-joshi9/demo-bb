import React from 'react'
import unsplash from './unsplash'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputText: '',
            data: {},
        }
    }

    handleImage = async () => {
        const response = await unsplash.get('/search/photos', {
            params: { query: 'term' },
        })

        this.setState({ data: response.data })
    }

    handleChange = (e) => {
        let x = e.target.value
        this.setState({ inputText: x })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.handleImage()
    }
    render() {
        const { data } = this.state
        return (
            <div className="search-bar">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange}></input>
                </form>
                <div>total results {data.total || 0}</div>
                <div>
                    {data.hasOwnProperty('results')
                        ? data.results.map((item, i) => (
                              <div className="img" key={i}>
                                  <img
                                      src={item.links.download}
                                      width="50px"
                                      height="50px"
                                      alt=""
                                  />
                              </div>
                          ))
                        : ''}
                </div>
            </div>
        )
    }
}

export default SearchBar
