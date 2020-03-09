import * as React from 'react';
import { ColorClassNames } from '@uifabric/styling';
import {getTheme, MessageBar, MessageBarType,IconButton,TextField} from 'office-ui-fabric-react';
import {EmailAddressControl} from './index'

 
export interface ITextFieldProps{
    onInputChanged?:(newValue:string)=>void;
    inputValue?: string;
    successVisible?: boolean;
}
 
export interface ITextFieldControlledExampleState extends React.ComponentState,ITextFieldProps{}
const theme = getTheme();
export class TextFieldControlledExample extends React.Component<ITextFieldProps, ITextFieldControlledExampleState> {
    
    constructor(props:ITextFieldProps){
        super(props);
 
        this.state = {
            inputValue: props.inputValue?props.inputValue:'',
        };
    }
 

    
    render():JSX.Element{ 
        if (this.state.inputValue !== "")
        {
         return (
            <div className='wrapper'>          
            <div className='inner'>
            <TextField  
                value={this.state.inputValue}
                placeholder = '---'
                onChange = {this.onChangeText}
                styles = {{ field:{ fontWeight: "bold", borderColor:ColorClassNames.whiteTranslucent40 },
                fieldGroup:  {borderColor:theme.palette.whiteTranslucent40,borderTopColor: theme.palette.whiteTranslucent40},
                wrapper: {borderColor:ColorClassNames.whiteTranslucent40},
                }}
                className='reactinput' 
                />
            <IconButton
                    className='reactbutton'
                    title='Click to Email'
                    iconProps={{ iconName: 'EditMail' }}
                    onClick={this._onIconClick.bind(this)}
                    styles={{ root: { color:ColorClassNames.neutralDark },
                    rootHovered: {color:ColorClassNames.blackHover},
                    rootPressed: {color:ColorClassNames.blackTranslucent40}   }}
            />
            </div>
            </div>
        );
    }
    else
   {
        return (
            <div className='wrapper'>
            
            <div className='inner'>
            <TextField  
                value={this.state.inputValue}
                placeholder = '---'
                onChange = {this.onChangeText}
                styles = {{ field:{ fontWeight: "bold", borderColor:ColorClassNames.whiteTranslucent40 },
                fieldGroup:  {borderColor:theme.palette.whiteTranslucent40,borderTopColor: theme.palette.whiteTranslucent40},
                wrapper: {borderColor:ColorClassNames.whiteTranslucent40},
                }}
                className='reactinput' 
                />   
            </div>
            </div>
            ) }
    }

    private onChangeText = (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>, newValue?: string) => {
        this.setState({ inputValue: newValue || '' });
        if(this.props.onInputChanged){
            this.props.onInputChanged(newValue||'')
        }
    };
   
    private _onIconClick(): void {
        window.location.href = "mailto:"+this.state.inputValue;
    }
}

