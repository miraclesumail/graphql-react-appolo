import React, { Component } from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import * as _ from "lodash"

const Music_QUERY = gql`
  query GetMusics($singer: String!){
    getMusicBySinger(singer: $singer){
           id
           name
           singer
           release
    } 
  }  
`

export class Music extends Component {
    state = {
        singer:'周杰伦',
        musics: [],
        client: null
    }

    componentDidUpdate(prevProps, prevState) {
       
        console.log('ddidiidi', prevState);
        if(!prevState.client && this.state.client){
              this.searchMusics()
        }
    }

    searchMusics = () => {
        const {singer, client} = this.state;
        client.query({
            query: Music_QUERY,
            variables: { singer }
        }).then(({data}) => {
            console.log(data);
            this.setState({musics: data.getMusicBySinger});
        }) 
    }

    render() {
        const {singer, musics, client} = this.state;
        return (
            <div>
                 <input value={singer} onChange={e => {this.setState({singer: e.target.value}, () => _.debounce(this.searchMusics, 2000)())}}/>

                 {
                      !client ? <ApolloConsumer>
                        {client => {
                            console.log(client)
                            this.setState({client})
                            return (
                                <div>
                                    data is fetching
                                </div>
                            )
                        }}
                      </ApolloConsumer> : null
                 }            
                 {
                     musics.length ? 
                       musics.map(item => (
                           <div>{item.name} -- {item.singer}</div>
                       )) : null
                 }
            </div>
        )
    }
}

export default Music
