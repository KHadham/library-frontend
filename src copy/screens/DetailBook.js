import React, { Component } from 'react'
import Url from '../support/url'
import { View, StatusBar, ScrollView, Image, AsyncStorage } from 'react-native'
import { Text, IconButton, Card, FAB } from 'react-native-paper'
import { colorsFromUrl } from 'react-native-dominant-color'
import { connect } from 'react-redux'
import { getBukuId } from '../public/redux/actions/buku'
import { postPinjam } from '../public/redux/actions/pinjam'

class DetailBook extends Component {
  constructor () {
    super()
    this.state = {
      color: '#ffffff',
      books: [],
      pinjam: [],
      token: '',
      id_user: '',
      nama_user: '',
      email: ''
    }
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
    AsyncStorage.getItem('email', (err, result) => {
      if (result) {
        this.setState({
          email: result
        })
      }
    })
  }

  componentDidMount = async () => {
    await this.props.dispatch(
      getBukuId(this.props.navigation.getParam('id_buku'))
    )
    this.setState({
      books: this.props.buku
    })
    let self = this
    imageUrl = this.state.books.listBuku.gmb_buku
    await colorsFromUrl(imageUrl, (err, colors) => {
      if (!err) {
        self.setState({ color: colors.averageColor })
      }
    })
  }

  render () {
    const cekLogin = () => {
      if (this.state.token == '') {
        this.props.navigation.navigate('Login')
      } else {
        addPinjam()
      }
    }

    const addPinjam = () => {
      this.state.pinjam.push({
        id_user: this.state.id_user,
        nama_user: this.state.nama_user,
        id_buku: this.props.navigation.getParam('id_buku'),
        lama_pinjam: 3,
        tgl_pinjam: new Date()
      })

      add()
    }
    let add = async () => {
      await this.props.dispatch(postPinjam(this.state.pinjam[0])).then(() => {
        this.props.navigation.push('Home')
      })
    }

    const { books } = this.state
    const list = books.listBuku
    console.log(`ini dari list`, list)
    return (
      <>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 16,
                paddingVertical: 8
              }}
            >
              <IconButton
                icon='navigate-before'
                color={
                  this.state.color == '#fff'
                    ? this.state.color == '#000'
                    : this.state.color
                }
                size={30}
                onPress={() => this.props.navigation.goBack()}
                style={{ position: 'absolute' }}
              />

              <StatusBar
                backgroundColor={this.state.color}
                barStyle='dark-content'
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 16,
                  marginTop: 35
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'column' }}>
                    <InfoBuku info='Judul' isi={list ? list.nama_buku : ''} />
                    <InfoBuku
                      info='Penulis'
                      isi={list ? list.penulis_buku : ''}
                    />
                    <InfoBuku
                      info='Lokasi Buku'
                      isi={list ? list.lokasi_buku : ''}
                    />
                    <InfoBuku
                      info='Status Buku'
                      isi={list ? list.status_pinjam : ''}
                    />
                  </View>
                </View>
                <GambarBuku
                  gambar={
                    list ? list.gmb_buku : 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.thesocialmediahat.com%2Fsites%2Fdefault%2Ffiles%2Fdefault_profile_4.png&f=1'
                  }
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                paddingHorizontal: 16,
                height: '100%'
              }}
            >
              <Text style={{ fontSize: 17, marginBottom: 16 }}>
                {list ? list.ringkasan : ''}
              </Text>
            </View>
          </ScrollView>
        </View>
        <FAB
          label='Borrow Book'
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: this.state.color
          }}
          onPress={() => cekLogin()}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    buku: state.buku,
    pinjam: state.pinjam
  }
}

export default connect(mapStateToProps)(DetailBook)

class InfoBuku extends Component {
  render () {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginRight: 8
            }}
          >
            {this.props.info}:
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 17
            }}
          >
            {this.props.isi}
          </Text>
        </View>
      </View>
    )
  }
}

class GambarBuku extends Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Card style={{ borderRadius: 8 }} elevation={4}>
          <Image
            style={{
              width: 150,
              height: 200,
              borderRadius: 8
            }}
            source={{
              uri: this.props.gambar
            }}
          />
        </Card>
      </View>
    )
  }
}
