
import { connect } from 'react-redux'
import styled from 'styled-components'

import { breakpoint, themeColor, gutter } from '../style/helpers'

import applyWrappers from '../lib/applyWrappers'
import withRedux from '../lib/withRedux'
import withMUI from '../lib/withMUI'
import { signOutWithGoogle } from '../lib/GoogleAuthRedux'
import Challange from '../components/atoms/Challange'
import Map from '../components/atoms/Map'
import Link from 'next/link'
import Router from 'next/router'
import Footer from '../components/atoms/Footer'
import Make from '../components/pages/Make'
import Instructions from '../components/pages/Instructions'
import DotSpinner from '../components/atoms/DotSpinner'
import RequireAuth from '../components/organisms/RequireAuth'
import App from '../components/App'

import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import game from '../game'
// STYLED COMPONENTS
// sample using themecolor and breakpoint style utility
const MainTitle = styled(Toolbar)` 
    ${ ({ clickable }) => clickable ? 'cursor: pointer;' : '' }

    &>img{
        margin-bottom: -17px;
        width: 67px;
        @media ${ breakpoint('sm') } {
            margin-bottom: -24px;
            width: 100px;
        }
    }
    & > div{
        color: ${ themeColor('primary.contrastText') };
        flex-grow: 1;
        font-family: Paytone One, sans-serif;
        font-size: 31px; 
        max-width: 600px;
        line-height:20px;
        color: #031c42;
        line-height: 28px;
        margin-left: 17px;
        @media ${ breakpoint('sm') } {
            font-size: 43px;   
            max-width: 300px;
            line-height:32px;
            
        }
    }
    ${ gutter('margin-bottom', 1) };
`


const MidAlign = styled.div`
max-width: 800px;
width: 100%;
margin: auto;
`
// sample using gutter utility
/* &::before {
        content: ' ';
        background: inherit;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        filter:blur(5px);
    } */
const Content = styled.div`
    background-color: rgba(255,255,255,0.9);

    
    ${ gutter('padding', 3) };
    font-size: 20px;

ul {
  list-style: none;
  li{
      margin: 3px 0;
  }
  li>ul{
    font-size:17px;
    li::before{
        content: "❅";
        font-size: 0.9em;
        width: 1.2em; /* Also needed for space (tweak if needed) */
        margin-left: -1.2em; /* Also needed for space (tweak if needed) */ 
    }
  }
  li::before {
    content: "❄"; 
    color: ${ themeColor('primary.dark') };
    font-weight: bold; /* If you want it to be bold */
    display: inline-block; /* Needed to add space between the bullet and the text */ 
    font-size: 1.1em;
    width: 1.3em; /* Also needed for space (tweak if needed) */
    margin-left: -1.3em; /* Also needed for space (tweak if needed) */
   
    }
}



`


// REDUX CONNECT
// redux connect function, maps a redux state to properties
const stateToProps = ({ google_api }) => ({
    user_full_name: google_api.google_user ? google_api.google_user.getBasicProfile().getName() : '',
})
const actionsToProps = {
    signOut: signOutWithGoogle,
}
// const actionsToProps =

const TabLabel = styled.span`
    font-size: 20px;
`


const MainAppBar = styled(AppBar)`
    
    background-color: white !important;
    @media ${ breakpoint('sm') } {
        padding-top: 24px;    
    }

    font-weight: 700;
    position: relative !important;
    z-index:999;
`
const NavBar = styled(Toolbar)`
    background-color: ${ themeColor('primary') };
`
// <div>Icons made by <a href="https://www.flaticon.com/authors/mavadee" title="mavadee">mavadee</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
// Main index page component
const Background = styled.div`
 background-image:url('/static/mapBG2.png');
 background-size:cover;
 background-attachment: fixed;
background-position: center;
 `
const FrontPageDiv = styled.div`
    
    display: flex;
    
    align-items: center;
    justify-content: center;
    background-size:cover;
    background-position: center;
    height: calc(100vh - 134.578px);
    @media ${ breakpoint('sm') } {
        height: calc(100vh - 220.2px);
    }

    vertical-align: center;
    &>a{
        display:flex;
        opacity:1;
        vertical-align: center;
        font-family: Paytone One, sans-serif;
        font-size:60px;
        color: #031c42;
        cursor: pointer;
        
        transition: all 0.2s ease-out;
        &:hover {
            
            transform: scale(1.3) translate(-1%,-1%);
        }
    }
`
class Index extends React.Component {

    static getIntialProps ({ req, query, params }) {

    }
    state = {
        value: -1,
    };
    handleChange = (event, value) => {
        this.setState({ value })
        Router.push('/?page=' + value)
    };

    render () {
        let { value } = this.state
        const { url: { query: { page } } } = this.props
        const parsedPage = parseInt(page, 10)

        value = 0
        return (
            <App>
                {/* <RequireAuth> */} {/* forces user login, check the source */}
                <MainAppBar position='static'>
                    <MidAlign>
                        <MainTitle clickable={ parsedPage !== null } onClick={ () => Router.push('/') }>
                            <img src='/static/logo1.svg' />
                            <div>Polar explorers</div>
                        </MainTitle>
                    </MidAlign>
                    <NavBar>
                        <MidAlign>
                            <Tabs value={ parsedPage } onChange={ this.handleChange }>
                                <Tab label={ <TabLabel>Make</TabLabel> } />
                                <Tab label={ <TabLabel>Playing Instruction</TabLabel> } />
                            </Tabs>
                        </MidAlign>
                    </NavBar>
                </MainAppBar>
                <Background>
                    <MidAlign>
                        <Choose>

                            <When condition={ parsedPage === 0 }>
                                <Content>
                                    <Make />
                                </Content>
                            </When>
                            <When condition={ parsedPage === 1 }>
                                <Content>
                                    <Instructions />
                                </Content>
                            </When>
                            <When condition={ parsedPage === 2 }>
                        Tab3
                            </When>
                            <Otherwise>
                                <FrontPageDiv>
                                    <Link href={ '/?page=0' }>
                                        <a >Begin</a>
                                    </Link>
                                </FrontPageDiv>
                            </Otherwise>
                        </Choose>
                    </MidAlign>
                </Background>
                {/* </RequireAuth> */}
            </App>
        )
    }
}

/*
character tokens
character cards

12 eq card

30 challange cards

playing board

42 fragments melted ice
*
/
/* <IconButton color='inherit' size='small'>
                    <ExitIcon onClick={ signOut } />
                </IconButton>
                */
// applies various wrappers to the component before exporting it
export default applyWrappers(
    withRedux, // attaches redux
    withMUI, // attaches material UI stuff (theme, styles etc...)
    connect(stateToProps, actionsToProps) // attaches the stateToProps function
)(Index)
