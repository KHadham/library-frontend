import React, { Component } from 'react'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import { getPinjamId } from '../public/redux/actions/pinjam'
import { View, StatusBar, Image, FlatList, AsyncStorage } from 'react-native'
import {
  Text,
  Card,
  IconButton,
  Headline,
  Caption,
  TouchableRipple
} from 'react-native-paper'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      pinjams: [],
      data: [],
      refreshing: false,
      token: '',
      id_user: '',
      nama_user: '',
      status: '',
      email: ''
    }
    this.arrayholder = []

    AsyncStorage.getItem('token', (err, result) => {
      if (result) {
        this.setState({
          token: result
        })
      }
    })
    AsyncStorage.getItem('id_user', (err, result) => {
      if (result) {
        this.setState({
          id_user: result
        })
      }
    })
    AsyncStorage.getItem('nama_user', (err, result) => {
      if (result) {
        this.setState({
          nama_user: result
        })
      }
    })
    AsyncStorage.getItem('status', (err, result) => {
      if (result) {
        this.setState({
          status: result
        })
      }
    })
    AsyncStorage.getItem('email', (err, result) => {
      if (result) {
        this.setState({
          email: result
        })
      }
    })
  }

  logout = () => {
    AsyncStorage.clear().then(() => {
      this.props.navigation.push('Home')
    })
  }

  componentDidMount = () => {
    this.makeRequest()
  }

  makeRequest = async () => {
    await this.props.dispatch(
      getPinjamId(this.props.navigation.getParam('id_user'))
    )
    this.setState({
      pinjams: this.props.pinjam
    })
  }

  render () {
    const { pinjams } = this.state
    const list = pinjams.listPinjam
    console.log(`ini id user`, this.state.id_user)
    console.log(`pinjaaaaammmssss`, this.state.pinjams.listPinjam)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingVertical: 8
        }}
      >
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <NavigationEvents onWillFocus={payload => this.makeRequest()} />
        <View style={{ flexDirection: 'row', position: 'absolute' }}>
          <View>
            <IconButton
              icon='navigate-before'
              color='black'
              size={30}
              onPress={() => this.props.navigation.push('Home')}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            <TouchableRipple
              onPress={() => this.logout()}
              rippleColor='rgba(0, 0, 0, .32)'
            >
              <Text text10 style={{ color: 'black', fontSize: 16 }}>
                Logout
              </Text>
            </TouchableRipple>
          </View>
        </View>

        <View style={{ flexDirection: 'row', top: '12%' }}>
          <View style={{ marginRight: 8 }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 16
              }}
              source={{
                uri:
                  'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Feskipaper.com%2Fimages%2Fpikachu-pokemon-cute-face-creative-cartoon-1.jpg&f=1'
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Headline>{this.state.nama_user}</Headline>
            <Caption>{this.state.email}</Caption>
            <Caption>{this.state.id_user}</Caption>
          </View>
        </View>
        <Card
          style={{ marginTop: 64, padding: 16, borderRadius: 8, height: '90%' }}
        >
          <Text
            text10
            style={{ fontSize: 20, fontWeight: 'normal', marginBottom: 8 }}
          >
            BOOK LENDING HISTORY
          </Text>
          <FlatList
            extraData={list}
            showsVerticalScrollIndicator={false}
            data={list}
            keyExtractor={item => item.id_buku.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 8, marginBottom: 8 }}>
                  <Image
                    style={{
                      width: 70,
                      height: 100,
                      borderRadius: 8
                    }}
                    source={{
                      uri: item.gmb_buku
                    }}
                  />
                </View>
                <View style={{ flex: 1, marginVertical: 8 }}>
                  <Headline>{item.nama_buku}</Headline>
                  <Caption>{item.penulis_buku}</Caption>
                  <Caption>{item.lokasi_buku}</Caption>
                </View>
              </View>
            )}
            style={{
              marginTop: 16,
              width: '100%'
            }}
            numColumns={1}
          />
        </Card>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    buku: state.buku,
    pinjam: state.pinjam
  }
}

export default connect(mapStateToProps)(Profile)
