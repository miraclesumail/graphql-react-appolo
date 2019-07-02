import React, { Component } from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import * as _ from "lodash"
import PropTypes from 'prop-types'

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

const mapStateToProps = state => ({
    music:state.music
})

function testable (target) {
    console.log('testable...');
    target.testable = true;
}
  
const mapDispatchToProps = dispatch => ({
addMusic: music => dispatch({type:'addMusic', music}),
addMusicByFunc: func => dispatch(func)
})


// 装饰器修饰由近及远  @testable  @connect 执行
@connect(mapStateToProps, mapDispatchToProps)
@testable
class Music extends Component {
    static contextTypes = {
        store:PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            singer:'周杰伦',
            musics: [],
            client: null,
            user_name:'',
            email: '',
            gender: '',
            address: '',
            description: '',
            phone: '',
            created_at: '2019-6-18',
            login_name: '',
            login_email: ''
        }
    }
   

    componentDidMount() {
        console.log('qqqqqqqqq')
        setTimeout(() => {
             console.log('qqqqqqqqq');
             this.props.addMusicByFunc(
                 (dispatch, getState) => {
                      dispatch( { type: 'addMusic',
                         music: 'sss'}
                     )
                 }       
             );
             
            //this.props.history.push('/')
        }, 3000)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.music);
        console.log('ddidiidi', prevState);
        if(!prevState.client && this.state.client){
              this.searchMusics()
        }
        console.log(Music.testable);
    }

    getCustomers = () => {
        const info = JSON.parse(localStorage.getItem('info'));
console.log(info);
        if(!info) return;
        console.log('dddddddd');
        fetch(`http://192.168.84.115:3000/customer/customers?user_name=${info.user_name}&token=${info.token}`
        ).then(response => response.json())
        .then(data => {
          console.log(data) // Prints result from `response.json()` in getRequest
        })
        .catch(error => console.error(error))
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

    submit = () => {
     
        const { user_name, email, gender, address, description, phone, created_at } = this.state;
        const submitData = { user_name, email, gender, address, description, phone, created_at, age:18}
     
      fetch('http://192.168.84.115:3000/user/create', {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(submitData) // body data type must match
      })
      .then(async response => {
            const res = await response.json()
            console.log(res);
            localStorage.setItem(
                'info', JSON.stringify({user_name: res.user.user_name, token: res.user.token})
            )
      });
    }

    login = () => {
        const { login_name, login_email } = this.state;
        fetch('http://192.168.84.115:3000/user/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_name: login_name, email: login_email}) // body data type must match
        })
        .then(async response => {
              const res = await response.json()
              console.log(res);
             
        });
    }

    uploadFile = (e) => {
        e.preventDefault();
        let formData = new FormData();
        var fileField = document.querySelector("input[type='file']");
        for(let i = 0; i < fileField.files.length; i++) {
            formData.append('file', fileField.files[i]);
        }
       
        console.log(fileField.files);
        setTimeout(() => {
            console.log(formData);
        }, 2000)

        fetch('http://192.168.84.115:3000/customer/upload', {
             method: 'POST',
            //  headers: {
            //      'Content-Type': 'multipart/form-data'
            //  },
             body: formData
        }).then(res => console.log('dddd'))

        // fetch('http://192.168.84.115:3000/customer/createLottery', {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, cors, *same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: JSON.stringify(submitData) // body data type must match
        // })
        // .then(response => {
        //       console.log(response.json());
        //       this.props.emptyLottery();
        // })
    }

    render() {
        const {singer, musics, client, user_name, email, gender, address, description, phone, login_name, login_email} = this.state;
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

                 <div><input value={user_name} onChange={(e) => this.setState({user_name: e.target.value})}/></div>
                 <div><input value={email} onChange={(e) => this.setState({email: e.target.value})}/></div>
                 <div><input value={gender} onChange={(e) => this.setState({gender: e.target.value})}/></div>
                 <div><input value={address} onChange={(e) => this.setState({address: e.target.value})}/></div>
                 <div><input value={description} onChange={(e) => this.setState({description: e.target.value})}/></div>
                 <div><input value={phone} onChange={(e) => this.setState({phone: e.target.value})}/></div>
                 <button onClick={this.submit}>提交</button>
                 <button onClick={this.getCustomers}>获取customers</button>

                 <div>---------登录-----------</div>
                 <div><input value={login_name} placeholder='input name' onChange={(e) => this.setState({login_name: e.target.value})}/></div>
                 <div><input value={login_email} placeholder='input email' onChange={(e) => this.setState({login_email: e.target.value})}/></div>
                 <button onClick={this.login}>提交</button>

                 <form method="post">
                    <input type="file" name="avatar" multiple/>
                    <button onClick={this.uploadFile}>Submit</button>
                 </form>
            </div>
        )
    }
}



export default Music
