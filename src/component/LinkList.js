import React, { Component } from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'
import CreateLink from './CreateLink'

const FEED_QUERY = gql`
{
  feed { 
      id
      url
      description
      postedBy{
          name
          email
      }  
  }
}
`

const Link_QUERY = gql`
  query GetLinks($url: String!){
    getLinkByUrl(url: $url){
           id
           url
           description
    } 
  }
   
`

export default class LinkList extends Component {
    state = {
        searchUrl: '',
        links: []
    }

    render() {
      return (
        <div>
            <Query query={FEED_QUERY} notifyOnNetworkStatusChange>
                {({ loading, error, data, refetch, networkStatus }) => {
                    if (networkStatus === 4) return <div>Refetching!</div>;
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
            
                    const linksToRender = data.feed
            
                    return (
                    <div>
                        {linksToRender.map(link => <Link key={link.id} link={link} />)}
                        <CreateLink refresh={refetch}/>
                    </div>
                    )
                }}
            </Query>

            <div><input placeholder="申诉书" value={this.state.searchUrl} onChange={e => this.setState({searchUrl: e.target.value})}/></div> 
            
            <ApolloConsumer>
                {client => (
                <div>
                    {this.state.links.length ? 
                       this.state.links.map(item => (
                           <div key={item.id}>{item.url} -- {item.description}</div>
                       )) : null
                    }
                    <button
                    onClick={async () => {
                        console.log(this.state.searchUrl);
                        const { data } = await client.query({
                            query: Link_QUERY,
                            variables: { url: this.state.searchUrl }
                        });
                        console.log(data);
                        this.setState({links: data.getLinkByUrl});
                    }}
                    >
                    Click me!
                    </button>
                </div>
                )}
            </ApolloConsumer>
        </div>  
      )
    }
  }