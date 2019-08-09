import React, { Component } from 'react'
import Url from '../support/url'
import { FlatGrid } from 'react-native-super-grid'
import { NavigationEvents } from 'react-navigation'
import { getBuku, getMoreBook } from '../public/redux/actions/buku'
import { connect } from 'react-redux'
import {
  View,
  StatusBar,
  Image,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import {
  Searchbar,
  TouchableRipple,
  Text,
  IconButton,
  Colors,
  FAB,
  Card,
  Button
} from 'react-native-paper'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      data: [],
      refreshing: false,
      isLoading: true,
      page: 1,
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
        console.log(`ini dari callback token`, result)
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

  componentDidMount = () => {
    this.makeRequest()
    // this.loadMore()
  }

  makeRequest = async () => {
    await this.props.dispatch(getBuku())
    this.setState({
      books: this.props.buku.listBuku,
      refreshing: false,
      page: 1
    })
    console.log(`testinggggg`, this.props.buku.listBuku)
  }

  loadMore = () => {
    const { page } = this.state
    this.props
      .dispatch(getMoreBook(page))
      .then(res => {
        this.setState({
          books: this.state.books.concat(res.action.payload.data.result),
          isLoading: false
        })
      })
      .catch( () => {
        console.warn(`tesssssssssssssssss`)
        this.setState({ isLoading: false })
      })
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRequest()
      }
    )
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.loadMore()
      }
    )
  }

  footerLoader = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          marginVertical: 8
        }}
      >
        <>
          <ActivityIndicator animating size='large' color='black' />
          <Text style={{ marginTop: 8, fontSize: 12 }}>Load Data</Text>
        </>
      </View>
    )
  }

  searchFilterFunction = text => {
    this.setState({
      value: text
    })

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.listBuku.nama_buku.toUpperCase()} ${item.listBuku.penulis_buku.toUpperCase()} ${item.listBuku.lokasi_buku.toUpperCase()}`
      const textData = text.toUpperCase()

      return itemData.indexOf(textData) > -1
    })
    this.setState({
      data: newData
    })
  }

  render () {
    console.log(`yihaaaaa`, this.state.token)
    const { firstQuery } = this.state
    console.log(`halooooo`, this.state.books)
    const haiData = this.state.books
    const { books } = this.state
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 16,
          paddingVertical: 8
        }}
      >
        <NavigationEvents onWillFocus={payload => this.makeRequest()} />
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Text text10 style={{ fontSize: 40, fontWeight: 'bold' }}>
              BOOKS
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
          >
            {/* // Button  buat profile */}
            {this.state.token != '' ? (
              <IconButton
                icon='account-circle'
                color={Colors.grey700}
                size={30}
                onPress={() =>
                  this.props.navigation.navigate('Profile', {
                    id_user: this.state.id_user
                  })
                }
              />
            ) : (
              <TouchableRipple
                onPress={() => this.props.navigation.navigate('Login')}
                rippleColor='rgba(0, 0, 0, .32)'
              >
                <Text text10 style={{ color: 'black', fontSize: 16 }}>
                  Login
                </Text>
              </TouchableRipple>
            )}
          </View>
        </View>
        <View style={{ alignContent: 'center', alignItems: 'center' }}>
          <Searchbar
            placeholder='Search'
            onChangeText={text => this.searchFilterFunction(text)}
            value={this.state.value}
            style={{ borderRadius: 32, width: '90%', height: 40 }}
          />
        </View>
        {haiData != '' ? (
          <FlatGrid
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.01}
            // ListFooterComponent={this.footerLoader}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            items={this.state.books}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Card style={{ borderRadius: 8 }} elevation={4} key={index}>
                {item.status_pinjam == 'dipinjam' ? (
                  <>
                    <Image
                      progressiveRenderingEnabled
                      style={{
                        width: 150,
                        height: 200,
                        borderRadius: 8,
                        opacity: 0.3
                      }}
                      source={{
                        uri:
                          item.gmb_buku == ''
                            ? Url + item.image
                            : item.gmb_buku
                      }}
                    />
                    <Button
                      mode='contained'
                      onPress={() => {}}
                      style={{
                        top: '40%',
                        position: 'absolute',
                        backgroundColor: 'black',
                        alignItems: 'center',
                        alignSelf: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {item.status_pinjam}
                    </Button>
                  </>
                ) : (
                  <TouchableRipple
                    onPress={() =>
                      this.props.navigation.navigate('DetailBook', {
                        id_buku: item.id_buku
                      })
                    }
                    rippleColor='rgba(0, 0, 0, .32)'
                    borderless
                  >
                    <Image
                      progressiveRenderingEnabled
                      style={{
                        width: 150,
                        height: 200,
                        borderRadius: 8
                      }}
                      source={{
                        uri:
                          item.gmb_buku == ''
                            ? Url + item.image
                            : item.gmb_buku
                      }}
                    />
                  </TouchableRipple>
                )}
              </Card>
            )}
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <ActivityIndicator
              size='large'
              color='black'
              style={{ marginTop: 70 }}
            />
          </View>
        )}
        <FAB
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: 'black'
          }}
          icon='add'
          onPress={() => this.props.navigation.navigate('AddBook')}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    buku: state.buku
  }
}

export default connect(mapStateToProps)(Home)
