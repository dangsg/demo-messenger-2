import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { sendMessageDispatch } from '../dispatchers/sendMessageDispatcher';

const mapStateToProps = (state) => ({ 
	username: state.sessionReducer.username,
	conversation: state.messageReducer.data 
});
const mapDispatchToProps = dispatch => ({
	sendMessage: (friend, message) => dispatch(sendMessageDispatch(friend, message)),
	// getConversation(friend) => dispatch(getConversation(friend))
})

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			conversation: [],
			message: "",
			friend: this.props.match.params.friend,
			socket: io('http://localhost:5000?username=' + this.props.username)
		}

		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.enterPressed = this.enterPressed.bind(this);

		this.state.socket.on('send message', data => {
			if (data.from === this.state.friend) {
				let newConversation = this.state.conversation.slice();
				newConversation.push({ username: data.from, message: data.message, from: 'away' })
				this.setState({
					conversation: newConversation
				})
			}
		})
	}

	handleMessageChange(e) {
		this.setState({
			message: e.target.value
		})
	}

	handleSendMessage(e) {
		e.preventDefault();
		if (this.state.message.trim() !== "") {
			this.state.socket.emit('send message', { from: this.props.username, to: this.state.friend, message: this.state.message });
			let newConversation = this.state.conversation.slice();
			newConversation.push({ username: this.props.username, message: this.state.message, from: 'home' })
			this.setState({
				conversation: newConversation,
				message: ""
			});
		}
	}

	enterPressed(e) {
		const code = e.keyCode || e.which;
		if(code === 13) this.handleSendMessage(e)
	}
	
	renderConversation(conversation) {
		return this.state.conversation.map(data => (<p><span className={data.from}>{data.username}: </span>{data.message}</p>))
	}

	componentDidUpdate() {
		// console.log('did update')
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	render() {


		return (
			<>
				<h1>Chat</h1>
				<p>Friend: {this.state.friend}</p>
				<div id='conversation'>
					{this.renderConversation()}
					<div ref={(el) => { this.messagesEnd = el; }} />
				</div>
				<form id='message-form' onSubmit={this.handleSendMessage}>
					<textarea id='typer' onChange={this.handleMessageChange} onKeyPress={this.enterPressed} value={this.state.message} />
					<input type='submit' value="Send" />
				</form>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);