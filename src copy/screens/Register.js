import React, { Component } from 'react'
import { View, StatusBar, ScrollView } from 'react-native'
import { Text, Card, TextInput, Button, IconButton } from 'react-native-paper'
import { registerUser } from '../public/redux/actions/user'
import { connect } from 'react-redux'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userRegister: []
    }
  }

  render () {
    const userRegister = async () => {
      await this.state.userRegister.push({
        id_user: this.state.id_user,
        nama_user: this.state.nama_user,
        email: this.state.email,
        password: this.state.password
      })
      console.log(`User register`, userRegister)
      await this.props.dispatch(registerUser(this.state.userRegister)).then(() => {
        this.props.navigation.navigate('Login')
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
          <IconButton
            icon='navigate-before'
            color='black'
            size={30}
            onPress={() => this.props.navigation.navigate('Home')}
            style={{ position: 'absolute' }}
          />
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
              REGISTER
            </Text>
            <TextInput
              autoFocus
              keyboardType='numeric'
              mode='outlined'
              textContentType='creditCardNumber'
              label='Id'
              value={this.state.id_user}
              onChangeText={id_user => this.setState({ id_user })}
              style={{ borderRadius: 8, marginBottom: 8 }}
            />
            <TextInput
              keyboardType='email-address'
              mode='outlined'
              textContentType='emailAddress'
              label='Email'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              style={{ borderRadius: 8, marginBottom: 8 }}
            />
            <TextInput
              mode='outlined'
              textContentType='username'
              label='Username'
              value={this.state.nama_user}
              onChangeText={nama_user => this.setState({ nama_user })}
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
              icon='add'
              mode='contained'
              dark
              color='black'
              onPress={() => userRegister()}
            >
              Register
            </Button>
          </Card>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Register)
