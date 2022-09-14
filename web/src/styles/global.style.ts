import { Input } from 'antd'
import styled from 'styled-components'
export const DarkBackgroundColorStyled = styled.div`
    background-color: #282828;
    height: 290px;
    border-radius: 10px;
    box-shadow: 0px 0px 67px 9px rgba(0,0,0,0.24);
    -webkit-box-shadow: 0px 0px 67px 9px rgba(0,0,0,0.24);
    -moz-box-shadow: 0px 0px 67px 9px rgba(0,0,0,0.24);
    
    color: white;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: flex-end;
    width: 100%;
`
export const BackgroundGradient = styled.div`
background: #56CCF2;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  padding-top: 10px;

`
export const CustomInput = styled(Input)`
  font-size: 40px;
`
export const WhiteColorStyled = styled.p`
  color:white
`
export const CenterVerticalStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
export const FullSizeStyled = styled.div `
  width: 100%;
  height: 100%;
`
export const SpaceBetweenStyled = styled.div `
  display:flex;
  justify-content:space-between
`
export const SpaceStyled = styled.div<{
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  horizontal?: number;
  vertical?: number;
}>`
  margin-top: ${(props) => (props.vertical ? props.vertical : props.top)}px;
  margin-bottom: ${(props) =>
    props.vertical ? props.vertical : props.bottom}px;
  margin-right: ${(props) =>
    props.horizontal ? props.horizontal : props.right}px;
  margin-left: ${(props) =>
    props.horizontal ? props.horizontal : props.left}px;
`;
export const DynamicWidthStyled = (width:string)=>{
    return {

        width: "100%"
    }
}
export const CenterStyled = styled.div`
  justify-content: center;
  display: flex;
  align-content: center;
  width: 100%;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`
export const FormatStyled = styled.div`
  background-color: #3d4d91;
  border-radius: 7px;
  padding: 5px 15px;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #303d73;
  }
`
export const VideoCardStyled = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
`
export const ImageStyled = {
  borderRadius:10
}
export const HomePageHeader = styled.div`
  background-color: #282828;
  min-height: 200px;
`