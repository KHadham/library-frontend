import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../public/redux/actions/login'
import { View, StatusBar, ScrollView, AsyncStorage } from 'react-native'
import {
  Text,
  Card,
  TextInput,
  Button,
  TouchableRipple
} from 'react-native-paper'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginUser: [],
      email: '',
      password: '',
    }
  }

  render () {
    const loginUser = () => {
      this.state.loginUser.push({
        email: this.state.email,
        password: this.state.password
      })
      logindong()
      console.warn(`cobaaaaaaaaa`, this.state.loginUser[0])
    }

    let logindong = async () => {
      await this.props.dispatch(userLogin(this.state.loginUser[0]))
      .then(() => {
        this.props.navigation.push('Home')
      })
    }

    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 16,
            paddingVertical: 8
          }}
        >
          <StatusBar backgroundColor='white' barStyle='dark-content' />
          <View style={{ alignItems: 'center' }}>
            <Text
              text10
              style={{ fontSize: 64, fontWeight: 'bold', margin: 64 }}
            >
              BOOKS
            </Text>
          </View>
          <Card style={{ padding: 16, borderRadius: 8 }}>
            <Text
              text10
              style={{ fontSize: 20, fontWeight: 'normal', marginBottom: 8 }}
            >
              LOGIN
            </Text>
            <TextInput
              autoFocus
              keyboardType='email-address'
              mode='outlined'
              textContentType='emailAddress'
              label='Email'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              style={{ borderRadius: 8, marginBottom: 8 }}
            />
            <TextInput
              secureTextEntry
              mode='outlined'
              textContentType='password'
              label='Password'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              style={{ borderRadius: 8, marginBottom: 8 }}
            />
            <Button
              icon='keyboard-arrow-right'
              mode='contained'
              dark
              color='black'
              onPress={loginUser.bind(this)}
            >
              Login
            </Button>
          </Card>
          <View style={{ alignItems: 'flex-end', marginVertical: 8 }}>
            <TouchableRipple
              onPress={() => this.props.navigation.navigate('Register')}
              rippleColor='rgba(0, 0, 0, .32)'
            >
              <Text style={{ color: 'black' }}>New Member? Register Here!</Text>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Login)
