import React, {Component} from 'react'
import axios from "axios";
import Select from 'react-select';
import {withRouter} from 'react-router-dom'

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [{
                username: 'hydsoled',
                label: 'hydsoled'
            }],
            selectedText: null,
        }
        this.colourStyles = {
            option: (styles, {data, isDisabled, isFocused, isSelected}) => {
                return {
                    ...styles,
                    backgroundColor: isFocused ? "#999999" : null,
                    color: "#333333"
                };
            }
        };
    }

    handleInputChange(event) {
        if (!event || this.state.selectedText === event) return
        this.setState({
            selectedText: event
        })
        this.getUser(event)
    }

    handleChange(event) {
        this.props.history.push({
            pathname: '/selectUser',
            state: {
                img_url: event.profile_pic_url,
                name: event.name,
                type: event.type,
                media_count: event.media_count || null
            }
        })
    }

    async getUser(event) {
        const data = await new Promise(((resolve, reject) => {
            axios.post('http://localhost:4200/searchUser',
                {user: event},
                {
                    headers: {
                        'authorization': document.cookie
                    }
                }
            ).then((response) => {
                const users = response.data.users
                const tags = response.data.hashtags
                const data = []
                for (let i = 0; users && i < users.length && i < 10; i++) {
                    data.push({
                        name: users[i].user.username,
                        label: users[i].user['full_name'],
                        profile_pic_url: users[i].user['profile_pic_url'],
                        type: 'user'
                    })
                }
                for (let i = 0; tags && i < tags.length && i < 10; i++) {
                    data.push({
                        name: tags[i].hashtag.name,
                        label: tags[i].hashtag.name,
                        profile_pic_url: tags[i].hashtag.profile_pic_url,
                        type: 'tag',
                        media_count: tags[i].hashtag.media_count
                    })
                }
                resolve(data)
            })
        }))
        if (data.length === 0) {
            return
        }
        this.setState({
            options: data
        })
    }

    render() {
        return (
            <Select
                options={this.state.options}
                styles={this.colourStyles}
                onInputChange={this.handleInputChange.bind(this)}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}

export default withRouter(Body)