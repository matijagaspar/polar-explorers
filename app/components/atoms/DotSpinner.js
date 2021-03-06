
import styled from 'styled-components'

const DotSpinner = ({ hide, ...props }) => ( // eslint-disable-line no-unused-vars
    <div { ...props }>
        <div className='bounce1'></div>
        <div className='bounce2'></div>
        <div className='bounce3'></div>
    </div>
)

const Spinner = styled(DotSpinner)`
  display: ${ props => props.hide ? 'none' : 'block' };
  margin: 0px auto 0;
  width: 70px;
  text-align: center;
  & > div {
    width: 18px;
    height: 18px;
    background-color: #333;
  
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }
  
  & .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  
  & .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  
  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }
  
  @keyframes sk-bouncedelay {
    0%, 80%, 100% { 
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% { 
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`
export default Spinner
