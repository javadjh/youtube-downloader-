import styled from 'styled-components'
export const DarkBackgroundColorStyled = styled.div`
    background-color: #282828;
    height: 250px;
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